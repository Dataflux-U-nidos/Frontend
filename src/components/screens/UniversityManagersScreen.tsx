import  { useState, useEffect } from "react";
import { ListPageTemplate } from "@/components/templates/ListPageTemplate";
import { SearchFilterBar } from "@/components/molecules/SearchFilterBar";
import { DataTable } from "@/components/organisms/DataTable";
import { EntityForm, FormField } from "@/components/molecules/EntityForm";
import { ConfirmationDialog } from "@/components/molecules/ConfirmationDialog";
import {
  useCreateUser,
  useGetManagersByUniversity,
  useUpdateUser,
  useDeleteUser,
} from "@/hooks";

interface Manager {
  id?: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
}

// Interfaz para la notificación
interface Notification {
  type: 'success' | 'error';
  title: string;
  message: string;
}

// Form fields for adding a new manager
const managerFormFields: FormField[] = [
  {
    name: "firstName",
    label: "Nombre",
    type: "text",
    required: true,
  },
  {
    name: "lastName",
    label: "Apellido",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Correo Electrónico",
    type: "email",
    required: true,
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    required: true,
  },
];

// Form fields for editing a manager (sin contraseña)
const managerEditFormFields: FormField[] = [
  {
    name: "firstName",
    label: "Nombre",
    type: "text",
    required: true,
  },
  {
    name: "lastName",
    label: "Apellido",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Correo Electrónico",
    type: "email",
    required: true,
  },
];

