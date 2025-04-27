import  { useState, useEffect } from "react";
import { ListPageTemplate } from "@/components/templates/ListPageTemplate";
import { SearchFilterBar } from "@/components/molecules/SearchFilterBar";
import { DataTable } from "@/components/organisms/DataTable";
import { EntityForm, FormField } from "@/components/molecules/EntityForm";
import { ConfirmationDialog } from "@/components/molecules/ConfirmationDialog";
import {
  useCreateUser,
  useGetMarketingByAdmin,
  useUpdateUser,
  useDeleteUser,
} from "@/hooks";

interface MarketingUser {
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

// Form fields for adding a new marketingUser
const marketingUserFormFields: FormField[] = [
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

// Form fields for editing a marketingUser (sin contraseña)
const marketingUserEditFormFields: FormField[] = [
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

export default function UniversityMarketingUsersScreen() {
  // Hooks para operaciones CRUD
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: getMarketingUsers } = useGetMarketingByAdmin();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const { mutateAsync: updateUser } = useUpdateUser();

    // state variables
  const [marketingUsersData, setMarketingUsersData] = useState<MarketingUser[]>([]);
  const [filteredData, setFilteredData] = useState<MarketingUser[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMarketingUser, setSelectedMarketingUser] = useState<MarketingUser | null>(null);
  const [marketingUserToDelete, setMarketingUserToDelete] = useState<MarketingUser | null>(null);
  const [marketingUserToEdit, setMarketingUserToEdit] = useState<MarketingUser | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  // loads marketingUsers when component mounts
  useEffect(() => {
    const fetchMarketingUsers = async () => {
      try {
        const marketingUsers = await getMarketingUsers();
        const mappedMarketingUsers = marketingUsers.map((user) => {
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
        }) as MarketingUser[];
        setMarketingUsersData(mappedMarketingUsers);
        setFilteredData(mappedMarketingUsers);
      } catch (error) {
        console.error("Error fetching marketingUsers:", error);
      }
    };

    fetchMarketingUsers();
  }, [getMarketingUsers]);

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

  // Manager for viewing marketingUser details
  const handleViewDetails = (marketingUser: MarketingUser) => {
    setSelectedMarketingUser(marketingUser);
    setShowDetailsModal(true);
  };

  // Manager for closing the details modal
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedMarketingUser(null);
  };

  // Manager for opening the add marketingUser modal
  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  // Manager for closing the add marketingUser modal
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };
  
  // Manager for initiating edit process
  const handleInitiateEdit = (marketingUser: MarketingUser) => {
    const userToEdit = {
      ...marketingUser,
      firstName: marketingUser.firstName || marketingUser.name.split(' ')[0] || '',
      lastName: marketingUser.lastName || 
                (marketingUser.name.includes(' ') ? 
                  marketingUser.name.substring(marketingUser.name.indexOf(' ') + 1).trim() : '')
    };
    setMarketingUserToEdit(userToEdit);
    setShowEditModal(true);
  };
  
