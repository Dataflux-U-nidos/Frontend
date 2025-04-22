import React, { useState, useCallback } from "react";
import { ListPageTemplate } from "@/components/templates/ListPageTemplate";
import { SearchFilterBar } from "@/components/molecules/SearchFilterBar";
import { DataTable } from "@/components/organisms/DataTable";
import { EntityForm, FormField } from "@/components/molecules/EntityFrorm";

// Definimos la interfaz Student con todos los campos
interface Student {
  email: string;
  name: string;
  age: number;
  school: string;
  location: string;
}

// Datos de ejemplo para los estudiantes del tutor
const initialStudentsData: Student[] = [
  { email: "juana_perez@gmail.com", name: "Juanita Perez", age: 20, school: "Colegio Naval Santa Fé", location: "Chapinero"},
  { email: "juana_perez@gmail.com", name: "Juanita Perez", age: 20, school: "Colegio Naval Santa Fé", location: "Chapinero"},
  { email: "juana_perez@gmail.com", name: "Juanita Perez", age: 20, school: "Colegio Naval Santa Fé", location: "Chapinero"},
  { email: "juana_perez@gmail.com", name: "Juanita Perez", age: 20, school: "Colegio Naval Santa Fé", location: "Chapinero"},
  { email: "juana_perez@gmail.com", name: "Juanita Perez", age: 20, school: "Colegio Naval Santa Fé", location: "Chapinero"},
  { email: "juana_perez@gmail.com", name: "Juanita Perez", age: 20, school: "Colegio Naval Santa Fé", location: "Chapinero"},
  { email: "maria_gomez@gmail.com", name: "María Gómez", age: 17, school: "Colegio Los Andes", location: "Usaquén"},
  { email: "pedro_lopez@gmail.com", name: "Pedro López", age: 17, school: "Colegio Nueva Esperanza", location: "Suba"},
  { email: "ana_martinez@gmail.com", name: "Ana Martínez", age: 16, school: "Colegio Mayor de San Bartolomé", location: "La Candelaria"},
  { email: "carlos_rodriguez@gmail.com", name: "Carlos Rodríguez", age: 18, school: "Colegio San Carlos", location: "Usaquén"},
  { email: "valentina_gonzalez@gmail.com", name: "Valentina González", age: 15, school: "Gimnasio Campestre", location: "Suba"},
  { email: "santiago_hernandez@gmail.com", name: "Santiago Hernández", age: 16, school: "Colegio Nueva Granada", location: "Chapinero"}
];

// Campos del formulario para agregar un estudiante
const studentFormFields: FormField[] = [
  {
    name: "firstName",
    label: "Nombre",
    type: "text",
    required: true
  },
  {
    name: "lastName",
    label: "Apellido",
    type: "text",
    required: true
  },
  {
    name: "email",
    label: "Correo Electrónico",
    type: "email",
    required: true
  },
  {
    name: "tutorEmail",
    label: "Correo Electrónico del Tutor",
    type: "email",
    required: true
  },
  {
    name: "birthDate",
    label: "Fecha de Nacimiento",
    type: "date",
    required: true
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    required: true
  }
];

