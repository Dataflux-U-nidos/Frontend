import React, { useState, useEffect } from 'react';
import { ListPageTemplate } from "@/components/templates/ListPageTemplate";
import { SearchFilterBar } from "@/components/molecules/SearchFilterBar";
import { DataTable } from "@/components/organisms/DataTable";
import { EntityDetailsModal } from "@/components/organisms/EntityDetailsModal";
import { FilterModal, FilterField } from "@/components/molecules/FilterModal";
import { Major, MajorFilters } from '@/types/majorType';
import { useAuthContext } from "@/context/AuthContext";

// Datos quemados para la demostración
const mockMajors: Major[] = [
  {
    _id: "6817986a4019fde74c6ba876",
    name: "Comunicación Social",
    institutionId: "6802d607d02ebfa0f85c4237",
    difficulty: "EASY",
    price: 3500,
    description: "Carrera enfocada en comunicación masiva y medios digitales. Desarrolla habilidades en periodismo, publicidad y relaciones públicas.",
    pensumLink: "https://example.com/pensum-comunicacion",
    jobId: "60f7d2a4c25e4b001c8f9d9e",
    focus: "Publicidad",
    createdAt: "2025-05-04T16:40:10.355Z",
    updatedAt: "2025-05-04T16:40:10.355Z"
  },
  {
    _id: "6817986a4019fde74c6ba877",
    name: "Ingeniería de Software",
    institutionId: "6802d607d02ebfa0f85c4237",
    difficulty: "HARD",
    price: 5200,
    description: "Forma profesionales en el desarrollo y mantenimiento de soluciones software. Incluye programación, arquitectura, diseño y gestión de proyectos.",
    pensumLink: "https://example.com/pensum-software",
    jobId: "60f7d2a4c25e4b001c8f9d9f",
    focus: "Desarrollo Web",
    createdAt: "2025-05-03T14:22:30.145Z",
    updatedAt: "2025-05-03T14:22:30.145Z"
  },
  {
    _id: "6817986a4019fde74c6ba878",
    name: "Administración de Empresas",
    institutionId: "6802d607d02ebfa0f85c4238",
    difficulty: "MEDIUM",
    price: 4300,
    description: "Prepara líderes empresariales con conocimientos en gestión financiera, recursos humanos, marketing y estrategia corporativa.",
    pensumLink: "https://example.com/pensum-administracion",
    jobId: "60f7d2a4c25e4b001c8f9da0",
    focus: "Gestión Empresarial",
    createdAt: "2025-05-02T11:15:45.789Z",
    updatedAt: "2025-05-02T11:15:45.789Z"
  },
  {
    _id: "6817986a4019fde74c6ba879",
    name: "Medicina",
    institutionId: "6802d607d02ebfa0f85c4239",
    difficulty: "HARD",
    price: 8500,
    description: "Formación integral de médicos con énfasis en atención primaria, prevención de enfermedades y práctica clínica avanzada.",
    pensumLink: "https://example.com/pensum-medicina",
    jobId: "60f7d2a4c25e4b001c8f9da1",
    focus: "Medicina General",
    createdAt: "2025-05-01T09:30:20.456Z",
    updatedAt: "2025-05-01T09:30:20.456Z"
  },
  {
    _id: "6817986a4019fde74c6ba880",
    name: "Psicología",
    institutionId: "6802d607d02ebfa0f85c4240",
    difficulty: "MEDIUM",
    price: 3900,
    description: "Estudio del comportamiento humano, desarrollo cognitivo y procesos mentales. Incluye evaluación, diagnóstico y tratamiento.",
    pensumLink: "https://example.com/pensum-psicologia",
    jobId: "60f7d2a4c25e4b001c8f9da2",
    focus: "Psicología Clínica",
    createdAt: "2025-04-30T16:45:10.123Z",
    updatedAt: "2025-04-30T16:45:10.123Z"
  }
];

// Tipo para notificaciones
interface Notification {
  type: 'success' | 'error';
  title: string;
  message: string;
}

