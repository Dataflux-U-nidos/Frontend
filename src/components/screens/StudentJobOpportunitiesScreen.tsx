import React, { useState, useEffect } from 'react';
import { useGetAllJobOpportunities } from '@/hooks/jobOpportunity/useGetAllJobOpportunitiesHook';
import { useFilterJobOpportunities } from '@/hooks/jobOpportunity/useFilterJobOpportunitiesHook';
import { JobOpportunity, JobOpportunityFilters } from '@/types/jobOpportunityType';
import { SearchFilterBar } from '@/components/molecules/SearchFilterBar';
import { JobOpportunityGrid } from '@/components/molecules/JobOpportunityGrid';
import { JobOpportunityDetailsModal } from '@/components/molecules/JobOpportunityDetailsModal';
import { JobOpportunityFilterModal } from '@/components/molecules/JobOpportunityFilterModal';
import { Notification, NotificationData } from '@/components/molecules/Notification';
import { Briefcase } from 'lucide-react';

// Datos quemados para desarrollo y pruebas
const mockJobOpportunities: JobOpportunity[] = [
  {
    _id: "1",
    name: "Desarrollador de Software Senior",
    description: "Buscamos un desarrollador experimentado para liderar proyectos de software. El candidato ideal tiene experiencia en arquitectura de software, desarrollo de APIs RESTful, y dominio de tecnologías como React, Node.js y bases de datos NoSQL.",
    jobId: "abcdef012345678961234567",
    salary: 80000000
  },
  {
    _id: "2",
    name: "Ingeniero DevOps",
    description: "Responsable de implementar y mantener infraestructura cloud, automatizar procesos de CI/CD, y optimizar el rendimiento de aplicaciones. Se requiere experiencia con Docker, Kubernetes, AWS/Azure y herramientas de monitoreo.",
    jobId: "abcdef012345678961234568",
    salary: 75000000
  },
  {
    _id: "3",
    name: "Científico de Datos",
    description: "Analizar grandes volúmenes de datos para extraer insights de negocio. Implementar modelos predictivos y algoritmos de machine learning. Conocimientos de Python, R, SQL y visualización de datos son esenciales.",
    jobId: "abcdef012345678961234569",
    salary: 85000000
  },
  {
    _id: "4",
    name: "UX/UI Designer",
    description: "Diseñar interfaces intuitivas y atractivas para aplicaciones web y móviles. Realizar investigación de usuarios, crear wireframes, prototipos y diseños finales. Dominio de Figma, Adobe XD y principios de usabilidad.",
    jobId: "abcdef012345678961234570",
    salary: 65000000
  },
  {
    _id: "5",
    name: "Product Manager",
    description: "Liderar el desarrollo de productos digitales desde la concepción hasta el lanzamiento. Definir roadmaps, priorizar features y coordinar equipos multidisciplinarios. Experiencia en metodologías ágiles y análisis de mercado.",
    jobId: "abcdef012345678961234571",
    salary: 90000000
  },
  {
    _id: "6",
    name: "Especialista en Ciberseguridad",
    description: "Proteger sistemas e infraestructura contra amenazas digitales. Implementar políticas de seguridad, realizar pruebas de penetración y responder a incidentes. Certificaciones en seguridad informática y conocimientos de ethical hacking.",
    jobId: "abcdef012345678961234572",
    salary: 88000000
  },
  {
    _id: "7",
    name: "Arquitecto de Software",
    description: "Diseñar la estructura y los componentes de sistemas de software complejos. Definir estándares técnicos, evaluar tecnologías y asegurar la escalabilidad. Amplia experiencia en patrones de diseño y arquitecturas distribuidas.",
    jobId: "abcdef012345678961234573",
    salary: 95000000
  },
  {
    _id: "8",
    name: "Ingeniero de Machine Learning",
    description: "Desarrollar e implementar modelos de machine learning y deep learning. Optimizar algoritmos, procesar grandes volúmenes de datos y crear pipelines de ML. Conocimientos avanzados de TensorFlow, PyTorch y procesamiento de datos.",
    jobId: "abcdef012345678961234574",
    salary: 92000000
  },
  {
    _id: "9",
    name: "Analista de Business Intelligence",
    description: "Transformar datos en insights accionables para la toma de decisiones. Crear dashboards, reportes y análisis de tendencias. Dominio de herramientas como Tableau, Power BI y técnicas de ETL.",
    jobId: "abcdef012345678961234575",
    salary: 70000000
  }
];