export default function TutorStudentsScreen() {
  // Estado para los estudiantes
  const [studentsData, setStudentsData] = useState<Student[]>(initialStudentsData);
  
  // Estado para búsqueda
  const [filteredData, setFilteredData] = useState<Student[]>(initialStudentsData);
  
  // Estado para rastrear si el modal de detalles está abierto
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Estado para el formulario de agregar estudiante
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Estado para almacenar el estudiante seleccionado
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Manejador para mostrar detalles del estudiante
  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  // Manejador para cerrar el modal de detalles
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedStudent(null);
  };
  
  // Manejador para abrir el modal de agregar estudiante
  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };
  
  // Manejador para cerrar el modal de agregar estudiante
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };
  
  // Manejador para agregar un nuevo estudiante
  const handleAddStudent = (formData: any) => {
    // Calcular la edad basada en la fecha de nacimiento
    const birthDate = new Date(formData.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    // Crear nuevo estudiante
    const newStudent: Student = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      age: age,
      school: "Por asignar", // Valores por defecto
      location: "Por asignar"
    };
    
    // Actualizar la lista de estudiantes
    const updatedStudents = [...studentsData, newStudent];
    setStudentsData(updatedStudents);
    setFilteredData(updatedStudents);
    
    // Cerrar el modal
    handleCloseAddModal();
    
    // Aquí podrías agregar código para enviar los datos a tu API
    console.log("Nuevo estudiante agregado:", newStudent);
  };
  
  // Manejador de búsqueda
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredData(studentsData);
      return;
    }
    
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = studentsData.filter(student => 
      student.name.toLowerCase().includes(lowerCaseSearch) ||
      student.email.toLowerCase().includes(lowerCaseSearch) ||
      student.school.toLowerCase().includes(lowerCaseSearch) ||
      student.location.toLowerCase().includes(lowerCaseSearch)
    );
    
    setFilteredData(filtered);
  };
  
  // Renderizar los detalles del estudiante para el modal
  const renderStudentDetails = useCallback((student: Student) => (
    <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
      <div className="flex items-center mb-4">
        <div className="bg-orange-500 text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold">
          {student.name.split(' ')[0].charAt(0)}
        </div>
        <div className="ml-4">
          <h3 className="font-bold text-lg">{student.name}</h3>
          <p className="text-gray-600">{student.email}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500">Edad:</p>
          <p className="font-medium">{student.age} años</p>
        </div>
        <div>
          <p className="text-gray-500">Colegio:</p>
          <p className="font-medium">{student.school}</p>
        </div>
        <div>
          <p className="text-gray-500">Localidad:</p>
          <p className="font-medium">{student.location}</p>
        </div>
      </div>
    </div>
  ), []);
  
  // Configuración de la tabla
  const tableConfig = {
    caption: "Estudiantes asignados",
    rowsPerPage: 6,
    onViewDetails: handleViewDetails,
    displayColumns: ["email", "name", "age", "school"],
    columnHeaders: {
      email: "Correo",
      name: "Nombre",
      age: "Edad",
      school: "Colegio"
    },
    actionButtonText: "Ver detalles"
  };
  
  // Configuración de la barra de búsqueda
  const searchBarConfig = {
    onSearch: handleSearch,
    onAddEntity: handleOpenAddModal,
    searchPlaceholder: "Buscar estudiante",
    addButtonLabel: "Agregar estudiante",
    showFilterButton: true
  };
  
  // Configuración del formulario
  const formConfig = {
    isOpen: showAddModal,
    onClose: handleCloseAddModal,
    onSubmit: handleAddStudent,
    fields: studentFormFields,
    title: "Agregar Nuevo Estudiante",
    description: "Completa el formulario para agregar un nuevo estudiante.",
    submitButtonText: "Agregar Estudiante",
    cancelButtonText: "Cancelar"
  };
  
  return (
    <ListPageTemplate
      // Datos y tipo de entidad
      data={filteredData}
      entityType="Estudiantes"
      
      // Componentes
      SearchBarComponent={SearchFilterBar}
      TableComponent={DataTable}
      FormComponent={EntityForm}
      
      // Props para los componentes
      searchBarProps={searchBarConfig}
      tableProps={tableConfig}
      formProps={formConfig}
      
      // Estado y manejadores para el modal de detalles
      selectedEntity={selectedStudent}
      showDetailsModal={showDetailsModal}
      onCloseDetailsModal={handleCloseDetailsModal}
      
      // Textos personalizables
      pageTitle="Tus Estudiantes"
      pageDescription="Gestiona la información de los estudiantes a tu cargo"
      detailsModalTitle="Detalles del Estudiante"
      detailsModalDescription="Información detallada del estudiante seleccionado"
      
      // Render personalizado
      renderEntityDetails={renderStudentDetails}
    />
  );
}