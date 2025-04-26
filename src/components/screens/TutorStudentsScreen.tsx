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

// Form fields for editing a student (sin contraseña)
const studentEditFormFields: FormField[] = [
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
    name: "school",
    label: "Colegio",
    type: "text",
    required: false,
  },
  {
    name: "location",
    label: "Localidad",
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
  const handleConfirmDelete = async () => {
    if (!studentToDelete || !studentToDelete.id) return;
    
    setIsDeleting(true);
    
    try {
      await deleteUser(studentToDelete.id);
      
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

    console.log("Enviando:", userData);
    
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
    defaultValues: studentToEdit && {
      firstName: studentToEdit.firstName ?? studentToEdit.name.split(' ')[0] ?? '',
      lastName: studentToEdit.lastName ?? studentToEdit.name.split(' ').slice(1).join(' ') ?? '',
      email: studentToEdit.email,
      age: studentToEdit.age,
      school: studentToEdit.school !== 'No disponible' ? studentToEdit.school : '',
      location: studentToEdit.location !== 'No disponible' ? studentToEdit.location : ''
    }
  };


  return (
    <>
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
      
      <EntityForm {...addFormConfig} />     
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