export default function StudentJobOpportunitiesScreen() {
  // Estados
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedJobOpportunity, setSelectedJobOpportunity] = useState<JobOpportunity | null>(null);
  const [notification, setNotification] = useState<NotificationData | null>(null);
  const [filters, setFilters] = useState<JobOpportunityFilters>({});
  
  // Estado para datos locales (quemados)
  const [isUsingMockData, setIsUsingMockData] = useState(true);
  const [localData, setLocalData] = useState<JobOpportunity[]>(mockJobOpportunities);

  // Obtener datos del backend (comentado para usar datos quemados por ahora)
  const { data: jobOpportunities, isLoading: isBackendLoading, isError, error } = useGetAllJobOpportunities();
  
  // Decidir qué datos usar
  const dataToUse = isUsingMockData ? localData : (jobOpportunities || []);
  const isLoading = isUsingMockData ? false : isBackendLoading;
  
  // Usar el hook de filtrado
  const { filteredJobOpportunities, updateFilters } = useFilterJobOpportunities(
    dataToUse, 
    {}
  );

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

  // Manejador para ver detalles de una salida laboral
  const handleSelectJobOpportunity = (jobOpportunity: JobOpportunity) => {
    setSelectedJobOpportunity(jobOpportunity);
    setShowDetailsModal(true);
  };

  // Manejador para cerrar el modal de detalles
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedJobOpportunity(null);
  };

  // Manejador para el filtro
  const handleFilter = () => {
    setShowFilterModal(true);
  };

  // Manejador para aplicar filtros
  const handleApplyFilters = (newFilters: JobOpportunityFilters) => {
    setFilters(newFilters);
    
    // Si estamos usando datos locales, filtramos directamente aquí
    if (isUsingMockData) {
      const filtered = mockJobOpportunities.filter(job => {
        // Filtro por nombre
        if (newFilters.name && !job.name.toLowerCase().includes(newFilters.name.toLowerCase())) {
          return false;
        }
        
        // Filtro por salario mínimo
        if (newFilters.salaryMin !== undefined && job.salary < newFilters.salaryMin) {
          return false;
        }
        
        // Filtro por salario máximo
        if (newFilters.salaryMax !== undefined && job.salary > newFilters.salaryMax) {
          return false;
        }
        
        return true;
      });
      
      setLocalData(filtered);
    } else {
      // Si estamos usando el backend, usamos el hook de filtrado
      updateFilters(newFilters);
    }
    
    setShowFilterModal(false);
  };

  // Manejador para la búsqueda por nombre
  const handleSearch = (searchTerm: string) => {
    // Actualizar filtros con el término de búsqueda
    const newFilters = { ...filters, name: searchTerm };
    
    // Si estamos usando datos locales, filtramos directamente
    if (isUsingMockData) {
      if (!searchTerm.trim()) {
        setLocalData(mockJobOpportunities);
      } else {
        const filtered = mockJobOpportunities.filter(job => 
          job.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setLocalData(filtered);
      }
    } else {
      // Si estamos usando el backend, aplicamos los filtros
      handleApplyFilters(newFilters);
    }
  };

  // Botón para alternar entre datos de prueba y backend
  const toggleDataSource = () => {
    setIsUsingMockData(!isUsingMockData);
    
    // Resetear filtros y datos cuando cambiamos la fuente
    setFilters({});
    if (!isUsingMockData) { // Cambiando a datos de prueba
      setLocalData(mockJobOpportunities);
    }
    
    // Mostrar notificación
    setNotification({
      type: 'success',
      title: `Usando ${!isUsingMockData ? 'datos de prueba' : 'datos del backend'}`,
      message: `Ahora estás visualizando ${!isUsingMockData ? 'datos de prueba locales' : 'datos desde el servidor'}`
    });
  };

  // Manejar errores de la API
  useEffect(() => {
    if (!isUsingMockData && isError && error) {
      setNotification({
        type: 'error',
        title: 'Error al cargar salidas laborales',
        message: error instanceof Error ? error.message : 'Ocurrió un error al obtener las salidas laborales'
      });
      
      // Volver a datos de prueba si hay error
      setIsUsingMockData(true);
      setLocalData(mockJobOpportunities);
    }
  }, [isError, error, isUsingMockData]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Notificación */}
      {notification && (
        <Notification
          notification={notification}
          onClose={handleCloseNotification}
        />
      )}

      {/* Modal de filtros */}
      <JobOpportunityFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
      
      {/* Modal de detalles */}
      <JobOpportunityDetailsModal
        isOpen={showDetailsModal}
        onClose={handleCloseDetailsModal}
        jobOpportunity={selectedJobOpportunity}
      />

      {/* Encabezado y descripción */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Briefcase className="h-6 w-6 text-orange-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Salidas Laborales</h1>
        </div>
        <p className="text-gray-600">
          Explora diferentes oportunidades laborales relacionadas con tu campo de estudio.
        </p>
      </div>

      {/* Botón para alternar fuente de datos (solo para desarrollo) */}
      <button
        onClick={toggleDataSource}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300"
      >
        Usando: {isUsingMockData ? 'Datos locales (prueba)' : 'API Backend'}
      </button>

      {/* Barra de búsqueda y filtros */}
      <div className="mb-6">
        <SearchFilterBar
          onSearch={handleSearch}
          onFilter={handleFilter}
          searchPlaceholder="Buscar salidas laborales"
          showAddButton={false}
          showFilterButton={true}
        />
      </div>

      {/* Grid de salidas laborales */}
      <JobOpportunityGrid
        jobOpportunities={isUsingMockData ? localData : filteredJobOpportunities}
        onSelectJobOpportunity={handleSelectJobOpportunity}
        isLoading={isLoading}
      />
    </div>
  );
}