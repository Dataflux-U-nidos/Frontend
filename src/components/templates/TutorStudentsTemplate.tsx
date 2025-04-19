import React, { useState } from "react";
import { SearchBar } from "../molecules/SearchBar";
import { AdaptiveTable } from "../organisms/AdaptiveTable";
import { AddStudentForm } from "../molecules/AddStudentForm"; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../atoms/ui/dialog";

// defining Student interface
interface Student {
  email: string;
  name: string;
  age: number;
  school: string;
  location: string;
  phone?: string;
  parentName?: string;
  grade?: string;
  address?: string;
  parentPhone?: string;
}

type TutorStudentsTemplateProps = {
  studentsData: Student[];
  onViewDetails?: (student: Student) => void;
  selectedStudent: Student | null;
  showDetailsModal: boolean;
  onCloseModal: () => void;
  onAddStudent?: (studentData: any) => void; 
};

export const TutorStudentsTemplate: React.FC<TutorStudentsTemplateProps> = ({ 
  studentsData,
  onViewDetails,
  selectedStudent,
  showDetailsModal,
  onCloseModal,
  onAddStudent
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); 

  // manager for opening the details modal
  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  // manager for closing the details modal
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  // manager for adding a new student
  const handleSubmitForm = (formData: any) => {
    if (onAddStudent) {
      onAddStudent(formData);
    }
    handleCloseAddModal();
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar for mobile (colapsable) */}
      <div className={`fixed inset-0 z-20 transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setSidebarOpen(false)}></div>
      </div>
      
      {/* ´rincial content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* nav bar */}
        <div className="md:hidden bg-white border-b p-4 flex items-center">
          <button
            className="text-gray-600 focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
          <h1 className="ml-4 text-xl font-semibold">Unidos</h1>
        </div>

        {/* Principal content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Tus Estudiantes</h1>
            <p className="text-sm md:text-base text-gray-600">Gestiona la información de los estudiantes a tu cargo</p>
          </div>
          
          <SearchBar onAddStudent={handleOpenAddModal} />
          <AdaptiveTable 
            data={studentsData} 
            caption="Estudiantes asignados"
            rowsPerPage={6}
            onViewDetails={onViewDetails}
          />
        </div>
      </div>

      {/* Modal for student details */}
      {showDetailsModal && selectedStudent && (
        <Dialog open={showDetailsModal} onOpenChange={onCloseModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800">
                Detalles del Estudiante
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Información detallada del estudiante seleccionado.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-500 text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold">
                    {selectedStudent.name.split(' ')[0].charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-lg">{selectedStudent.name}</h3>
                    <p className="text-gray-600">{selectedStudent.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500">Edad:</p>
                    <p className="font-medium">{selectedStudent.age} años</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Colegio:</p>
                    <p className="font-medium">{selectedStudent.school}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Localidad:</p>
                    <p className="font-medium">{selectedStudent.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md px-4 py-2 text-sm transition-colors"
                  onClick={onCloseModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* modal for adding a new student */}
      <AddStudentForm 
        isOpen={showAddModal}
        onClose={handleCloseAddModal}
        onSubmit={handleSubmitForm}
      />
    </div>
  );
};