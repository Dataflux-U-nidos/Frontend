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
import { get } from "http";

interface Student {
  email: string;
  name: string;
  age: number;
  school: string;
  location: string;
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

  console.log("Students data:", studentsData);

  // State to manage filtered data
  const [filteredData, setFilteredData] = useState<Student[]>([]);

  // State to manage the modal for viewing student details
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // State to manage the modal for adding a new student
  const [showAddModal, setShowAddModal] = useState(false);

  // State to manage the selected student for details
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

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
    await createUser(userData);
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
    showFilterButton: true,
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
