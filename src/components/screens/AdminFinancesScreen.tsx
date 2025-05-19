import { useState, useEffect } from "react";
import { ListPageTemplate } from "@/components/templates/ListPageTemplate";
import { SearchFilterBar } from "@/components/molecules/SearchFilterBar";
import { DataTable } from "@/components/organisms/DataTable";
import { EntityForm, FormField } from "@/components/molecules/EntityForm";
import { ConfirmationDialog } from "@/components/molecules/ConfirmationDialog";
import { parseFullName, combineNames } from "@/utils/nameUtils";
import {
  useCreateUser,
  useGetFinanceByAdmin,
  useUpdateUser,
  useDeleteUser,
} from "@/hooks";

interface FinanceUser {
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

// Form fields for adding a new financeUser with password validation
const financeUserFormFields: FormField[] = [
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

// Form fields for editing a financeUser (sin contraseña)
const financeUserEditFormFields: FormField[] = [
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

export default function AdminFinancesScreen() {
  // Hooks para operaciones CRUD
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: getFinanceUsers } = useGetFinanceByAdmin();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const { mutateAsync: updateUser } = useUpdateUser();

  // state variables
  const [financeUsersData, setFinanceUsersData] = useState<FinanceUser[]>([]);
  const [filteredData, setFilteredData] = useState<FinanceUser[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFinanceUser, setSelectedFinanceUser] = useState<FinanceUser | null>(null);
  const [financeUserToDelete, setFinanceUserToDelete] = useState<FinanceUser | null>(null);
  const [financeUserToEdit, setFinanceUserToEdit] = useState<FinanceUser | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  // loads financeUsers when component mounts
  useEffect(() => {
    const fetchFinanceUsers = async () => {
      try {
        const financeUsers = await getFinanceUsers();
        const mappedFinanceUsers = financeUsers.map((user) => {
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
        }) as FinanceUser[];
        setFinanceUsersData(mappedFinanceUsers);
        setFilteredData(mappedFinanceUsers);
      } catch (error) {
        console.error("Error fetching financeUsers:", error);
      }
    };

    fetchFinanceUsers();
  }, [getFinanceUsers]);

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

  // Manager for viewing financeUser details
  const handleViewDetails = (financeUser: FinanceUser) => {
    setSelectedFinanceUser(financeUser);
    setShowDetailsModal(true);
  };

  // Manager for closing the details modal
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedFinanceUser(null);
  };

  // Manager for opening the add financeUser modal
  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  // Manager for closing the add financeUser modal
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  // Manager for initiating edit process
  const handleInitiateEdit = (financeUser: FinanceUser) => {
    setFinanceUserToEdit(financeUser);
    setShowEditModal(true);
  };

  // Manager for canceling edit process
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setFinanceUserToEdit(null);
  };

  // Manager for confirming and executing edit
  const handleEditFinanceUser = async (formData: any) => {
    if (!financeUserToEdit || !financeUserToEdit.id) return;

    setIsEditing(true);

    try {
      const userData = {
        id: financeUserToEdit.id,
        name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
      };

      await updateUser(userData);

      setShowEditModal(false);
      setFinanceUserToEdit(null);

      const updatedFinanceUser = {
        ...financeUserToEdit,
        name: combineNames(formData.firstName, formData.lastName),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };

      const updatedFinanceUsers = financeUsersData.map(financeUser =>
        financeUser.id === updatedFinanceUser.id ? updatedFinanceUser : financeUser
      );

      setFinanceUsersData(updatedFinanceUsers);
      setFilteredData(updatedFinanceUsers);

      setNotification({
        type: 'success',
        title: 'Usuario de finanzas actualizado',
        message: `El usuario de finanzas ${updatedFinanceUser.name} ha sido actualizado exitosamente.`
      });
    } catch (error) {
      console.error("Error actualizando usuario de finanzas:", error);

      setNotification({
        type: 'error',
        title: 'Error al actualizar usuario de finanzas',
        message: error instanceof Error
          ? error.message
          : 'Ha ocurrido un error al intentar actualizar el usuario de finanzas.'
      });
    } finally {
      setIsEditing(false);
    }
  };

  // Manager for initiating delete process
  const handleInitiateDelete = (financeUser: FinanceUser) => {
    setFinanceUserToDelete(financeUser);
    setShowDeleteModal(true);
  };

