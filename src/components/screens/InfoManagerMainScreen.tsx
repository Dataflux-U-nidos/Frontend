import { useState, useEffect } from "react";
import { ListPageTemplate } from "@/components/templates/ListPageTemplate";
import { SearchFilterBar } from "@/components/molecules/SearchFilterBar";
import { DataTable } from "@/components/organisms/DataTable";
import { EntityForm, FormField } from "@/components/molecules/EntityForm";
import { ConfirmationDialog } from "@/components/molecules/ConfirmationDialog";
import { FilterModal, FilterField } from "@/components/molecules/FilterModal";
import { useCreateMajor, useGetMajorsByInstitution, useUpdateMajor, useDeleteMajor } from "@/hooks";
import { useAuthContext } from "@/context/AuthContext";

interface Major {
  _id?: string;
  id?: string;
  name: string;
  institutionId: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  price: number;
  description: string;
  pensumLink: string;
  jobOpportunityIds?: string[];
  focus: string;
  preferences?: string[];
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Notification {
  type: 'success' | 'error';
  title: string;
  message: string;
}

// Form fields for adding a new major (incluye institutionId y preferences)
const majorFormFields: FormField[] = [
  {
    name: "name",
    label: "Nombre de la Carrera",
    type: "text",
    required: true,
    validation: {
      maxLength: {
        value: 100,
        message: "El nombre no puede exceder 100 caracteres"
      }
    }
  },
  {
    name: "institutionId",
    label: "ID de la Institución",
    type: "text",
    required: true,
    placeholder: "Ej: 6830abcd1234e56789f01236",
    helpText: "ID de la institución educativa"
  },
  {
    name: "difficulty",
    label: "Dificultad",
    type: "select",
    required: true,
    options: [
      { value: "EASY", label: "Fácil" },
      { value: "MEDIUM", label: "Media" },
      { value: "HARD", label: "Difícil" }
    ]
  },
  {
    name: "price",
    label: "Precio",
    type: "number",
    required: true,
    validation: {
      min: {
        value: 0,
        message: "El precio debe ser un número positivo"
      }
    },
    placeholder: "Ej: 9000"
  },
  {
    name: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
    validation: {
      maxLength: {
        value: 500,
        message: "La descripción no puede exceder 500 caracteres"
      }
    }
  },
  {
    name: "pensumLink",
    label: "Enlace del Pensum",
    type: "text",
    required: true,
    validation: {
      pattern: {
        value: /^https?:\/\/.+/,
        message: "Debe ser una URL válida (http:// o https://)"
      }
    },
    placeholder: "https://example.com/pensum.pdf"
  },
  {
    name: "focus",
    label: "Enfoque",
    type: "text",
    required: true,
    validation: {
      maxLength: {
        value: 100,
        message: "El enfoque no puede exceder 100 caracteres"
      }
    },
    placeholder: "Ej: Ciencias Sociales"
  },
  {
    name: "preferences",
    label: "Preferencias",
    type: "select",
    required: false,
    options: [
      { value: "le", label: "Lenguas" },
      { value: "ma", label: "Matemáticas" },
      { value: "ci", label: "Ciencias Naturales" },
      { value: "cc", label: "Competencias Ciudadanas" },
      { value: "idi", label: "Idiomas" },
      { value: "ar", label: "Artes" }
    ],
    helpText: "Selecciona una preferencia académica"
  }
];

// Form fields para editar (sin institutionId ni preferences)
const majorEditFormFields: FormField[] = [
  {
    name: "name",
    label: "Nombre de la Carrera",
    type: "text",
    required: true,
    validation: {
      maxLength: {
        value: 100,
        message: "El nombre no puede exceder 100 caracteres"
      }
    }
  },
  {
    name: "difficulty",
    label: "Dificultad",
    type: "select",
    required: true,
    options: [
      { value: "EASY", label: "Fácil" },
      { value: "MEDIUM", label: "Media" },
      { value: "HARD", label: "Difícil" }
    ]
  },
  {
    name: "price",
    label: "Precio",
    type: "number",
    required: true,
    validation: {
      min: {
        value: 0,
        message: "El precio debe ser un número positivo"
      }
    },
    placeholder: "Ej: 9000"
  },
  {
    name: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
    validation: {
      maxLength: {
        value: 500,
        message: "La descripción no puede exceder 500 caracteres"
      }
    }
  },
  {
    name: "pensumLink",
    label: "Enlace del Pensum",
    type: "text",
    required: true,
    validation: {
      pattern: {
        value: /^https?:\/\/.+/,
        message: "Debe ser una URL válida (http:// o https://)"
      }
    },
    placeholder: "https://example.com/pensum.pdf"
  },
  {
    name: "focus",
    label: "Enfoque",
    type: "text",
    required: true,
    validation: {
      maxLength: {
        value: 100,
        message: "El enfoque no puede exceder 100 caracteres"
      }
    },
    placeholder: "Ej: Ciencias Sociales"
  }
];

// Filter fields for major filtering
const majorFilterFields: FilterField[] = [
  {
    id: "name",
    label: "Nombre de la Carrera",
    type: "text",
    placeholder: "Buscar por nombre..."
  },
  {
    id: "difficulty",
    label: "Dificultad",
    type: "select",
    options: [
      { value: "EASY", label: "Fácil" },
      { value: "MEDIUM", label: "Media" },
      { value: "HARD", label: "Difícil" }
    ]
  },
  {
    id: "priceMin",
    label: "Precio Mínimo",
    type: "number",
    placeholder: "0"
  },
  {
    id: "priceMax",
    label: "Precio Máximo", 
    type: "number",
    placeholder: "100000"
  },
  {
    id: "focus",
    label: "Enfoque",
    type: "text",
    placeholder: "Buscar por enfoque..."
  }
];

export default function InfoManagerMajorsScreen() {
  // Get current user context
  const { user } = useAuthContext();
  
  // Validar que el usuario tenga universityId antes de hacer la consulta
  const universityId = user?.universityId || "";
  
  // Hooks for CRUD operations - usando useGetMajorsByInstitution para filtrar por universidad
  const { mutateAsync: createMajor } = useCreateMajor();
  const { data: majorsData = [], refetch, isLoading } = useGetMajorsByInstitution(universityId);
  const { mutateAsync: updateMajor } = useUpdateMajor();
  const { mutateAsync: deleteMajor } = useDeleteMajor();

  // State management
  const [filteredData, setFilteredData] = useState<Major[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  // Loading states
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Selected entities
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [majorToDelete, setMajorToDelete] = useState<Major | null>(null);
  const [majorToEdit, setMajorToEdit] = useState<Major | null>(null);

  // Filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilters, setCurrentFilters] = useState<Record<string, any>>({});

  // Notifications
  const [notification, setNotification] = useState<Notification | null>(null);

  // Initialize filtered data when majors change
  useEffect(() => {
    setFilteredData(majorsData || []);
  }, [majorsData]);

  // Apply filters and search
  useEffect(() => {
    let filtered = majorsData || [];

    // Apply search term
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(major =>
        major.name.toLowerCase().includes(lowerCaseSearch) ||
        major.description.toLowerCase().includes(lowerCaseSearch) ||
        major.focus.toLowerCase().includes(lowerCaseSearch)
      );
    }

    // Apply filters
    if (currentFilters.name) {
      filtered = filtered.filter(major =>
        major.name.toLowerCase().includes(currentFilters.name.toLowerCase())
      );
    }

    if (currentFilters.difficulty) {
      filtered = filtered.filter(major => major.difficulty === currentFilters.difficulty);
    }

    if (currentFilters.priceMin !== undefined) {
      filtered = filtered.filter(major => major.price >= currentFilters.priceMin);
    }

    if (currentFilters.priceMax !== undefined) {
      filtered = filtered.filter(major => major.price <= currentFilters.priceMax);
    }

    if (currentFilters.focus) {
      filtered = filtered.filter(major =>
        major.focus.toLowerCase().includes(currentFilters.focus.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [majorsData, searchTerm, currentFilters]);

  // Notification management
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

  // View details handler
  const handleViewDetails = (major: Major) => {
    setSelectedMajor(major);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedMajor(null);
  };

  // Add major handlers
  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleAddMajor = async (formData: any) => {
    setIsCreating(true);
    
    try {
      // Procesar preferences - ahora viene como un valor único del select
      const preferences = formData.preferences ? [formData.preferences] : undefined;

      // Usar el universityId del usuario como institutionId, fallback a formData si no existe
      const institutionId = user?.universityId || formData.institutionId;
      
      if (!institutionId) {
        throw new Error('No se pudo determinar la institución. Por favor, contacta al administrador.');
      }

      await createMajor({
        name: formData.name,
        institutionId,
        difficulty: formData.difficulty,
        price: Number(formData.price),
        description: formData.description,
        pensumLink: formData.pensumLink,
        focus: formData.focus,
        ...(preferences && { preferences })
      });

      handleCloseAddModal();
      refetch();

      setNotification({
        type: 'success',
        title: '¡Carrera creada!',
        message: `La carrera ${formData.name} ha sido creada exitosamente.`
      });
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Error al crear carrera',
        message: error instanceof Error 
          ? error.message 
          : 'Ha ocurrido un error al intentar crear la carrera.'
      });
    } finally {
      setIsCreating(false);
    }
  };

  // Edit major handlers
  const handleInitiateEdit = (major: Major) => {
    setMajorToEdit(major);
    setShowEditModal(true);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setMajorToEdit(null);
  };

  const handleEditMajor = async (formData: any) => {
    if (!majorToEdit) {
      setNotification({
        type: 'error',
        title: 'Error',
        message: 'No se ha seleccionado ninguna carrera para editar.'
      });
      return;
    }
    
    if (!majorToEdit._id && !majorToEdit.id) {
      setNotification({
        type: 'error',
        title: 'Error',
        message: 'La carrera seleccionada no tiene un ID válido.'
      });
      return;
    }
    
    const majorId = majorToEdit._id || majorToEdit.id || "";
    
    setIsEditing(true);
    
    try {
      const updates = {
        name: formData.name,
        difficulty: formData.difficulty,
        price: Number(formData.price),
        description: formData.description,
        pensumLink: formData.pensumLink,
        focus: formData.focus
      };
      
      await updateMajor({
        id: majorId,
        updates
      });

      setShowEditModal(false);
      setMajorToEdit(null);
      refetch();

      setNotification({
        type: 'success',
        title: 'Carrera actualizada',
        message: `La carrera ${formData.name} ha sido actualizada exitosamente.`
      });
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Error al actualizar carrera',
        message: error instanceof Error 
          ? error.message 
          : 'Ha ocurrido un error al intentar actualizar la carrera.'
      });
    } finally {
      setIsEditing(false);
    }
  };

  // Delete major handlers
  const handleInitiateDelete = (major: Major) => {
    setMajorToDelete(major);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setMajorToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!majorToDelete) {
      setNotification({
        type: 'error',
        title: 'Error',
        message: 'No se ha seleccionado ninguna carrera para eliminar.'
      });
      return;
    }
    
    if (!majorToDelete._id && !majorToDelete.id) {
      setNotification({
        type: 'error',
        title: 'Error',
        message: 'La carrera seleccionada no tiene un ID válido.'
      });
      return;
    }
    
    const majorId = majorToDelete._id || majorToDelete.id || "";
    
    setIsDeleting(true);
    
    try {
      await deleteMajor(majorId);

      setShowDeleteModal(false);
      setMajorToDelete(null);
      refetch();

      setNotification({
        type: 'success',
        title: 'Carrera eliminada',
        message: `La carrera ${majorToDelete.name} ha sido eliminada exitosamente.`
      });
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Error al eliminar carrera',
        message: error instanceof Error 
          ? error.message 
          : 'Ha ocurrido un error al intentar eliminar la carrera.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Search handler
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  // Filter handlers
  const handleOpenFilterModal = () => {
    setShowFilterModal(true);
  };

  const handleCloseFilterModal = () => {
    setShowFilterModal(false);
  };

  const handleApplyFilters = (filters: Record<string, any>) => {
    setCurrentFilters(filters);
    setShowFilterModal(false);
  };

  // Helper functions
  const getDifficultyDisplay = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY': return 'Fácil';
      case 'MEDIUM': return 'Media';
      case 'HARD': return 'Difícil';
      default: return difficulty;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Entity display configuration for details modal
  const entityDisplayConfig = {
    fields: ["name", "difficulty", "price", "focus", "description"] as (keyof Major)[],
    labels: {
      name: "Nombre",
      difficulty: "Dificultad",
      price: "Precio",
      focus: "Enfoque",
      description: "Descripción",
      pensumLink: "Enlace del Pensum"
    },
    formatters: {
      price: formatPrice,
      difficulty: getDifficultyDisplay,
    },
    avatar: {
      field: "name" as keyof Major,
      fallback: (major: Major) => major.name.charAt(0).toUpperCase(),
      bgColor: "bg-blue-500",
      textColor: "text-white",
    },
  };

  // Table actions configuration
  const tableActions = [
    {
      label: "Editar",
      onClick: handleInitiateEdit,
      variant: "outline" as const,
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      label: "Eliminar",
      onClick: handleInitiateDelete,
      variant: "danger" as const,
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      )
    }
  ];

  // Component configurations
  const tableConfig = {
    caption: "Carreras universitarias",
    rowsPerPage: 6,
    onViewDetails: handleViewDetails,
    displayColumns: ["name", "difficulty", "price", "focus"],
    columnHeaders: {
      name: "Nombre",
      difficulty: "Dificultad", 
      price: "Precio",
      focus: "Enfoque",
    },
    actionButtonText: "Ver detalles",
    actions: tableActions,
    isLoading: isLoading
  };

  const searchBarConfig = {
    onSearch: handleSearch,
    onAddEntity: handleOpenAddModal,
    onFilter: handleOpenFilterModal,
    searchPlaceholder: "Buscar carrera...",
    addButtonLabel: "Agregar carrera",
    showFilterButton: true
  };

  // Si el usuario tiene universityId, usar campos sin institutionId para crear
  const getCreateFormFields = () => {
    if (user?.universityId) {
      // Si tiene universityId, no mostrar el campo institutionId
      return majorFormFields.filter(field => field.name !== 'institutionId');
    }
    return majorFormFields;
  };

  const addFormConfig = {
    isOpen: showAddModal,
    onClose: handleCloseAddModal,
    onSubmit: handleAddMajor,
    fields: getCreateFormFields(),
    title: "Agregar Nueva Carrera",
    description: "Completa el formulario para agregar una nueva carrera universitaria.",
    submitButtonText: "Agregar Carrera",
    cancelButtonText: "Cancelar",
    isLoading: isCreating
  };

  const editFormConfig = {
    isOpen: showEditModal,
    onClose: handleCancelEdit,
    onSubmit: handleEditMajor,
    fields: majorEditFormFields,
    title: "Editar Carrera",
    description: "Modifica la información de la carrera universitaria.",
    submitButtonText: "Guardar Cambios",
    cancelButtonText: "Cancelar",
    isLoading: isEditing,
    defaultValues: majorToEdit ? {
      name: majorToEdit.name,
      difficulty: majorToEdit.difficulty,
      price: majorToEdit.price,
      description: majorToEdit.description,
      pensumLink: majorToEdit.pensumLink,
      focus: majorToEdit.focus
    } : undefined
  };

  // Custom notification component
  const CustomNotification = () => {
    if (!notification) return null;

    const isSuccess = notification.type === 'success';
    
    return (
      <div className="fixed top-4 right-4 z-50 w-80 shadow-lg rounded-md overflow-hidden">
        <div className={`p-4 ${isSuccess ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex justify-between items-start">
            <div className="flex">
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
              
              <div>
                <h3 className={`text-lg font-medium ${isSuccess ? 'text-green-800' : 'text-red-800'}`}>
                  {notification.title}
                </h3>
                <div className={`mt-1 text-sm ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
                  {notification.message}
                </div>
              </div>
            </div>
            
            <button
              onClick={handleCloseNotification}
              className={`ml-4 inline-flex text-gray-400 hover:${isSuccess ? 'text-green-600' : 'text-red-600'} focus:outline-none`}
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
            <div 
              className={`h-1 rounded-full ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}
              style={{
                width: '100%',
                animation: 'progress-bar 5s linear forwards'
              }}
            />
          </div>
          
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
      {/* Custom notification */}
      <CustomNotification />
      
      {/* Delete confirmation dialog */}
      <ConfirmationDialog
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Eliminar carrera"
        description={`¿Estás seguro de que deseas eliminar la carrera "${majorToDelete?.name}"? Esta acción no se puede deshacer.`}
        confirmButtonText="Eliminar"
        cancelButtonText="Cancelar"
        variant="danger"
        isLoading={isDeleting}
      />
      
      {/* Filter modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={handleCloseFilterModal}
        onApplyFilters={handleApplyFilters}
        currentFilters={currentFilters}
        filterFields={majorFilterFields}
        title="Filtrar Carreras"
        description="Selecciona los criterios para filtrar las carreras universitarias"
      />
      
      {/* Add major form */}
      <EntityForm {...addFormConfig} />
      
      {/* Edit major form */}
      <EntityForm {...editFormConfig} />
      
      {/* Main template */}
      <ListPageTemplate
        data={filteredData}
        entityType="Carreras"
        SearchBarComponent={SearchFilterBar}
        TableComponent={DataTable}
        FormComponent={EntityForm}
        searchBarProps={searchBarConfig}
        tableProps={tableConfig}
        formProps={addFormConfig}
        selectedEntity={selectedMajor}
        showDetailsModal={showDetailsModal}
        onCloseDetailsModal={handleCloseDetailsModal}
        pageTitle="Gestión de Carreras"
        pageDescription="Gestiona las carreras universitarias disponibles en el sistema"
        detailsModalTitle="Detalles de la Carrera"
        detailsModalDescription="Información detallada de la carrera seleccionada"
        entityDisplayConfig={entityDisplayConfig}
        notification={notification}
        onCloseNotification={handleCloseNotification}
      />
    </>
  );
}