import { useState, useEffect } from "react";
import { ListPageTemplate } from "@/components/templates/ListPageTemplate";
import { SearchFilterBar } from "@/components/molecules/SearchFilterBar";
import { DataTable } from "@/components/organisms/DataTable";
import { EntityForm, FormField } from "@/components/molecules/EntityForm";
import { Subscription } from "@/types/SubscriptionType";
import { useGetAllSubscriptions, useUpdateSubscription } from "@/hooks";
import { boolean } from "zod";

interface Notification {
  type: 'success' | 'error';
  title: string;
  message: string;
}

// Form fields for editing a subscription plan
const subscriptionPlanEditFields: FormField[] = [
  {
    name: "cost",
    label: "Precio (USD)",
    type: "number",
    required: true,
    validation: {
      min: { value: 0, message: "El precio debe ser un número positivo" },
    },
  },
  {
    name: "benefits",
    label: "Características",
    type: "textarea",
    required: false,
  },
];

export default function SubscriptionPlansScreen() {
  const [plansData, setPlansData] = useState<Subscription[]>([]);
  const [filteredData, setFilteredData] = useState<Subscription[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Subscription | null>(null);
  const [planToEdit, setPlanToEdit] = useState<Subscription | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  // Hooks for fetching and updating plans
  const { data: allPlans, refetch: refetchPlans } = useGetAllSubscriptions();
  const { mutateAsync: updatePlan } = useUpdateSubscription();

  // Load plans on mount and when data changes
  useEffect(() => {
    if (allPlans) {
      setPlansData(allPlans);
      setFilteredData(allPlans);
    }
  }, [allPlans]);

  // Notification auto-close
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Search handler
  const handleSearch = (term: string) => {
    if (!term.trim()) {
      setFilteredData(plansData);
      return;
    }
    const lower = term.toLowerCase();
    setFilteredData(
      plansData.filter(
        (plan) =>
          plan.name.toLowerCase().includes(lower) ||
          (plan.benefits && plan.benefits.some((feature) => feature.toLowerCase().includes(lower)))
      )
    );
  };

  // View details
  const handleViewDetails = (plan: Subscription) => {
    setSelectedPlan(plan);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedPlan(null);
  };

  // Edit handlers
  const handleInitiateEdit = (plan: Subscription) => {
    setPlanToEdit(plan);
    setShowEditModal(true);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setPlanToEdit(null);
  };

  const handleEditPlan = async (formData: any) => {
    if (!planToEdit) return;
    const planId = planToEdit.id;
    setIsEditing(true);
    try {
      const raw = formData.benefits as string;
      const benefitsArray = raw.split(/[\r\n,]+/).map((item) => item.trim()).filter(Boolean);

      await updatePlan({
        id: planId,
        updates: {
          cost: Number(formData.cost),
          benefits: benefitsArray,
        }
      });
      await refetchPlans();
      setShowEditModal(false);
      setPlanToEdit(null);
      setNotification({
        type: 'success',
        title: 'Plan actualizado',
        message: `El plan ha sido actualizado exitosamente.`,
      });
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Error al actualizar',
        message: error instanceof Error ? error.message : 'Error al actualizar el plan.',
      });
    } finally {
      setIsEditing(false);
    }
  };

  // Display config for entity details
  const entityDisplayConfig = {
    fields: ['cost', 'benefits'] as (keyof Subscription)[],
    labels: {
      cost: 'Precio',
      benefits: 'Características',
    },
    formatters: {
      cost: (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD`,
    },
  };

  // Table actions: only edit
  const tableActions = [
    {
      label: 'Editar',
      onClick: handleInitiateEdit,
      variant: 'outline',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
  ];

  const tableConfig = {
    caption: 'Planes de Suscripción',
    rowsPerPage: 10,
    onViewDetails: handleViewDetails,
    displayColumns: ['name', 'cost'],
    columnHeaders: {
      name: 'Plan',
      cost: 'Precio',
    },
    actionButtonText: 'Ver detalles',
    actions: tableActions,
  };

  const searchBarConfig = {
    onSearch: handleSearch,
    showFilterButton: false,
    searchPlaceholder: 'Buscar plan',
  };

  const editFormConfig = {
    isOpen: showEditModal,
    onClose: handleCancelEdit,
    onSubmit: handleEditPlan,
    fields: subscriptionPlanEditFields,
    title: 'Editar Plan de Suscripción',
    description: 'Modifica las características o precio del plan.',
    submitButtonText: 'Guardar Cambios',
    cancelButtonText: 'Cancelar',
    isLoading: isEditing,
    defaultValues: planToEdit ? {
      cost: planToEdit.cost || 0,
      benefits: planToEdit.benefits.join('\n'),
    } : undefined,
  };

  return (
    <>
      {/* Formulario para editar planes */}
      <EntityForm {...editFormConfig} />

      <ListPageTemplate
        data={filteredData}
        entityType="Planes de Suscripción"
        SearchBarComponent={SearchFilterBar}
        TableComponent={DataTable}
        FormComponent={() => null}
        searchBarProps={searchBarConfig}
        tableProps={tableConfig}
        formProps={{}}
        selectedEntity={selectedPlan}
        showDetailsModal={showDetailsModal}
        onCloseDetailsModal={handleCloseDetails}
        pageTitle="Planes de Suscripción"
        pageDescription="Gestiona las características y precios de tus planes de suscripción"
        detailsModalTitle="Detalles del Plan"
        detailsModalDescription="Información detallada del plan seleccionado"
        renderEntityDetails={undefined}
        entityDisplayConfig={entityDisplayConfig}
        notification={notification}
        onCloseNotification={() => setNotification(null)}
      />
    </>
  );
}
