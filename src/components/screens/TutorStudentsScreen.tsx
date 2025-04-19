import React, { useState } from "react";
import { TutorStudentsTemplate } from "../templates/TutorStudentsTemplate";

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
  { email: "maria_gomez@gmail.com", name: "María Gómez", age: 17, school: "Colegio Los Andes", location: "Usaquén",},
  { email: "pedro_lopez@gmail.com", name: "Pedro López", age: 17, school: "Colegio Nueva Esperanza", location: "Suba"},
  { email: "ana_martinez@gmail.com", name: "Ana Martínez", age: 16, school: "Colegio Mayor de San Bartolomé", location: "La Candelaria"},
  { email: "carlos_rodriguez@gmail.com", name: "Carlos Rodríguez", age: 18, school: "Colegio San Carlos", location: "Usaquén"},
  { email: "valentina_gonzalez@gmail.com", name: "Valentina González", age: 15, school: "Gimnasio Campestre", location: "Suba"},
  { email: "santiago_hernandez@gmail.com", name: "Santiago Hernández", age: 16, school: "Colegio Nueva Granada", location: "Chapinero"}
];

export default function TutorStudentsScreen() {
  // Estado para los estudiantes
  const [studentsData, setStudentsData] = useState<Student[]>(initialStudentsData);
  
  // Estado para rastrear si el modal de detalles está abierto
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Estado para almacenar el estudiante seleccionado
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Manejador para mostrar detalles del estudiante
  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  // Manejador para cerrar el modal
  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedStudent(null);
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
    setStudentsData([...studentsData, newStudent]);
    
    // Aquí podrías agregar código para enviar los datos a tu API
    console.log("Nuevo estudiante agregado:", newStudent);
  };
  
  return (
    <TutorStudentsTemplate 
      studentsData={studentsData}
      onViewDetails={handleViewDetails}
      selectedStudent={selectedStudent}
      showDetailsModal={showDetailsModal}
      onCloseModal={handleCloseModal}
      onAddStudent={handleAddStudent}
    />
  );
}