  // Manager for canceling edit process
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setMarketingUserToEdit(null);
  };
  
  // Manager for confirming and executing edit
  const handleEditMarketingUser = async (formData: any) => {
    if (!marketingUserToEdit || !marketingUserToEdit.id) return;
    
    setIsEditing(true);
    
    try {
      const userData = {
        id: marketingUserToEdit.id,
        name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
      };
      
      await updateUser(userData);
      
      setShowEditModal(false);
      setMarketingUserToEdit(null);
      
      const updatedMarketingUser = {
        ...marketingUserToEdit,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };
      
      const updatedMarketingUsers = marketingUsersData.map(marketingUser => 
        marketingUser.id === updatedMarketingUser.id ? updatedMarketingUser : marketingUser
      );
      
      setMarketingUsersData(updatedMarketingUsers);
      setFilteredData(updatedMarketingUsers);
      
      setNotification({
        type: 'success',
        title: 'Usuario de marketing actualizado',
        message: `El usuario de marketing ${updatedMarketingUser.name} ha sido actualizado exitosamente.`
      });
    } catch (error) {
      console.error("Error actualizando usuario de marketing:", error);
      
      setNotification({
        type: 'error',
        title: 'Error al actualizar usuario de marketing',
        message: error instanceof Error 
          ? error.message 
          : 'Ha ocurrido un error al intentar actualizar el usuario de marketing.'
      });
    } finally {
      setIsEditing(false);
    }
  };
  
  // Manager for initiating delete process
  const handleInitiateDelete = (marketingUser: MarketingUser) => {
    setMarketingUserToDelete(marketingUser);
    setShowDeleteModal(true);
  };
  
  // Manager for canceling delete process
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setMarketingUserToDelete(null);
  };
  
  // Manager for confirming and executing delete
  const handleConfirmDelete = async () => {
    if (!marketingUserToDelete || !marketingUserToDelete.id) return;
    
    setIsDeleting(true);
    
    try {
      await deleteUser(marketingUserToDelete.id);
      
      setShowDeleteModal(false);
      setMarketingUserToDelete(null);
      
      const updatedMarketingUsers = marketingUsersData.filter(
        marketingUser => marketingUser.id !== marketingUserToDelete.id
      );
      setMarketingUsersData(updatedMarketingUsers);
      setFilteredData(updatedMarketingUsers);
      
      setNotification({
        type: 'success',
        title: 'Usuario de marketing eliminado',
        message: `El usuario de marketing ${marketingUserToDelete.name} ha sido eliminado exitosamente.`
      });
    } catch (error) {
      console.error("Error eliminando usuario de marketing:", error);
      
      setNotification({
        type: 'error',
        title: 'Error al eliminar usuario de marketing',
        message: error instanceof Error 
          ? error.message 
          : 'Ha ocurrido un error al intentar eliminar el usuario de marketing.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Manager for adding a new marketingUser
  const handleAddMarketingUser = async (formData: any) => {
    const userData = {
      name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      userType: "MARKETING",
    };

    console.log("Enviando:", userData);
    
    try {
      await createUser(userData);
      handleCloseAddModal();
      
      setNotification({
        type: 'success',
        title: 'Usuario de marketing creado!',
        message: `El usuario de marketing ${userData.name} ${userData.last_name} ha sido creado exitosamente.`
      });
      
      const marketingUsers = await getMarketingUsers();
      const mappedMarketingUsers = marketingUsers.map((user) => {
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
      }) as MarketingUser[];
      setMarketingUsersData(mappedMarketingUsers);
      setFilteredData(mappedMarketingUsers);
      
    } catch (error) {
      console.error("Error creando usuario de marketing:", error);
      
      setNotification({
        type: 'error',
        title: 'Error al crear usuario de marketing',
        message: error instanceof Error 
          ? error.message 
          : 'Ha ocurrido un error al intentar crear el usuario de marketing.'
      });
    }
  };

  // Manager for searching marketingUsers
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredData(marketingUsersData);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = marketingUsersData.filter(
      (marketingUser) =>
        marketingUser.name.toLowerCase().includes(lowerCaseSearch) ||
        marketingUser.email.toLowerCase().includes(lowerCaseSearch)
    );

    setFilteredData(filtered);
  };

  // Configuration for marketingUser details display
  const entityDisplayConfig = {
    fields: ["name", "email"] as (keyof MarketingUser)[],
    labels: {
      name: "Nombre",
      email: "Correo",
    },
    avatar: {
      field: "name" as keyof MarketingUser,
      fallback: (marketingUser: MarketingUser) => marketingUser.name.split(" ")[0].charAt(0),
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
    caption: "Usuarios de marketing asignados",
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
    searchPlaceholder: "Buscar usuario de marketing",
    addButtonLabel: "Agregar usuario de marketing",
    showFilterButton: false 
  };

  const addFormConfig = {
    isOpen: showAddModal,
    onClose: handleCloseAddModal,
    onSubmit: handleAddMarketingUser,
    fields: marketingUserFormFields,
    title: "Agregar Nuevo Usuario de marketing",
    description: "Completa el formulario para agregar un nuevo usuario de marketing.",
    submitButtonText: "Agregar Usuario de marketing",
    cancelButtonText: "Cancelar",
  };
  
  const editFormConfig = {
    isOpen: showEditModal,
    onClose: handleCancelEdit,
    onSubmit: handleEditMarketingUser,
    fields: marketingUserEditFormFields,
    title: "Editar Usuario de marketing",
    description: "Modifica la información del usuario de marketing.",
    submitButtonText: "Guardar Cambios",
    cancelButtonText: "Cancelar",
    isLoading: isEditing,
    defaultValues: marketingUserToEdit && {
      firstName: marketingUserToEdit.firstName ?? marketingUserToEdit.name.split(' ')[0] ?? '',
      lastName: marketingUserToEdit.lastName ?? marketingUserToEdit.name.split(' ').slice(1).join(' ') ?? '',
      email: marketingUserToEdit.email,
    }
  };
  console.log("defaultValues", editFormConfig.defaultValues);


  return (
    <>
      <ConfirmationDialog
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Eliminar usuario de marketing"
        description={`¿Estás seguro de que deseas eliminar a ${marketingUserToDelete?.name}? Esta acción no se puede deshacer.`}
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
        entityType="Usuarios de marketing"
        // Components
        SearchBarComponent={SearchFilterBar}
        TableComponent={DataTable}
        FormComponent={EntityForm}
        // Props for componentes
        searchBarProps={searchBarConfig}
        tableProps={tableConfig}
        formProps={addFormConfig}
        // State and handlers for modals
        selectedEntity={selectedMarketingUser}
        showDetailsModal={showDetailsModal}
        onCloseDetailsModal={handleCloseDetailsModal}
        pageTitle="Tus Usuarios de marketing"
        pageDescription="Gestiona la información de los usuario de marketing a tu cargo"
        detailsModalTitle="Detalles del Usuario de marketing"
        detailsModalDescription="Información detallada del usuario de marketing seleccionado"
        // Configuration for the details modal
        entityDisplayConfig={entityDisplayConfig}
        notification={notification}
        onCloseNotification={handleCloseNotification}
      />
    </>
  );
}