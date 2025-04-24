import React, { useState, useCallback } from "react";
import { ListPageTemplate } from "@/components/templates/ListPageTemplate";
import { SearchFilterBar } from "@/components/molecules/SearchFilterBar";
import { DataTable } from "@/components/organisms/DataTable";
import { EntityForm, FormField } from "@/components/molecules/EntityForm";

interface Student {
  email: string;
  name: string;
  age: number;
  school: string;
  location: string;
}

// Example data for students
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

// Form fields for adding a new student
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
  // State to manage students data
  const [studentsData, setStudentsData] = useState<Student[]>(initialStudentsData);
  
  // State to manage filtered data
  const [filteredData, setFilteredData] = useState<Student[]>(initialStudentsData);
  
  // State to manage the modal for viewing student details
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // State to manage the modal for adding a new student
  const [showAddModal, setShowAddModal] = useState(false);
  
  // State to manage the selected student for details
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

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
  const handleAddStudent = (formData: any) => {
    // Calculate age from birth date
    const birthDate = new Date(formData.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    // Create a new student object
    const newStudent: Student = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      age: age,
      school: "Por asignar", // Valores por defecto
      location: "Por asignar"
    };
    
    const updatedStudents = [...studentsData, newStudent];
    setStudentsData(updatedStudents);
    setFilteredData(updatedStudents);
    
    handleCloseAddModal();
    
    console.log("Nuevo estudiante agregado:", newStudent);
  };
  
  // Manager for searching students
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
  
  // Configuration for studdnt details display
  const entityDisplayConfig = {
    fields: ["name", "email", "age", "school", "location"] as (keyof Student)[],
    labels: {
      name: "Nombre",
      email: "Correo",
      age: "Edad",
      school: "Colegio",
      location: "Localidad"
    },
    formatters: {
      age: (value: number) => `${value} años`
    },
    avatar: {
      field: "name" as keyof Student,
      fallback: (student: Student) => student.name.split(' ')[0].charAt(0),
      bgColor: "bg-orange-500",
      textColor: "text-white"
    }
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
      school: "Colegio"
    },
    actionButtonText: "Ver detalles"
  };
  
  const searchBarConfig = {
    onSearch: handleSearch,
    onAddEntity: handleOpenAddModal,
    searchPlaceholder: "Buscar estudiante",
    addButtonLabel: "Agregar estudiante",
    showFilterButton: true
  };
  
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
  );
}