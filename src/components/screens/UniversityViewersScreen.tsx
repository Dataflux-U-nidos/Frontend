import { useState, useEffect } from "react";
import { ListPageTemplate } from "@/components/templates/ListPageTemplate";
import { SearchFilterBar } from "@/components/molecules/SearchFilterBar";
import { DataTable } from "@/components/organisms/DataTable";
import { EntityForm, FormField } from "@/components/molecules/EntityForm";
import { ConfirmationDialog } from "@/components/molecules/ConfirmationDialog";
import {
  useCreateUser,
  useGetViewersByUniversity,
  useUpdateUser,
  useDeleteUser,
} from "@/hooks";

interface Viewer {
  id?: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
}

interface Notification {
  type: "success" | "error";
  title: string;
  message: string;
}

// Form fields for adding a new viewer with password validation
const viewerFormFields: FormField[] = [
  {
    name: "firstName",
    label: "Nombre",
    type: "text",
    required: true,
    validation: {
      pattern: {
        value: /^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)*$/,
        message: "El nombre sólo puede contener letras",
      },
    },
    placeholder: "Nombre",
  },
  {
    name: "lastName",
    label: "Apellido",
    type: "text",
    required: true,
    validation: {
      pattern: {
        value: /^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)*$/,
        message: "El apellido sólo puede contener letras",
      },
    },
    placeholder: "Apellido",
  },
  {
    name: "email",
    label: "Correo Electrónico",
    type: "email",
    required: true,
    validation: {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message:
          "Ingresa un correo con formato válido (ej. usuario@dominio.com)",
      },
    },
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    required: true,
    validation: {
      pattern: {
        value: /^(?=.*\d)(?=.*[!@#$%^&*_-])(?=.{8,})/,
        message:
          "La contraseña debe tener al menos 8 caracteres, un número y un caracter especial",
      },
    },
    placeholder: "Mín. 8 caracteres, 1 número y 1 caracter especial",
    helpText:
      "Para mayor seguridad, usa una contraseña con 8+ caracteres, un número y un caracter especial",
  },
];

// Form fields for editing a viewer (sin contraseña)
const viewerEditFormFields: FormField[] = [
  {
    name: "firstName",
    label: "Nombre",
    type: "text",
    required: true,
    validation: {
      pattern: {
        value: /^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)*$/,
        message: "El nombre sólo puede contener letras",
      },
    },
    placeholder: "Nombre",
  },
  {
    name: "lastName",
    label: "Apellido",
    type: "text",
    required: true,
    validation: {
      pattern: {
        value: /^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)*$/,
        message: "El apellido sólo puede contener letras",
      },
    },
    placeholder: "Apellido",
  },
  {
    name: "email",
    label: "Correo Electrónico",
    type: "email",
    required: true,
    validation: {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message:
          "Ingresa un correo con formato válido (ej. usuario@dominio.com)",
      },
    },
  },
];

