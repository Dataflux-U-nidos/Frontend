import React, { useEffect, useState } from "react";
import { useGetAllJobOpportunities } from "@/hooks"; 
import { JobOpportunity } from "@/types/jobOpportunityType"; 
import { DataTable } from "@/components/organisms/DataTable"; 
import { ConfirmationDialog } from "@/components/molecules/ConfirmationDialog";
import { EntityForm, FormField } from "../molecules/EntityForm";
import { Notification, NotificationData } from "../molecules/Notification"; 
import { Button } from "@/components/atoms/ui/button"; // Asumiendo que tienes un componente Button

interface Action<T> {
  label: string;
  onClick: (entity: T) => void;
  variant?: "default" | "danger" | "secondary" | "outline";
  icon?: React.ReactNode;
}

export default function AdminManageJobOpScreen() {
  // State for confirmation dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  // State for edit dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<JobOpportunity | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState<string | null>(null); 
  // Notification state
  const [notification, setNotification] = useState<NotificationData | null>(null);
  // State for add dialog
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const jobFormFields: FormField[] = [
    {
      name: "name",
      label: "Título del Trabajo",
      type: "text",
      required: true,
      placeholder: "Ingrese el título del trabajo",
      validation: {
        minLength: {
          value: 3,
          message: "El título debe tener al menos 3 caracteres",
        },
        maxLength: {
          value: 100,
          message: "El título no puede exceder los 100 caracteres",
        },
      },
    },
    {
      name: "description",
      label: "Descripción",
      type: "textarea",
      required: true,
      placeholder: "Ingrese la descripción detallada del trabajo",
      helpText: "Describe las responsabilidades y requisitos del puesto",
      validation: {
        minLength: {
          value: 10,
          message: "La descripción debe tener al menos 10 caracteres",
        },
      },
    },
    {
      name: "salary",
      label: "Salario ($)",
      type: "number",
      required: true,
      placeholder: "Ingrese el salario",
      validation: {
        min: {
          value: 0,
          message: "El salario no puede ser negativo",
        },
      },
    },
  ];

  const {
    data: jobOpportunities = [], 
    isLoading,
    isError,
    error, 
  } = useGetAllJobOpportunities();

  const maxDescriptionLength = 100;

  const getTruncatedDescription = (desc: string) =>
    desc.length > maxDescriptionLength
      ? desc.slice(0, maxDescriptionLength) + "..."
      : desc;

  const formattedData = jobOpportunities.map((job) => ({
    ...job,
    displayDescription: getTruncatedDescription(job.description),
  }));

  const displayColumns = ["name", "displayDescription", "salary"];

  const columnHeaders = {
    name: "Oportunidad laboral",
    displayDescription: "Descripción",
    salary: "Salario ($)",
  };

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
    
  const handleDeleteClick = (id: any) => {
    setJobToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleEditClick = (job: any) => {
    setJobToEdit(job);
    setEditError(null);
    setIsEditDialogOpen(true);
  };

  const handleAddClick = () => {
    setAddError(null);
    setIsAddDialogOpen(true);
  };

  const handleSaveEdit = (editedJobData: any) => {
    setIsEditing(true);
    setEditError(null);

    setTimeout(() => {
      try {
        setNotification({
          type: 'success',
          title: 'Salida laboral actualizada',
          message: `${editedJobData.name} ha sido actualizada correctamente.`
        });

        setIsEditing(false);
        setIsEditDialogOpen(false);
        setJobToEdit(null);
      } catch (error) {
        setIsEditing(false);
        setEditError("Error al guardar los cambios. Inténtelo de nuevo.");
        
        setNotification({
          type: 'error',
          title: 'Error al actualizar',
          message: 'No se pudo actualizar la salida laboral. Inténtelo de nuevo.'
        });
        
        console.error("Error saving job:", error);
      }
    }, 1000);
  };

  const handleSaveAdd = (newJobData: any) => {
    setIsAdding(true);
    setAddError(null);

    setTimeout(() => {
      try {
        // Simulamos que se guarda en la BD
        // En un caso real, aquí harías una llamada a la API

        setNotification({
          type: 'success',
          title: 'Salida laboral creada',
          message: `${newJobData.name} ha sido creada correctamente.`
        });

        setIsAdding(false);
        setIsAddDialogOpen(false);
      } catch (error) {
        setIsAdding(false);
        setAddError("Error al crear la salida laboral. Inténtelo de nuevo.");
        
        setNotification({
          type: 'error',
          title: 'Error al crear',
          message: 'No se pudo crear la salida laboral. Inténtelo de nuevo.'
        });
        
        console.error("Error adding job:", error);
      }
    }, 1000);
  };

  const confirmDelete = () => {
    if (jobToDelete) {
      setIsDeleting(true);
      
      // Get job name for notification message
      const jobName = jobOpportunities.find(job => (job._id || job.id) === jobToDelete)?.name || 'Salida laboral';
      
      // Simulate API call
      setTimeout(() => {
        try {
          // Show success notification
          setNotification({
            type: 'success',
            title: 'Salida laboral eliminada',
            message: `${jobName} ha sido eliminada correctamente.`
          });
          
          setIsDeleting(false);
          setIsDeleteDialogOpen(false);
          setJobToDelete(null);
        } catch (error) {
          // Show error notification
          setNotification({
            type: 'error',
            title: 'Error al eliminar',
            message: 'No se pudo eliminar la salida laboral. Inténtelo de nuevo.'
          });
          
          setIsDeleting(false);
          setIsDeleteDialogOpen(false);
          setJobToDelete(null);
          console.error("Error deleting job:", error);
        }
      }, 1000);
    }
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setJobToDelete(null);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setJobToEdit(null);
    setEditError(null);
  };

  const closeAddDialog = () => {
    setIsAddDialogOpen(false);
    setAddError(null);
  };

  // Define actions for edit and delete
  const actions: Action<JobOpportunity>[] = [
    {
      label: "Editar",
      onClick: (job: JobOpportunity) => handleEditClick(job),
      variant: "default",
    },
    {
      label: "Eliminar",
      onClick: (job: JobOpportunity) => handleDeleteClick(job._id || job.id),
      variant: "danger",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Modificar salidas laborales</h1>
        
        {/* Botón Agregar */}
        <Button 
          onClick={handleAddClick} 
          variant="default" 
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Agregar Salida Laboral
        </Button>
      </div>

      {/* Error State */}
      {isError && (
        <div className="text-red-500 mb-4">
          Error: {error?.message || "Failed to load job opportunities"}
        </div>
      )}

      {/* DataTable with loading state passed */}
      <DataTable<JobOpportunity>
        data={formattedData}
        caption="Lista de todas las salidas laborales"
        rowsPerPage={5}
        displayColumns={displayColumns}
        columnHeaders={columnHeaders}
        actions={actions}
        isLoading={isLoading}
        className="bg-white"
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        title="¿Estás seguro?"
        description="Esta acción eliminará permanentemente la salida laboral. Esta acción no se puede deshacer."
        confirmButtonText="Eliminar"
        cancelButtonText="Cancelar"
        variant="danger"
        isLoading={isDeleting}
      />

      {/* Edit Dialog */}
      <EntityForm
        isOpen={isEditDialogOpen}
        onClose={closeEditDialog}
        onSubmit={handleSaveEdit}
        fields={jobFormFields}
        error={editError}
        title="Editar Salida Laboral"
        description="Modifica los detalles de la salida laboral"
        submitButtonText="Guardar Cambios"
        cancelButtonText="Cancelar"
        isLoading={isEditing}
        defaultValues={jobToEdit || undefined}
      />

      {/* Add Dialog */}
      <EntityForm
        isOpen={isAddDialogOpen}
        onClose={closeAddDialog}
        onSubmit={handleSaveAdd}
        fields={jobFormFields}
        error={addError}
        title="Agregar Salida Laboral"
        description="Ingrese los detalles de la nueva salida laboral"
        submitButtonText="Crear Salida Laboral"
        cancelButtonText="Cancelar"
        isLoading={isAdding}
      />

      {/* Notification Component */}
      {notification && (
        <Notification 
          notification={notification} 
          onClose={handleCloseNotification} 
        />
      )}
    </div>
  );
}