export default function UniversityManagersScreen() {
  // Hooks para operaciones CRUD
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: getManagers } = useGetManagersByUniversity();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const { mutateAsync: updateUser } = useUpdateUser();

  // State to manage managers data
  const [managersData, setManagersData] = useState<Manager[]>([]);

  // State to manage filtered data
  const [filteredData, setFilteredData] = useState<Manager[]>([]);

  // State to manage the modal for viewing manager details
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // State to manage the modal for adding a new manager
  const [showAddModal, setShowAddModal] = useState(false);
  
  // State to manage the modal for editing a manager
  const [showEditModal, setShowEditModal] = useState(false);
  
  // State to manage confirmation dialog for deleting a manager
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // State to manage loading states
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // State to manage the selected manager for details
  const [selectedmanager, setSelectedmanager] = useState<Manager | null>(null);
  
  // State to manage the manager to delete
  const [managerToDelete, setmanagerToDelete] = useState<Manager | null>(null);
  
  // State to manage the manager to edit
  const [managerToEdit, setmanagerToEdit] = useState<Manager | null>(null);

  // Estado para manejar notificaciones
  const [notification, setNotification] = useState<Notification | null>(null);

  // loads managers when component mounts
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const managers = await getManagers();
        const mappedManagers = managers.map((user) => {
          // Extraer el nombre y apellido
          const fullName = `${user.name || ''} ${user.last_name || ''}`.trim();
          const nameParts = fullName.split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';
          
          return {
            id: user.id,
            email: user.email,
            name: fullName,
            firstName: firstName,
            lastName: lastName,
          };
        }) as Manager[];
        setManagersData(mappedManagers);
        setFilteredData(mappedManagers);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };

    fetchManagers();
  }, [getManagers]);

  // Manejador para cerrar la notificación
  const handleCloseNotification = () => {
    setNotification(null);
  };

  // Efecto para auto-cerrar la notificación después de 5 segundos
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Manager for viewing manager details
  const handleViewDetails = (manager: Manager) => {
    setSelectedmanager(manager);
    setShowDetailsModal(true);
  };

  // Manager for closing the details modal
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedmanager(null);
  };

  // Manager for opening the add manager modal
  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  // Manager for closing the add manager modal
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };
  
  // Manager for initiating edit process
  const handleInitiateEdit = (manager: Manager) => {
    setmanagerToEdit(manager);
    setShowEditModal(true);
  };
  
  // Manager for canceling edit process
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setmanagerToEdit(null);
  };
  
  // Manager for confirming and executing edit
  const handleEditmanager = async (formData: any) => {
    if (!managerToEdit || !managerToEdit.id) return;
    
    setIsEditing(true);
    
    try {
      const userData = {
        id: managerToEdit.id,
        name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
      };
      
      await updateUser(userData);
      
      // Cerrar el modal de edición
      setShowEditModal(false);
      setmanagerToEdit(null);
      
      // Actualizar la lista de gestores de información
      const updatedmanager = {
        ...managerToEdit,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };
      
      const updatedManagers = managersData.map(manager => 
        manager.id === updatedmanager.id ? updatedmanager : manager
      );
      
      setManagersData(updatedManagers);
      setFilteredData(updatedManagers);
      
      // Mostrar notificación de éxito
      setNotification({
        type: 'success',
        title: 'Gestor de Información actualizado',
        message: `El gestor de información ${updatedmanager.name} ha sido actualizado exitosamente.`
      });
    } catch (error) {
      console.error("Error actualizando gestor de información:", error);
      
      // Mostrar notificación de error
      setNotification({
        type: 'error',
        title: 'Error al actualizar gestor de información',
        message: error instanceof Error 
          ? error.message 
          : 'Ha ocurrido un error al intentar actualizar el gestor de información.'
      });
    } finally {
      setIsEditing(false);
    }
  };
  
  // Manager for initiating delete process
  const handleInitiateDelete = (manager: Manager) => {
    setmanagerToDelete(manager);
    setShowDeleteModal(true);
  };
  
  // Manager for canceling delete process
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setmanagerToDelete(null);
  };
  
  // Manager for confirming and executing delete
  const handleConfirmDelete = async () => {
    if (!managerToDelete || !managerToDelete.id) return;
    
    setIsDeleting(true);
    
    try {
      await deleteUser(managerToDelete.id);
      
      // Cerrar el modal de confirmación
      setShowDeleteModal(false);
      setmanagerToDelete(null);
      
      // Actualizar la lista de gestores de información filtrando el eliminado
      const updatedManagers = managersData.filter(
        manager => manager.id !== managerToDelete.id
      );
      setManagersData(updatedManagers);
      setFilteredData(updatedManagers);
      
      // Mostrar notificación de éxito
      setNotification({
        type: 'success',
        title: 'Gestor de Información eliminado',
        message: `El gestor de información ${managerToDelete.name} ha sido eliminado exitosamente.`
      });
    } catch (error) {
      console.error("Error eliminando gestor de información:", error);
      
      // Mostrar notificación de error
      setNotification({
        type: 'error',
        title: 'Error al eliminar gestor de información',
        message: error instanceof Error 
          ? error.message 
          : 'Ha ocurrido un error al intentar eliminar el gestor de información.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Manager for adding a new manager
  const handleAddmanager = async (formData: any) => {
    const userData = {
      name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      userType: "INFOMANAGER",
    };

    console.log("Enviando:", userData);
    
    try {
      await createUser(userData);
      handleCloseAddModal();
      
      setNotification({
        type: 'success',
        title: 'Gestor de Información creado!',
        message: `El gestor de información ${userData.name} ${userData.last_name} ha sido creado exitosamente.`
      });
      
      // Actualizar la lista de gestores de información
      const managers = await getManagers();
      const mappedManagers = managers.map((user) => {
        const fullName = `${user.name || ''} ${user.last_name || ''}`.trim();
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        return {
          id: user.id,
          email: user.email,
          name: fullName,
          firstName: firstName,
          lastName: lastName,
        };
      }) as Manager[];
      setManagersData(mappedManagers);
      setFilteredData(mappedManagers);
      
    } catch (error) {
      console.error("Error creando gestor de información:", error);
      
      // Mostrar notificación de error
      setNotification({
        type: 'error',
        title: 'Error al crear gestor de información',
        message: error instanceof Error 
          ? error.message 
          : 'Ha ocurrido un error al intentar crear el gestor de información.'
      });
    }
  };

  // Manager for searching managers
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredData(managersData);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = managersData.filter(
      (manager) =>
        manager.name.toLowerCase().includes(lowerCaseSearch) ||
        manager.email.toLowerCase().includes(lowerCaseSearch)
    );

    setFilteredData(filtered);
  };

  // Configuration for manager details display
  const entityDisplayConfig = {
    fields: ["name", "email"] as (keyof Manager)[],
    labels: {
      name: "Nombre",
      email: "Correo",
    },
    avatar: {
      field: "name" as keyof Manager,
      fallback: (manager: Manager) => manager.name.split(" ")[0].charAt(0),
      bgColor: "bg-orange-500",
      textColor: "text-white",
    },
  };

  // Definir acciones para la tabla
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
    caption: "Gestores de Información asignados",
    rowsPerPage: 6,
    onViewDetails: handleViewDetails,
    displayColumns: ["email", "name"],
    columnHeaders: {
      email: "Correo",
      name: "Nombre",
    },
    actionButtonText: "Ver detalles",
    actions: tableActions
  };

  const searchBarConfig = {
    onSearch: handleSearch,
    onAddEntity: handleOpenAddModal,
    searchPlaceholder: "Buscar gestor de información",
    addButtonLabel: "Agregar gestor de información",
    showFilterButton: false 
  };

  const addFormConfig = {
    isOpen: showAddModal,
    onClose: handleCloseAddModal,
    onSubmit: handleAddmanager,
    fields: managerFormFields,
    title: "Agregar Nuevo Gestor de Información",
    description: "Completa el formulario para agregar un nuevo gestor de información.",
    submitButtonText: "Agregar Gestor de Información",
    cancelButtonText: "Cancelar",
  };
  
  const editFormConfig = {
    isOpen: showEditModal,
    onClose: handleCancelEdit,
    onSubmit: handleEditmanager,
    fields: managerEditFormFields,
    title: "Editar Gestor de Información",
    description: "Modifica la información del gestor de información.",
    submitButtonText: "Guardar Cambios",
    cancelButtonText: "Cancelar",
    isLoading: isEditing,
    defaultValues: managerToEdit && {
      firstName: managerToEdit.firstName ?? managerToEdit.name.split(' ')[0] ?? '',
      lastName: managerToEdit.lastName ?? managerToEdit.name.split(' ').slice(1).join(' ') ?? '',
      email: managerToEdit.email,
    }
  };


  return (
    <>
      {/* Modal de confirmación para eliminar gestor de información */}
      <ConfirmationDialog
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Eliminar gestor de información"
        description={`¿Estás seguro de que deseas eliminar a ${managerToDelete?.name}? Esta acción no se puede deshacer.`}
        confirmButtonText="Eliminar"
        cancelButtonText="Cancelar"
        variant="danger"
        isLoading={isDeleting}
      />
      
      {/* Formulario para agregar gestores de información */}
      <EntityForm {...addFormConfig} />
      
      {/* Formulario para editar gestores de información */}
      <EntityForm {...editFormConfig} />
      
      <ListPageTemplate
        // Data and entity type
        data={filteredData}
        entityType="Gestores de Información"
        // Components
        SearchBarComponent={SearchFilterBar}
        TableComponent={DataTable}
        FormComponent={EntityForm}
        // Props for componentes
        searchBarProps={searchBarConfig}
        tableProps={tableConfig}
        formProps={addFormConfig}
        // State and handlers for modals
        selectedEntity={selectedmanager}
        showDetailsModal={showDetailsModal}
        onCloseDetailsModal={handleCloseDetailsModal}
        pageTitle="Tus Gestores de Información"
        pageDescription="Gestiona la información de los gestores de información a tu cargo"
        detailsModalTitle="Detalles del Gestor de Información"
        detailsModalDescription="Información detallada del gestor de información seleccionado"
        // Configuration for the details modal
        entityDisplayConfig={entityDisplayConfig}
        notification={notification}
        onCloseNotification={handleCloseNotification}
      />
    </>
  );
}