  // Manager for canceling delete process
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setFinanceUserToDelete(null);
  };

  // Manager for confirming and executing delete
  const handleConfirmDelete = async () => {
    if (!financeUserToDelete || !financeUserToDelete.id) return;

    setIsDeleting(true);

    try {
      await deleteUser(financeUserToDelete.id);

      setShowDeleteModal(false);
      setFinanceUserToDelete(null);

      const updatedFinanceUsers = financeUsersData.filter(
        financeUser => financeUser.id !== financeUserToDelete.id
      );
      setFinanceUsersData(updatedFinanceUsers);
      setFilteredData(updatedFinanceUsers);

      setNotification({
        type: 'success',
        title: 'Usuario de finanzas eliminado',
        message: `El usuario de finanzas ${financeUserToDelete.name} ha sido eliminado exitosamente.`
      });
    } catch (error) {
      console.error("Error eliminando usuario de finanzas:", error);

      setNotification({
        type: 'error',
        title: 'Error al eliminar usuario de finanzas',
        message: error instanceof Error
          ? error.message
          : 'Ha ocurrido un error al intentar eliminar el usuario de finanzas.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Manager for adding a new financeUser
  const handleAddFinanceUser = async (formData: any) => {
    const userData = {
      name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      userType: "FINANCES",
    };

    try {
      await createUser(userData);
      handleCloseAddModal();

      setNotification({
        type: 'success',
        title: 'Usuario de finanzas creado!',
        message: `El usuario de finanzas ${userData.name} ${userData.last_name} ha sido creado exitosamente.`
      });

      // Actualizar lista con mapeo correcto
      const financeUsers = await getFinanceUsers();
      const mappedFinanceUsers = financeUsers.map((user) => {
        const { firstName, lastName } = parseFullName(user.name || '', user.last_name || '');
        const fullName = combineNames(firstName, lastName);

        return {
          id: user.id,
          email: user.email,
          name: fullName,
          firstName: firstName,
          lastName: lastName,
        };
      }) as FinanceUser[];
      setFinanceUsersData(mappedFinanceUsers);
      setFilteredData(mappedFinanceUsers);

    } catch (error) {
      console.error("Error creando usuario de finanzas:", error);

      setNotification({
        type: 'error',
        title: 'Error al crear usuario de finanzas',
        message: error instanceof Error
          ? error.message
          : 'Ha ocurrido un error al intentar crear el usuario de finanzas.'
      });
    }
  };

  // Manager for searching financeUsers
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredData(financeUsersData);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = financeUsersData.filter(
      (financeUser) =>
        financeUser.name.toLowerCase().includes(lowerCaseSearch) ||
        financeUser.email.toLowerCase().includes(lowerCaseSearch)
    );

    setFilteredData(filtered);
  };

  // Configuration for financeUser details display
  const entityDisplayConfig = {
    fields: ["name", "email"] as (keyof FinanceUser)[],
    labels: {
      name: "Nombre",
      email: "Correo",
    },
    avatar: {
      field: "name" as keyof FinanceUser,
      fallback: (financeUser: FinanceUser) => financeUser.name.split(" ")[0].charAt(0),
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
    caption: "Usuarios de finanzas asignados",
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
    searchPlaceholder: "Buscar usuario de finanzas",
    addButtonLabel: "Agregar usuario de finanzas",
    showFilterButton: false
  };

  const addFormConfig = {
    isOpen: showAddModal,
    onClose: handleCloseAddModal,
    onSubmit: handleAddFinanceUser,
    fields: financeUserFormFields,
    title: "Agregar Nuevo Usuario de finanzas",
    description: "Completa el formulario para agregar un nuevo usuario de finanzas.",
    submitButtonText: "Agregar Usuario de finanzas",
    cancelButtonText: "Cancelar",
  };

  // Actualizar editFormConfig para usar los valores correctos
  const editFormConfig = {
    isOpen: showEditModal,
    onClose: handleCancelEdit,
    onSubmit: handleEditFinanceUser,
    fields: financeUserEditFormFields,
    title: "Editar Usuario de finanzas",
    description: "Modifica la información del usuario de finanzas.",
    submitButtonText: "Guardar Cambios",
    cancelButtonText: "Cancelar",
    isLoading: isEditing,
    defaultValues: financeUserToEdit ? {
      firstName: financeUserToEdit.firstName || '',
      lastName: financeUserToEdit.lastName || '',
      email: financeUserToEdit.email || '',
    } : undefined
  };

  return (
    <>
      <ConfirmationDialog
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Eliminar usuario de finanzas"
        description={`¿Estás seguro de que deseas eliminar a ${financeUserToDelete?.name}? Esta acción no se puede deshacer.`}
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
        entityType="Usuarios de finanzas"
        // Components
        SearchBarComponent={SearchFilterBar}
        TableComponent={DataTable}
        FormComponent={EntityForm}
        // Props for componentes
        searchBarProps={searchBarConfig}
        tableProps={tableConfig}
        formProps={addFormConfig}
        // State and handlers for modals
        selectedEntity={selectedFinanceUser}
        showDetailsModal={showDetailsModal}
        onCloseDetailsModal={handleCloseDetailsModal}
        pageTitle="Tus Usuarios de finanzas"
        pageDescription="Gestiona la información de los usuario de finanzas a tu cargo"
        detailsModalTitle="Detalles del Usuario de finanzas"
        detailsModalDescription="Información detallada del usuario de finanzas seleccionado"
        // Configuration for the details modal
        entityDisplayConfig={entityDisplayConfig}
        notification={notification}
        onCloseNotification={handleCloseNotification}
      />
    </>
  );
}