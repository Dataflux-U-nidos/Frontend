import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ListPageTemplate } from "@/components/templates/ListPageTemplate";
import { SearchFilterBar } from "@/components/molecules/SearchFilterBar";
import { DataTable } from "@/components/organisms/DataTable";
import { EntityForm, FormField } from "@/components/molecules/EntityForm";
import { ConfirmationDialog } from "@/components/molecules/ConfirmationDialog";
import { Campaign } from "@/types/campaignType";

interface Notification {
  type: 'success' | 'error';
  title: string;
  message: string;
}

// Form fields for creating a campaign
const campaignFormFields: FormField[] = [
  {
    name: "name",
    label: "Nombre de la Campaña",
    type: "text",
    required: true,
  },
  {
    name: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
  },
  {
    name: "date",
    label: "Fecha",
    type: "datetime-local",
    required: true,
  },
  {
    name: "cost",
    label: "Costo (USD)",
    type: "number",
    required: true,
    validation: {
      min: {
        value: 0,
        message: "El costo debe ser un número positivo"
      }
    }
  },
  {
    name: "type",
    label: "Tipo de Campaña",
    type: "select",
    required: true,
    options: [
      { value: "scholar", label: "Escolar" },
      { value: "university", label: "Universitaria" }
    ]
  }
];

// Form fields for editing a campaign
const campaignEditFormFields: FormField[] = [
  {
    name: "name",
    label: "Nombre de la Campaña",
    type: "text",
    required: true,
  },
  {
    name: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
  },
  {
    name: "date",
    label: "Fecha",
    type: "datetime-local",
    required: true,
  },
  {
    name: "cost",
    label: "Costo (USD)",
    type: "number",
    required: true,
    validation: {
      min: {
        value: 0,
        message: "El costo debe ser un número positivo"
      }
    }
  }
];

// Datos quemados de campañas
const mockCampaigns: Campaign[] = [
  {
    _id: "680c5ef04c6bfd0ca594657a",
    name: "Summer Scholarship Drive",
    description: "Campaign to raise awareness about the spring scholarship opportunities.",
    date: "2025-05-15T09:00:00.000Z",
    cost: 2500,
    type: "scholar",
    createdBy: "6809c8c96ec3b4550862725c",
    createdAt: "2025-04-26T04:20:00.164Z",
    updatedAt: "2025-04-26T04:22:12.411Z"
  },
  {
    _id: "680c5ef04c6bfd0ca594657b",
    name: "Open House University Campaign",
    description: "Marketing campaign for university open house event.",
    date: "2025-06-01T09:00:00.000Z",
    cost: 3500,
    type: "university",
    createdBy: "6809c8c96ec3b4550862725c",
    createdAt: "2025-04-26T04:20:00.164Z",
    updatedAt: "2025-04-26T04:22:12.411Z"
  },
  {
    _id: "680c5ef04c6bfd0ca594657c",
    name: "High School Outreach Program",
    description: "Visiting local high schools to promote university programs.",
    date: "2025-04-10T09:00:00.000Z",
    cost: 1800,
    type: "scholar",
    createdBy: "6809c8c96ec3b4550862725c",
    createdAt: "2025-04-26T04:20:00.164Z",
    updatedAt: "2025-04-26T04:22:12.411Z"
  },
  {
    _id: "680c5ef04c6bfd0ca594657d",
    name: "Digital Marketing - Universities",
    description: "Social media campaign targeting university students.",
    date: "2025-07-01T09:00:00.000Z",
    cost: 4200,
    type: "university",
    createdBy: "6809c8c96ec3b4550862725c",
    createdAt: "2025-04-26T04:20:00.164Z",
    updatedAt: "2025-04-26T04:22:12.411Z"
  }
];