export default function UniversityViewersScreen() {
  // Hooks for CRUD
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: getViewers } = useGetViewersByUniversity();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const { mutateAsync: updateUser } = useUpdateUser();

  // state variables
  const [viewersData, setViewersData] = useState<Viewer[]>([]);
  const [filteredData, setFilteredData] = useState<Viewer[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedViewer, setSelectedViewer] = useState<Viewer | null>(null);
  const [viewerToDelete, setViewerToDelete] = useState<Viewer | null>(null);
  const [viewerToEdit, setViewerToEdit] = useState<Viewer | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  // loads viewers when component mounts
  useEffect(() => {
    const fetchViewers = async () => {
      try {
        const viewers = await getViewers();
        const mappedViewers = viewers.map((user) => {
          // Extraer el nombre y apellido
          const fullName = `${user.name || ""} ${user.last_name || ""}`.trim();
          const nameParts = fullName.split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";

          return {
            id: user.id,
            email: user.email,
            name: fullName,
            firstName: firstName,
            lastName: lastName,
          };
        }) as Viewer[];
        setViewersData(mappedViewers);
        setFilteredData(mappedViewers);
      } catch (error) {
        console.error("Error fetching viewers:", error);
      }
    };

    fetchViewers();
  }, [getViewers]);

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

  // Manager for viewing viewer details
  const handleViewDetails = (viewer: Viewer) => {
    setSelectedViewer(viewer);
    setShowDetailsModal(true);
  };

  // Manager for closing the details modal
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedViewer(null);
  };

  // Manager for opening the add viewer modal
  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  // Manager for closing the add viewer modal
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  // Manager for initiating edit process
  const handleInitiateEdit = (viewer: Viewer) => {
    setViewerToEdit(viewer);
    setShowEditModal(true);
  };

  // Manager for canceling edit process
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setViewerToEdit(null);
  };

  // Manager for confirming and executing edit
  const handleEditViewer = async (formData: any) => {
    if (!viewerToEdit || !viewerToEdit.id) return;

    setIsEditing(true);

    try {
      const userData = {
        id: viewerToEdit.id,
        name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
      };

      await updateUser(userData);

      // Cerrar el modal de edición
      setShowEditModal(false);
      setViewerToEdit(null);

      // Actualizar la lista de visualizadores
      const updatedViewer = {
        ...viewerToEdit,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };

      const updatedViewers = viewersData.map((viewer) =>
        viewer.id === updatedViewer.id ? updatedViewer : viewer
      );

      setViewersData(updatedViewers);
      setFilteredData(updatedViewers);

      // Mostrar notificación de éxito
      setNotification({
        type: "success",
        title: "Visualizador actualizado",
        message: `El visualizador ${updatedViewer.name} ha sido actualizado exitosamente.`,
      });
    } catch (error) {
      console.error("Error actualizando visualizador:", error);

      // Mostrar notificación de error
      setNotification({
        type: "error",
        title: "Error al actualizar visualizador",
        message:
          error instanceof Error
            ? error.message
            : "Ha ocurrido un error al intentar actualizar el visualizador.",
      });
    } finally {
      setIsEditing(false);
    }
  };

  // Manager for initiating delete process
  const handleInitiateDelete = (viewer: Viewer) => {
    setViewerToDelete(viewer);
    setShowDeleteModal(true);
  };

  // Manager for canceling delete process
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setViewerToDelete(null);
  };

  // Manager for confirming and executing delete
  const handleConfirmDelete = async () => {
    if (!viewerToDelete || !viewerToDelete.id) return;

    setIsDeleting(true);

    try {
      await deleteUser(viewerToDelete.id);

      // Cerrar el modal de confirmación
      setShowDeleteModal(false);
      setViewerToDelete(null);

      // Actualizar la lista de visualizadores filtrando el eliminado
      const updatedViewers = viewersData.filter(
        (viewer) => viewer.id !== viewerToDelete.id
      );
      setViewersData(updatedViewers);
      setFilteredData(updatedViewers);

      // Mostrar notificación de éxito
      setNotification({
        type: "success",
        title: "Visualizador eliminado",
        message: `El visualizador ${viewerToDelete.name} ha sido eliminado exitosamente.`,
      });
    } catch (error) {
      console.error("Error eliminando visualizador:", error);

      // Mostrar notificación de error
      setNotification({
        type: "error",
        title: "Error al eliminar visualizador",
        message:
          error instanceof Error
            ? error.message
            : "Ha ocurrido un error al intentar eliminar el visualizador.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Manager for adding a new viewer
  const handleAddViewer = async (formData: any) => {
    const userData = {
      name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      userType: "VIEWER",
    };

    try {
      await createUser(userData);
      handleCloseAddModal();

      setNotification({
        type: "success",
        title: "Visualizador creado!",
        message: `El visualizador ${userData.name} ${userData.last_name} ha sido creado exitosamente.`,
      });

      // Actualizar la lista de visualizadores
      const viewers = await getViewers();
      const mappedViewers = viewers.map((user) => {
        const fullName = `${user.name || ""} ${user.last_name || ""}`.trim();
        const nameParts = fullName.split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        return {
          id: user.id,
          email: user.email,
          name: fullName,
          firstName: firstName,
          lastName: lastName,
        };
      }) as Viewer[];
      setViewersData(mappedViewers);
      setFilteredData(mappedViewers);
    } catch (error) {
      console.error("Error creando visualizador:", error);

      // Mostrar notificación de error
      setNotification({
        type: "error",
        title: "Error al crear visualizador",
        message:
          error instanceof Error
            ? error.message
            : "Ha ocurrido un error al intentar crear el visualizador.",
      });
    }
  };

  // Manager for searching viewers
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredData(viewersData);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = viewersData.filter(
      (viewer) =>
        viewer.name.toLowerCase().includes(lowerCaseSearch) ||
        viewer.email.toLowerCase().includes(lowerCaseSearch)
    );

    setFilteredData(filtered);
  };

  // Configuration for viewer details display
  const entityDisplayConfig = {
    fields: ["name", "email"] as (keyof Viewer)[],
    labels: {
      name: "Nombre",
      email: "Correo",
    },
    avatar: {
      field: "name" as keyof Viewer,
      fallback: (viewer: Viewer) => viewer.name.split(" ")[0].charAt(0),
      bgColor: "bg-orange-500",
      textColor: "text-white",
    },
  };

  const tableActions = [
    {
      label: "Editar",
      onClick: handleInitiateEdit,
      variant: "outline",
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
    {
      label: "Eliminar",
      onClick: handleInitiateDelete,
      variant: "danger",
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      ),
    },
  ];

  const tableConfig = {
    caption: "Visualizadores asignados",
    rowsPerPage: 6,
    onViewDetails: handleViewDetails,
    displayColumns: ["email", "name"],
    columnHeaders: {
      email: "Correo",
      name: "Nombre",
    },
    actionButtonText: "Ver detalles",
    actions: tableActions,
  };

  const searchBarConfig = {
    onSearch: handleSearch,
    onAddEntity: handleOpenAddModal,
    searchPlaceholder: "Buscar visualizador",
    addButtonLabel: "Agregar visualizador",
    showFilterButton: false,
  };

  const addFormConfig = {
    isOpen: showAddModal,
    onClose: handleCloseAddModal,
    onSubmit: handleAddViewer,
    fields: viewerFormFields,
    title: "Agregar Nuevo Visualizador",
    description: "Completa el formulario para agregar un nuevo visualizador.",
    submitButtonText: "Agregar Visualizador",
    cancelButtonText: "Cancelar",
  };

  // Fixed defaultValues to use ternary operator instead of && to avoid type error
  const editFormConfig = {
    isOpen: showEditModal,
    onClose: handleCancelEdit,
    onSubmit: handleEditViewer,
    fields: viewerEditFormFields,
    title: "Editar Visualizador",
    description: "Modifica la información del visualizador.",
    submitButtonText: "Guardar Cambios",
    cancelButtonText: "Cancelar",
    isLoading: isEditing,
    defaultValues: viewerToEdit
      ? {
          firstName:
            viewerToEdit.firstName ?? viewerToEdit.name.split(" ")[0] ?? "",
          lastName:
            viewerToEdit.lastName ??
            viewerToEdit.name.split(" ").slice(1).join(" ") ??
            "",
          email: viewerToEdit.email,
        }
      : undefined,
  };

  return (
    <>
      <ConfirmationDialog
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Eliminar visualizador"
        description={`¿Estás seguro de que deseas eliminar a ${viewerToDelete?.name}? Esta acción no se puede deshacer.`}
        confirmButtonText="Eliminar"
        cancelButtonText="Cancelar"
        variant="danger"
        isLoading={isDeleting}
      />

      <EntityForm {...addFormConfig} />
      <EntityForm {...editFormConfig} />

      <ListPageTemplate
        // Data and entity type
        data={filteredData}
        entityType="Visualizadores"
        // Components
        SearchBarComponent={SearchFilterBar}
        TableComponent={DataTable}
        FormComponent={EntityForm}
        // Props for componentes
        searchBarProps={searchBarConfig}
        tableProps={tableConfig}
        formProps={addFormConfig}
        // State and handlers for modals
        selectedEntity={selectedViewer}
        showDetailsModal={showDetailsModal}
        onCloseDetailsModal={handleCloseDetailsModal}
        pageTitle="Tus Visualizadores"
        pageDescription="Gestiona la información de los visualizadores a tu cargo"
        detailsModalTitle="Detalles del Visualizador"
        detailsModalDescription="Información detallada del visualizador seleccionado"
        // Configuration for the details modal
        entityDisplayConfig={entityDisplayConfig}
        notification={notification}
        onCloseNotification={handleCloseNotification}
      />
    </>
  );
}
