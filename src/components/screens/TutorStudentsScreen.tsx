import React, { useState, useCallback, useEffect } from "react";
import { ListPageTemplate } from "@/components/templates/ListPageTemplate";
import { SearchFilterBar } from "@/components/molecules/SearchFilterBar";
import { DataTable } from "@/components/organisms/DataTable";
import { EntityForm, FormField } from "@/components/molecules/EntityForm";
import {
  useCreateUser,
  useGetStudentsByTutor,
  useUpdateUser,
  useDeleteUser,
} from "@/hooks";
import { useAuthContext } from "@/context/AuthContext";

interface Student {
  email: string;
  name: string;
  age: number;
  school: string;
  location: string;
}

// Interfaz para la notificación
interface Notification {
  type: 'success' | 'error';
  title: string;
  message: string;
}

// Form fields for adding a new student
const studentFormFields: FormField[] = [
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
    name: "age",
    label: "Edad",
    type: "number",
    required: true,
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    required: true,
  },
];

export default function TutorStudentsScreen() {
  // Get the current user from the context
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: getStudents } = useGetStudentsByTutor();

  // State to manage students data
  const [studentsData, setStudentsData] = useState<Student[]>([]);

  // State to manage filtered data
  const [filteredData, setFilteredData] = useState<Student[]>([]);

  // State to manage the modal for viewing student details
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // State to manage the modal for adding a new student
  const [showAddModal, setShowAddModal] = useState(false);

  // State to manage the selected student for details
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Estado para manejar notificaciones
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await getStudents();
        const mappedStudents = students.map((user) => ({
          ...user,
          location: "Unknown",
        })) as Student[];
        setStudentsData(mappedStudents);
        setFilteredData(mappedStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [getStudents]);

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

    console.log("Enviando:", userData);
    
    try {
      await createUser(userData);
      
      // Cerrar el modal de añadir estudiante
      handleCloseAddModal();
      
      // Mostrar notificación de éxito
      setNotification({
        type: 'success',
        title: '¡Estudiante creado!',
        message: `El estudiante ${userData.name} ${userData.last_name} ha sido creado exitosamente.`
      });
      
      // Actualizar la lista de estudiantes
      const students = await getStudents();
      const mappedStudents = students.map((user) => ({
        ...user,
        location: "Unknown",
      })) as Student[];
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
  };

  const searchBarConfig = {
    onSearch: handleSearch,
    onAddEntity: handleOpenAddModal,
    searchPlaceholder: "Buscar estudiante",
    addButtonLabel: "Agregar estudiante",
    showFilterButton: false // Quitamos el botón de filtro
  };

  const formConfig = {
    isOpen: showAddModal,
    onClose: handleCloseAddModal,
    onSubmit: handleAddStudent,
    fields: studentFormFields,
    title: "Agregar Nuevo Estudiante",
    description: "Completa el formulario para agregar un nuevo estudiante.",
    submitButtonText: "Agregar Estudiante",
    cancelButtonText: "Cancelar",
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
        formProps={formConfig}
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
      />
    </>
  );
}