export default function MarketingMainScreen() {
  const location = useLocation();
  const [campaignsData, setCampaignsData] = useState<Campaign[]>([]);
  const [filteredData, setFilteredData] = useState<Campaign[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(null);
  const [campaignToEdit, setCampaignToEdit] = useState<Campaign | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  // Determinar el tipo de campaña basado en la ruta
  const campaignType = location.pathname.includes('university') ? 'university' : 'scholar';

  // Cargar campañas cuando el componente se monta o cuando cambia el tipo
  useEffect(() => {
    const loadCampaigns = () => {
      // Filtrar campañas según el tipo
      const filteredCampaigns = mockCampaigns.filter(campaign => campaign.type === campaignType);
      setCampaignsData(filteredCampaigns);
      setFilteredData(filteredCampaigns);
    };

    loadCampaigns();
  }, [campaignType]);

  const handleCloseNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Manejador para ver detalles de campaña
  const handleViewDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowDetailsModal(true);
  };

  // Manejador para cerrar el modal de detalles
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedCampaign(null);
  };

  // Manejador para abrir el modal de agregar campaña
  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  // Manejador para cerrar el modal de agregar
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  // Manejador para iniciar el proceso de edición
  const handleInitiateEdit = (campaign: Campaign) => {
    setCampaignToEdit(campaign);
    setShowEditModal(true);
  };

  // Manejador para cancelar la edición
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setCampaignToEdit(null);
  };

  // Manejador para confirmar y ejecutar la edición
  const handleEditCampaign = async (formData: any) => {
    if (!campaignToEdit) return;

    setIsEditing(true);

    try {
      // Simulación de actualización
      const updatedCampaign = {
        ...campaignToEdit,
        name: formData.name,
        description: formData.description,
        date: formData.date,
        cost: formData.cost,
        updatedAt: new Date().toISOString()
      };

      const updatedCampaigns = campaignsData.map(campaign => 
        campaign._id === updatedCampaign._id ? updatedCampaign : campaign
      );

      setCampaignsData(updatedCampaigns);
      setFilteredData(updatedCampaigns);
      setShowEditModal(false);
      setCampaignToEdit(null);

      setNotification({
        type: 'success',
        title: 'Campaña actualizada',
        message: `La campaña ${updatedCampaign.name} ha sido actualizada exitosamente.`
      });
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Error al actualizar campaña',
        message: 'Ha ocurrido un error al intentar actualizar la campaña.'
      });
    } finally {
      setIsEditing(false);
    }
  };

  // Manejador para iniciar el proceso de eliminación
  const handleInitiateDelete = (campaign: Campaign) => {
    setCampaignToDelete(campaign);
    setShowDeleteModal(true);
  };

  // Manejador para cancelar la eliminación
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCampaignToDelete(null);
  };

  // Manejador para confirmar y ejecutar la eliminación
  const handleConfirmDelete = async () => {
    if (!campaignToDelete) return;

    setIsDeleting(true);

    try {
      // Simulación de eliminación
      const updatedCampaigns = campaignsData.filter(
        campaign => campaign._id !== campaignToDelete._id
      );

      setCampaignsData(updatedCampaigns);
      setFilteredData(updatedCampaigns);
      setShowDeleteModal(false);
      setCampaignToDelete(null);

      setNotification({
        type: 'success',
        title: 'Campaña eliminada',
        message: `La campaña ${campaignToDelete.name} ha sido eliminada exitosamente.`
      });
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Error al eliminar campaña',
        message: 'Ha ocurrido un error al intentar eliminar la campaña.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Manejador para agregar una nueva campaña
  const handleAddCampaign = async (formData: any) => {
    try {
      // Simulación de creación de campaña
      const newCampaign: Campaign = {
        _id: Date.now().toString(), // ID temporal
        name: formData.name,
        description: formData.description,
        date: formData.date,
        cost: formData.cost,
        type: formData.type,
        createdBy: "current_user_id", // En producción, usar el ID del usuario actual
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Si la campaña creada coincide con el tipo actual, agregarla a la lista
      if (newCampaign.type === campaignType) {
        setCampaignsData([...campaignsData, newCampaign]);
        setFilteredData([...filteredData, newCampaign]);
      }

      handleCloseAddModal();

      setNotification({
        type: 'success',
        title: '¡Campaña creada!',
        message: `La campaña ${newCampaign.name} ha sido creada exitosamente.`
      });
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Error al crear campaña',
        message: 'Ha ocurrido un error al intentar crear la campaña.'
      });
    }
  };

  // Manejador para búsqueda de campañas
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredData(campaignsData);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = campaignsData.filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(lowerCaseSearch) ||
        campaign.description.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredData(filtered);
  };

  // Configuración para la visualización de detalles de campaña
  const entityDisplayConfig = {
    fields: ["name", "type", "date", "cost", "description"] as (keyof Campaign)[],
    labels: {
      name: "Nombre de la campaña",
      type: "Tipo",
      date: "Fecha",
      cost: "Costo",
      description: "Descripción",
    },
    formatters: {
      cost: (value: number) => `$${value.toLocaleString()} USD`,
      type: (value: string) => value === "scholar" ? "Escolar" : "Universitaria",
      date: (value: string) => new Date(value).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
    },
    avatar: {
      field: "name" as keyof Campaign,
      fallback: (campaign: Campaign) => campaign.name.substring(0, 2).toUpperCase(),
      bgColor: campaignType === "scholar" ? "bg-green-500" : "bg-blue-500",
      textColor: "text-white",
    },
  };

  // Acciones para la tabla
  const tableActions = [
    {
      label: "Editar",
      onClick: handleInitiateEdit,
      variant: "outline",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      label: "Eliminar",
      onClick: handleInitiateDelete,
      variant: "danger",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      )
    }
  ];

  const tableConfig = {
    caption: `Campañas ${campaignType === "scholar" ? "Escolares" : "Universitarias"}`,
    rowsPerPage: 6,
    onViewDetails: handleViewDetails,
    displayColumns: ["name", "date", "cost", "type"],
    columnHeaders: {
      name: "Campaña",
      date: "Fecha",
      cost: "Costo",
      type: "Tipo",
    },
    actionButtonText: "Ver detalles",
    actions: tableActions
  };

  const searchBarConfig = {
    onSearch: handleSearch,
    onAddEntity: handleOpenAddModal,
    searchPlaceholder: "Buscar campaña",
    addButtonLabel: "Agregar campaña",
    showFilterButton: false,
  };

  const addFormConfig = {
    isOpen: showAddModal,
    onClose: handleCloseAddModal,
    onSubmit: handleAddCampaign,
    fields: campaignFormFields,
    title: "Agregar Nueva Campaña",
    description: "Completa el formulario para agregar una nueva campaña.",
    submitButtonText: "Agregar Campaña",
    cancelButtonText: "Cancelar",
  };

  const editFormConfig = {
    isOpen: showEditModal,
    onClose: handleCancelEdit,
    onSubmit: handleEditCampaign,
    fields: campaignEditFormFields,
    title: "Editar Campaña",
    description: "Modifica la información de la campaña.",
    submitButtonText: "Guardar Cambios",
    cancelButtonText: "Cancelar",
    isLoading: isEditing,
    defaultValues: campaignToEdit ? {
      name: campaignToEdit.name,
      description: campaignToEdit.description,
      date: campaignToEdit.date.slice(0, 16), // Formato para datetime-local
      cost: campaignToEdit.cost
    } : undefined
  };

  // Componente de notificación personalizado
  const CustomNotification = () => {
    if (!notification) return null;

    const isSuccess = notification.type === 'success';
    
    return (
      <div className="fixed top-4 right-4 z-50 w-80 shadow-lg rounded-md overflow-hidden">
        <div className={`p-4 ${isSuccess ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex justify-between items-start">
            <div className="flex">
              <div className={`mr-3 flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
                {isSuccess ? (
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className={`text-lg font-medium ${isSuccess ? 'text-green-800' : 'text-red-800'}`}>
                  {notification.title}
                </h3>
                <div className={`mt-1 text-sm ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
                  {notification.message}
                </div>
              </div>
            </div>
            <button
              onClick={handleCloseNotification}
              className={`ml-4 inline-flex text-gray-400 hover:${isSuccess ? 'text-green-600' : 'text-red-600'} focus:outline-none`}
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
            <div 
              className={`h-1 rounded-full ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}
              style={{
                width: '100%',
                animation: 'progress-bar 5s linear forwards'
              }}
            />
          </div>
          <style>
            {`
              @keyframes progress-bar {
                from { width: 100%; }
                to { width: 0%; }
              }
            `}
          </style>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Notificación personalizada */}
      <CustomNotification />
      
      {/* Modal de confirmación para eliminar campaña */}
      <ConfirmationDialog
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Eliminar campaña"
        description={`¿Estás seguro de que deseas eliminar la campaña ${campaignToDelete?.name}? Esta acción no se puede deshacer.`}
        confirmButtonText="Eliminar"
        cancelButtonText="Cancelar"
        variant="danger"
        isLoading={isDeleting}
      />
      
      {/* Formulario para agregar campañas */}
      <EntityForm {...addFormConfig} />
      
      {/* Formulario para editar campañas */}
      <EntityForm {...editFormConfig} />
      
      <ListPageTemplate
        data={filteredData}
        entityType={`Campañas ${campaignType === "scholar" ? "Escolares" : "Universitarias"}`}
        SearchBarComponent={SearchFilterBar}
        TableComponent={DataTable}
        FormComponent={EntityForm}
        searchBarProps={searchBarConfig}
        tableProps={tableConfig}
        formProps={addFormConfig}
        selectedEntity={selectedCampaign}
        showDetailsModal={showDetailsModal}
        onCloseDetailsModal={handleCloseDetailsModal}
        pageTitle={`Campañas ${campaignType === "scholar" ? "Escolares" : "Universitarias"}`}
        pageDescription={`Gestiona tus campañas de marketing ${campaignType === "scholar" ? "escolares" : "universitarias"}`}
        detailsModalTitle="Detalles de la Campaña"
        detailsModalDescription="Información detallada de la campaña seleccionada"
        entityDisplayConfig={entityDisplayConfig}
        notification={notification}
        onCloseNotification={handleCloseNotification}
      />
    </>
  );
}