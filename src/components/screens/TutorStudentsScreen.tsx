import  { useState, useEffect } from "react";
import { ListPageTemplate } from "@/components/templates/ListPageTemplate";
import { SearchFilterBar } from "@/components/molecules/SearchFilterBar";
import { DataTable } from "@/components/organisms/DataTable";
import { EntityForm, FormField } from "@/components/molecules/EntityForm";
import { ConfirmationDialog } from "@/components/molecules/ConfirmationDialog";
import {
  useCreateUser,
  useGetStudentsByTutor,
  useUpdateUser,
  useDeleteUser,
} from "@/hooks";

interface Student {
  id?: string;
  email: string;
  name: string;
  age: number;
  school: string;
  location: string;
  firstName?: string;
  lastName?: string;
}

interface Notification {
  type: 'success' | 'error';
  title: string;
  message: string;
}

// Form fields for adding a new student with password validation
const studentFormFields: FormField[] = [
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
    name: "age",
    label: "Edad",
    type: "number",
    required: true,
    validation: {
      max: {
        value: 17,
        message: "La edad no puede ser mayor a 18 años"
      }
    },
    placeholder: "Ingresa tu edad"
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    required: true,
    validation: {
      pattern: {
        value: /^(?=.*\d)(?=.*[!@#$%^&*_-])(?=.{8,})/, message: "La contraseña debe tener al menos 8 caracteres, un número y un caracter especial"
      }
    },
    placeholder: "Mín. 8 caracteres, 1 número y 1 caracter especial",
    helpText: "Para mayor seguridad, usa una contraseña con 8+ caracteres, un número y un caracter especial"
  },
];

// Form fields for editing a student (sin contraseña)
const studentEditFormFields: FormField[] = [
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
    name: "age",
    label: "Edad",
    type: "number",
    required: true,
    validation: {
      max: {
        value: 17,
        message: "La edad no puede ser mayor a 18 años"
      }
    },
    placeholder: "Ingresa tu edad"
  },
  {
    name: "school",
    label: "Colegio",
    type: "text",
    required: false,
  },
];

export default function TutorStudentsScreen() {
  // Hooks for CRUD
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: getStudents } = useGetStudentsByTutor();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const { mutateAsync: updateUser } = useUpdateUser();

  const [studentsData, setStudentsData] = useState<Student[]>([]);
  const [filteredData, setFilteredData] = useState<Student[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  // loads students when component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await getStudents();
        const mappedStudents = students.map((user) => {
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
            age: user.age || 0,
            school: user.school ?? 'No disponible',
            location: user.locality ?? 'No disponible'
          };
        }) as Student[];
        setStudentsData(mappedStudents);
        setFilteredData(mappedStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [getStudents]);

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

  // Manager for viewing student details
  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  // Manager for closing the details modal
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedStudent(null);
  };

  // Manager for opening the add student modal
  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  // Manager for closing the add student modal
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };
  
  // Manager for initiating edit process
  const handleInitiateEdit = (student: Student) => {
    setStudentToEdit(student);
    setShowEditModal(true);
  };
  
  // Manager for canceling edit process
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setStudentToEdit(null);
  };
  
  // Manager for confirming and executing edit
  const handleEditStudent = async (formData: any) => {
    if (!studentToEdit || !studentToEdit.id) return;
    
    setIsEditing(true);
    
    try {
      const userData = {
        id: studentToEdit.id,
        name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        age: formData.age,
        school: formData.school,
        locality: formData.location,
      };
      
      await updateUser(userData);
      
      // Cerrar el modal de edición
      setShowEditModal(false);
      setStudentToEdit(null);
      
      // Actualizar la lista de estudiantes
      const updatedStudent = {
        ...studentToEdit,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        age: formData.age,
        school: formData.school,
        location: formData.location
      };
      
      const updatedStudents = studentsData.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      );
      
      setStudentsData(updatedStudents);
      setFilteredData(updatedStudents);
      
      // Mostrar notificación de éxito
      setNotification({
        type: 'success',
        title: 'Estudiante actualizado',
        message: `El estudiante ${updatedStudent.name} ha sido actualizado exitosamente.`
      });
    } catch (error) {
      console.error("Error actualizando estudiante:", error);
      
      // Mostrar notificación de error
      setNotification({
        type: 'error',
        title: 'Error al actualizar estudiante',
        message: error instanceof Error 
          ? error.message 
          : 'Ha ocurrido un error al intentar actualizar el estudiante.'
      });
    } finally {
      setIsEditing(false);
    }
  };
  
  // Manager for initiating delete process
  const handleInitiateDelete = (student: Student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };
  
  // Manager for canceling delete process
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setStudentToDelete(null);
  };
  
  // Manager for confirming and executing delete
  // En TutorStudentsScreen.tsx
