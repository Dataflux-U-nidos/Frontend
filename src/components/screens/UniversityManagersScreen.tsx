import { useState, useEffect } from "react";
import { ListPageTemplate } from "@/components/templates/ListPageTemplate";
import { SearchFilterBar } from "@/components/molecules/SearchFilterBar";
import { DataTable } from "@/components/organisms/DataTable";
import { EntityForm, FormField } from "@/components/molecules/EntityForm";
import { ConfirmationDialog } from "@/components/molecules/ConfirmationDialog";
import { parseFullName, combineNames } from "@/utils/nameUtils";
import {
  useCreateUser,
  useGetManagersByUniversity,
  useUpdateMyUser,
  useDeleteUser,
} from "@/hooks";

interface Manager {
  id?: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
}

interface Notification {
  type: 'success' | 'error';
  title: string;
  message: string;
}

// Form fields for adding a new manager with password validation
const managerFormFields: FormField[] = [
  {
    name: "firstName",
    label: "Nombre",
    type: "text",
    required: true,
    validation: {
      pattern: {
        value: /^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)*$/,
        message: "El nombre sólo puede contener letras"
      }
    },
    placeholder: "Nombre"
  },
  {
    name: "lastName",
    label: "Apellido",
    type: "text",
    required: true,
    validation: {
      pattern: {
        value: /^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)*$/,
        message: "El apellido sólo puede contener letras"
      }
    },
    placeholder: "Apellido"
  },
  {
    name: "email",
    label: "Correo Electrónico",
    type: "email",
    required: true,
    validation: {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Ingresa un correo con formato válido (ej. usuario@dominio.com)"
      }
    }
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    required: true,
    validation: {
      pattern: {
        value: /^(?=.*\d)(?=.*[!@#$%^&*_-])(?=.{8,})/, 
        message: "La contraseña debe tener al menos 8 caracteres, un número y un caracter especial"
      }
    },
    placeholder: "Mín. 8 caracteres, 1 número y 1 caracter especial",
    helpText: "Para mayor seguridad, usa una contraseña con 8+ caracteres, un número y un caracter especial"
  },
];

// Form fields for editing a manager (sin contraseña)
const managerEditFormFields: FormField[] = [
  {
    name: "firstName",
    label: "Nombre",
    type: "text",
    required: true,
    validation: {
      pattern: {
        value: /^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)*$/,
        message: "El nombre sólo puede contener letras"
      }
    },
    placeholder: "Nombre"
  },
  {
    name: "lastName",
    label: "Apellido",
    type: "text",
    required: true,
    validation: {
      pattern: {
        value: /^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)*$/,
        message: "El apellido sólo puede contener letras"
      }
    },
    placeholder: "Apellido"
  },
  {
    name: "email",
    label: "Correo Electrónico",
    type: "email",
    required: true,
    validation: {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Ingresa un correo con formato válido (ej. usuario@dominio.com)"
      }
    }
  },
];

export default function UniversityManagersScreen() {
  // Hooks for CRUD
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: getManagers } = useGetManagersByUniversity();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const { mutateAsync: updateUser } = useUpdateMyUser();

  // state variables
  const [managersData, setManagersData] = useState<Manager[]>([]);
  const [filteredData, setFilteredData] = useState<Manager[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);
  const [managerToDelete, setManagerToDelete] = useState<Manager | null>(null);
  const [managerToEdit, setManagerToEdit] = useState<Manager | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  // loads managers when component mounts
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const managers = await getManagers();
        const mappedManagers = managers.map((user) => {
          // Usar las funciones utilitarias para manejar nombres correctamente
          const { firstName, lastName } = parseFullName(user.name || '', user.last_name || '');
          const fullName = combineNames(firstName, lastName);
          
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

  // Manager for viewing manager details
  const handleViewDetails = (manager: Manager) => {
    setSelectedManager(manager);
    setShowDetailsModal(true);
  };

  // Manager for closing the details modal
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedManager(null);
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
    setManagerToEdit(manager);
    setShowEditModal(true);
  };
  
  // Manager for canceling edit process
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setManagerToEdit(null);
  };
  
  // Manager for confirming and executing edit
  const handleEditManager = async (formData: any) => {
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
      setManagerToEdit(null);
      
      // Actualizar la lista de gestores de información
      const updatedManager = {
        ...managerToEdit,
        name: combineNames(formData.firstName, formData.lastName),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };
      
      const updatedManagers = managersData.map(manager => 
        manager.id === updatedManager.id ? updatedManager : manager
      );
      
      setManagersData(updatedManagers);
      setFilteredData(updatedManagers);
      
      // Mostrar notificación de éxito
      setNotification({
        type: 'success',
        title: 'Gestor de Información actualizado',
        message: `El gestor de información ${updatedManager.name} ha sido actualizado exitosamente.`
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
    setManagerToDelete(manager);
    setShowDeleteModal(true);
  };
  
  // Manager for canceling delete process
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setManagerToDelete(null);
  };
  
  // Manager for confirming and executing delete
  const handleConfirmDelete = async () => {
    if (!managerToDelete || !managerToDelete.id) return;
    
    setIsDeleting(true);
    
    try {
      await deleteUser(managerToDelete.id);
      
      // Cerrar el modal de confirmación
      setShowDeleteModal(false);
      setManagerToDelete(null);
      
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
  const handleAddManager = async (formData: any) => {
    const userData = {
      name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      userType: "INFOMANAGER",
    };

    try {
      await createUser(userData);
      handleCloseAddModal();
      
      setNotification({
        type: 'success',
        title: 'Gestor de Información creado!',
        message: `El gestor de información ${userData.name} ${userData.last_name} ha sido creado exitosamente.`
      });
      
      // Actualizar la lista de gestores de información usando las funciones utilitarias
      const managers = await getManagers();
      const mappedManagers = managers.map((user) => {
        const { firstName, lastName } = parseFullName(user.name || '', user.last_name || '');
        const fullName = combineNames(firstName, lastName);
        
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
    onSubmit: handleAddManager,
    fields: managerFormFields,
    title: "Agregar Nuevo Gestor de Información",
    description: "Completa el formulario para agregar un nuevo gestor de información.",
    submitButtonText: "Agregar Gestor de Información",
    cancelButtonText: "Cancelar",
  };
  
  // Usar los valores correctos ya procesados por las funciones utilitarias
  const editFormConfig = {
    isOpen: showEditModal,
    onClose: handleCancelEdit,
    onSubmit: handleEditManager,
    fields: managerEditFormFields,
    title: "Editar Gestor de Información",
    description: "Modifica la información del gestor de información.",
    submitButtonText: "Guardar Cambios",
    cancelButtonText: "Cancelar",
    isLoading: isEditing,
    defaultValues: managerToEdit ? {
      firstName: managerToEdit.firstName || '',
      lastName: managerToEdit.lastName || '',
      email: managerToEdit.email || '',
    } : undefined
  };

  return (
    <>
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
      
      <EntityForm {...addFormConfig} />
      
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
        selectedEntity={selectedManager}
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