export default function StudentMajorsScreen() {
  const { user } = useAuthContext();
  
  // Estados
  const [majorsData, setMajorsData] = useState<Major[]>(mockMajors);
  const [filteredData, setFilteredData] = useState<Major[]>(mockMajors);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});

  // Manejador para cerrar notificaciones
  const handleCloseNotification = () => {
    setNotification(null);
  };

  // Auto-cerrar notificaciones después de 5 segundos
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Manejador para ver detalles de una carrera
  const handleViewDetails = (major: Major) => {
    setSelectedMajor(major);
    setShowDetailsModal(true);
  };

  // Manejador para cerrar el modal de detalles
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedMajor(null);
  };

  // Manejador para el filtro
  const handleFilter = () => {
    setShowFilterModal(true);
  };

  // Manejador para aplicar filtros
  const handleApplyFilters = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    
    let filtered = [...majorsData];
    
    // Filtrar por nombre (desde la barra de búsqueda)
    if (newFilters.name) {
      filtered = filtered.filter(major => 
        major.name.toLowerCase().includes(newFilters.name.toLowerCase())
      );
    }
    
    // Filtrar por dificultad
    if (newFilters.difficulty) {
      filtered = filtered.filter(major => major.difficulty === newFilters.difficulty);
    }
    
    // Filtrar por precio mínimo
    if (newFilters.priceMin !== undefined) {
      filtered = filtered.filter(major => major.price >= newFilters.priceMin);
    }
    
    // Filtrar por precio máximo
    if (newFilters.priceMax !== undefined) {
      filtered = filtered.filter(major => major.price <= newFilters.priceMax);
    }
    
    // Filtrar por enfoque
    if (newFilters.focus) {
      filtered = filtered.filter(major => 
        major.focus.toLowerCase().includes(newFilters.focus.toLowerCase())
      );
    }
    
    setFilteredData(filtered);
    setShowFilterModal(false);
  };

  // Manejador para la búsqueda por nombre
  const handleSearch = (searchTerm: string) => {
    // Actualizar filtros con el término de búsqueda
    const newFilters = { ...filters, name: searchTerm };
    handleApplyFilters(newFilters);
  };

  // Renderizador personalizado para detalles de la carrera
  const renderMajorDetails = (major: Major) => (
    <div className="space-y-4">
      {/* Descripción */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Descripción</h3>
        <p className="text-gray-700">{major.description}</p>
      </div>
      
      {/* Enlace al plan de estudios */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Plan de Estudios</h3>
        <a 
          href={major.pensumLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-orange-500 hover:text-orange-700 inline-flex items-center"
        >
          Ver plan de estudios
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </a>
      </div>
    </div>
  );

  // Configuración para la visualización de detalles de la carrera
  const entityDisplayConfig = {
    fields: ["name", "difficulty", "price", "focus", "description"] as (keyof Major)[],
    labels: {
      name: "Nombre de la carrera",
      difficulty: "Dificultad",
      price: "Precio",
      focus: "Enfoque",
      description: "Descripción",
    },
    formatters: {
      price: (value: number) => `$${value.toLocaleString()} USD`,
      difficulty: (value: string) => {
        switch (value) {
          case "EASY": return "Fácil";
          case "MEDIUM": return "Media";
          case "HARD": return "Difícil";
          default: return value;
        }
      }
    },
    avatar: {
      field: "name" as keyof Major,
      fallback: (major: Major) => major.name.substring(0, 2).toUpperCase(),
      bgColor: "bg-blue-500",
      textColor: "text-white",
    },
  };

  // Configuración de la tabla
  const tableConfig = {
    caption: "Carreras Universitarias",
    rowsPerPage: 6,
    onViewDetails: handleViewDetails,
    displayColumns: ["name", "difficulty", "price", "focus"],
    columnHeaders: {
      name: "Carrera",
      difficulty: "Dificultad",
      price: "Precio",
      focus: "Enfoque",
    },
    actionButtonText: "Ver detalles",
    // Formateo personalizado para la visualización en la tabla
    formatters: {
      price: (value: number) => `$${value.toLocaleString()} USD`,
      difficulty: (value: string) => {
        switch (value) {
          case "EASY": return "Fácil";
          case "MEDIUM": return "Media";
          case "HARD": return "Difícil";
          default: return value;
        }
      }
    }
  };

  // Configuración de la barra de búsqueda
  const searchBarConfig = {
    onSearch: handleSearch,
    onFilter: handleFilter,
    searchPlaceholder: "Buscar carrera",
    showAddButton: false,
    showFilterButton: true,
  };

  // Campos para el filtro de carreras
  const filterFields: FilterField[] = [
    {
      id: 'difficulty',
      label: 'Dificultad',
      type: 'select',
      options: [
        { value: 'EASY', label: 'Fácil' },
        { value: 'MEDIUM', label: 'Media' },
        { value: 'HARD', label: 'Difícil' }
      ]
    },
    {
      id: 'priceMin',
      label: 'Precio Mínimo',
      type: 'number',
      min: 0,
      placeholder: 'Ej: 3000'
    },
    {
      id: 'priceMax',
      label: 'Precio Máximo',
      type: 'number',
      min: 0,
      placeholder: 'Ej: 10000'
    },
    {
      id: 'focus',
      label: 'Enfoque',
      type: 'text',
      placeholder: 'Ej: Publicidad, Marketing, etc.'
    }
  ];

  return (
    <>
      {/* Modal de filtros */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
        filterFields={filterFields}
        title="Filtrar Carreras"
        description="Selecciona los criterios para filtrar las carreras universitarias"
      />
      
      {/* Plantilla principal de lista */}
      <ListPageTemplate
        data={filteredData}
        entityType="Carreras Universitarias"
        SearchBarComponent={SearchFilterBar}
        TableComponent={DataTable}
        FormComponent={() => null} // No necesitamos formulario aquí
        searchBarProps={searchBarConfig}
        tableProps={tableConfig}
        formProps={{}}
        selectedEntity={selectedMajor}
        showDetailsModal={showDetailsModal}
        onCloseDetailsModal={handleCloseDetailsModal}
        pageTitle="Carreras Universitarias"
        pageDescription="Explora las diferentes opciones académicas disponibles para tu formación profesional"
        detailsModalTitle="Detalles de la Carrera"
        detailsModalDescription="Información detallada sobre la carrera seleccionada"
        renderEntityDetails={renderMajorDetails}
        entityDisplayConfig={entityDisplayConfig}
        notification={notification}
        onCloseNotification={handleCloseNotification}
      />
    </>
  );
}