const handleConfirmDelete = async () => {
  if (!studentToDelete || !studentToDelete.id) return;
  
  setIsDeleting(true);
  
  try {
    await deleteUser(studentToDelete.id); // Asegurarse de que esta función esté usando la ruta correcta
    
    // Cerrar el modal de confirmación
    setShowDeleteModal(false);
    setStudentToDelete(null);
    
    // Actualizar la lista de estudiantes filtrando el eliminado
    const updatedStudents = studentsData.filter(
      student => student.id !== studentToDelete.id
    );
    setStudentsData(updatedStudents);
    setFilteredData(updatedStudents);
    
    // Mostrar notificación de éxito
    setNotification({
      type: 'success',
      title: 'Estudiante eliminado',
      message: `El estudiante ${studentToDelete.name} ha sido eliminado exitosamente.`
    });
  } catch (error) {
    console.error("Error eliminando estudiante:", error);
    
    // Mostrar notificación de error
    setNotification({
      type: 'error',
      title: 'Error al eliminar estudiante',
      message: error instanceof Error 
        ? error.message 
        : 'Ha ocurrido un error al intentar eliminar el estudiante.'
    });
  } finally {
    setIsDeleting(false);
  }
};

  // Manager for adding a new student
  const handleAddStudent = async (formData: any) => {
    const userData = {
      name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      age: formData.age,
      password: formData.password,
      userType: "STUDENT",
    };
    
    try {
      await createUser(userData);
      handleCloseAddModal();
      
      setNotification({
        type: 'success',
        title: '¡Estudiante creado!',
        message: `El estudiante ${userData.name} ${userData.last_name} ha sido creado exitosamente.`
      });
      
      // Actualizar la lista de estudiantes
      const students = await getStudents();
      const mappedStudents = students.map((user) => {
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
          age: user.age || 0,
          school: user.school ?? 'No disponible',
          location: user.locality ?? 'No disponible'
        };
      }) as Student[];
      setStudentsData(mappedStudents);
      setFilteredData(mappedStudents);
      
    } catch (error) {
      console.error("Error creando estudiante:", error);
      
      // Mostrar notificación de error
      setNotification({
        type: 'error',
        title: 'Error al crear estudiante',
        message: error instanceof Error 
          ? error.message 
          : 'Ha ocurrido un error al intentar crear el estudiante.'
      });
    }
  };

  // Manager for searching students
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredData(studentsData);
      return;
    }
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = studentsData.filter(
      (student) =>
        student.name.toLowerCase().includes(lowerCaseSearch) ||
        student.email.toLowerCase().includes(lowerCaseSearch) ||
        student.school?.toLowerCase().includes(lowerCaseSearch) ||
        student.location?.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredData(filtered);
  };

  // Configuration for student details display
  const entityDisplayConfig = {
    fields: ["name", "email", "age", "school", "location"] as (keyof Student)[],
    labels: {
      name: "Nombre",
      email: "Correo",
      age: "Edad",
      school: "Colegio",
      location: "Localidad",
    },
    formatters: {
      age: (value: number) => `${value} años`,
    },
    avatar: {
      field: "name" as keyof Student,
      fallback: (student: Student) => student.name.split(" ")[0].charAt(0),
      bgColor: "bg-orange-500",
      textColor: "text-white",
    },
  };

  // Definir acciones para la tabla - ahora se mostrarán después del botón "Ver detalles"
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
    caption: "Estudiantes asignados",
    rowsPerPage: 6,
    onViewDetails: handleViewDetails,
    displayColumns: ["email", "name", "age", "school"],
    columnHeaders: {
      email: "Correo",
      name: "Nombre",
      age: "Edad",
      school: "Colegio",
    },
    actionButtonText: "Ver detalles",
    actions: tableActions
  };

  const searchBarConfig = {
    onSearch: handleSearch,
    onAddEntity: handleOpenAddModal,
    searchPlaceholder: "Buscar estudiante",
    addButtonLabel: "Agregar estudiante",
    showFilterButton: false 
  };

  const addFormConfig = {
    isOpen: showAddModal,
    onClose: handleCloseAddModal,
    onSubmit: handleAddStudent,
    fields: studentFormFields,
    title: "Agregar Nuevo Estudiante",
    description: "Completa el formulario para agregar un nuevo estudiante.",
    submitButtonText: "Agregar Estudiante",
    cancelButtonText: "Cancelar",
  };
  
  // FIX: Usar undefined en lugar de null para defaultValues cuando studentToEdit es null
  const editFormConfig = {
    isOpen: showEditModal,
    onClose: handleCancelEdit,
    onSubmit: handleEditStudent,
    fields: studentEditFormFields,
    title: "Editar Estudiante",
    description: "Modifica la información del estudiante.",
    submitButtonText: "Guardar Cambios",
    cancelButtonText: "Cancelar",
    isLoading: isEditing,
    // Corregido: Usar un operador ternario para asegurar que defaultValues sea undefined en lugar de null
    defaultValues: studentToEdit ? {
      firstName: studentToEdit.firstName ?? studentToEdit.name.split(' ')[0] ?? '',
      lastName: studentToEdit.lastName ?? studentToEdit.name.split(' ').slice(1).join(' ') ?? '',
      email: studentToEdit.email,
      age: studentToEdit.age,
      school: studentToEdit.school !== 'No disponible' ? studentToEdit.school : '',
      location: studentToEdit.location !== 'No disponible' ? studentToEdit.location : ''
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
              {/* Ícono de éxito o error */}
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
              
              {/* Contenido de la notificación */}
              <div>
                <h3 className={`text-lg font-medium ${isSuccess ? 'text-green-800' : 'text-red-800'}`}>
                  {notification.title}
                </h3>
                <div className={`mt-1 text-sm ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
                  {notification.message}
                </div>
              </div>
            </div>
            
            {/* Botón para cerrar */}
            <button
              onClick={handleCloseNotification}
              className={`ml-4 inline-flex text-gray-400 hover:${isSuccess ? 'text-green-600' : 'text-red-600'} focus:outline-none`}
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Barra de progreso para indicar el tiempo restante */}
          <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
            <div 
              className={`h-1 rounded-full ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}
              style={{
                width: '100%',
                animation: 'progress-bar 5s linear forwards'
              }}
            />
          </div>
          
          {/* Estilos para la animación */}
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
      
      {/* Modal de confirmación para eliminar estudiante */}
      <ConfirmationDialog
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Eliminar estudiante"
        description={`¿Estás seguro de que deseas eliminar a ${studentToDelete?.name}? Esta acción no se puede deshacer.`}
        confirmButtonText="Eliminar"
        cancelButtonText="Cancelar"
        variant="danger"
        isLoading={isDeleting}
      />
      
      {/* Formulario para agregar estudiantes */}
      <EntityForm {...addFormConfig} />
      
      {/* Formulario para editar estudiantes */}
      <EntityForm {...editFormConfig} />
      
      <ListPageTemplate
        // Data and entity type
        data={filteredData}
        entityType="Estudiantes"
        // Components
        SearchBarComponent={SearchFilterBar}
        TableComponent={DataTable}
        FormComponent={EntityForm}
        // Props for componentes
        searchBarProps={searchBarConfig}
        tableProps={tableConfig}
        formProps={addFormConfig}
        // State and handlers for modals
        selectedEntity={selectedStudent}
        showDetailsModal={showDetailsModal}
        onCloseDetailsModal={handleCloseDetailsModal}
        pageTitle="Tus Estudiantes"
        pageDescription="Gestiona la información de los estudiantes a tu cargo"
        detailsModalTitle="Detalles del Estudiante"
        detailsModalDescription="Información detallada del estudiante seleccionado"
        // Configuration for the details modal
        entityDisplayConfig={entityDisplayConfig}
        notification={notification}
        onCloseNotification={handleCloseNotification}
      />
    </>
  );
}