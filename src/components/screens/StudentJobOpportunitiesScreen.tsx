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
    salary: 80000000
  },
  {
    _id: "2",
    name: "Ingeniero DevOps",
    description: "Responsable de implementar y mantener infraestructura cloud, automatizar procesos de CI/CD, y optimizar el rendimiento de aplicaciones. Se requiere experiencia con Docker, Kubernetes, AWS/Azure y herramientas de monitoreo.",
    salary: 75000000
  },
  {
    _id: "3",
    name: "Científico de Datos",
    description: "Analizar grandes volúmenes de datos para extraer insights de negocio. Implementar modelos predictivos y algoritmos de machine learning. Conocimientos de Python, R, SQL y visualización de datos son esenciales.",
    salary: 85000000
  },
  {
    _id: "4",
    name: "UX/UI Designer",
    description: "Diseñar interfaces intuitivas y atractivas para aplicaciones web y móviles. Realizar investigación de usuarios, crear wireframes, prototipos y diseños finales. Dominio de Figma, Adobe XD y principios de usabilidad.",
    salary: 65000000
  },
  {
    _id: "5",
    name: "Product Manager",
    description: "Liderar el desarrollo de productos digitales desde la concepción hasta el lanzamiento. Definir roadmaps, priorizar features y coordinar equipos multidisciplinarios. Experiencia en metodologías ágiles y análisis de mercado.",
    salary: 90000000
  },
  {
    _id: "6",
    name: "Especialista en Ciberseguridad",
    description: "Proteger sistemas e infraestructura contra amenazas digitales. Implementar políticas de seguridad, realizar pruebas de penetración y responder a incidentes. Certificaciones en seguridad informática y conocimientos de ethical hacking.",
    salary: 88000000
  },
  {
    _id: "7",
    name: "Arquitecto de Software",
    description: "Diseñar la estructura y los componentes de sistemas de software complejos. Definir estándares técnicos, evaluar tecnologías y asegurar la escalabilidad. Amplia experiencia en patrones de diseño y arquitecturas distribuidas.",
    salary: 95000000
  },
  {
    _id: "8",
    name: "Ingeniero de Machine Learning",
    description: "Desarrollar e implementar modelos de machine learning y deep learning. Optimizar algoritmos, procesar grandes volúmenes de datos y crear pipelines de ML. Conocimientos avanzados de TensorFlow, PyTorch y procesamiento de datos.",
    salary: 92000000
  },
  {
    _id: "9",
    name: "Analista de Business Intelligence",
    description: "Transformar datos en insights accionables para la toma de decisiones. Crear dashboards, reportes y análisis de tendencias. Dominio de herramientas como Tableau, Power BI y técnicas de ETL.",
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
  
  // Estado para datos locales (quemados) - empezamos con datos de prueba por defecto
  const [isUsingMockData, setIsUsingMockData] = useState(true);
  const [filteredMockData, setFilteredMockData] = useState<JobOpportunity[]>(mockJobOpportunities);
  
  // Obtener datos del backend - deshabilitado por defecto para evitar errores 404
  const { 
    data: jobOpportunities, 
    isLoading: isBackendLoading, 
    isError, 
    error, 
    refetch 
  } = useGetAllJobOpportunities();

  // Usar el hook de filtrado SOLO para datos del backend
  const { filteredJobOpportunities, updateFilters } = useFilterJobOpportunities(
    jobOpportunities || [], 
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

  // Manejar errores de la API sin crear bucles infinitos
  useEffect(() => {
    if (!isUsingMockData && isError && error) {
      console.log('Error detectado desde el backend:', error);
      
      // Solo mostrar notificación si no estamos ya usando datos de prueba
      setNotification({
        type: 'error',
        title: 'Error al cargar salidas laborales',
        message: 'No se pudo conectar con el servidor. Usando datos de prueba.'
      });
      
      // Cambiar a datos de prueba automáticamente
      setIsUsingMockData(true);
      setFilteredMockData(mockJobOpportunities);
    }
  }, [isError, error, isUsingMockData]); // Dependencias específicas para evitar bucles

  // Mostrar notificación de éxito al cargar datos del backend exitosamente
  useEffect(() => {
    if (!isUsingMockData && !isBackendLoading && !isError && jobOpportunities && jobOpportunities.length > 0) {
      setNotification({
        type: 'success',
        title: 'Datos cargados exitosamente',
        message: `Se cargaron ${jobOpportunities.length} salidas laborales desde el servidor`
      });
    }
  }, [jobOpportunities, isBackendLoading, isError, isUsingMockData]);

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

  // Función para filtrar datos locales
  const filterMockData = (data: JobOpportunity[], newFilters: JobOpportunityFilters): JobOpportunity[] => {
    return data.filter(job => {
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
  };

  // Manejador para aplicar filtros
  const handleApplyFilters = (newFilters: JobOpportunityFilters) => {
    setFilters(newFilters);
    
    if (isUsingMockData) {
      // Para datos locales, filtramos directamente
      const filtered = filterMockData(mockJobOpportunities, newFilters);
      setFilteredMockData(filtered);
    } else {
      // Para datos del backend, usamos el hook de filtrado
      updateFilters(newFilters);
    }
    
    setShowFilterModal(false);
  };

  // Manejador para la búsqueda por nombre
  const handleSearch = (searchTerm: string) => {
    const newFilters = { ...filters, name: searchTerm };
    
    if (isUsingMockData) {
      if (!searchTerm.trim()) {
        setFilteredMockData(mockJobOpportunities);
        setFilters({});
      } else {
        const filtered = filterMockData(mockJobOpportunities, newFilters);
        setFilteredMockData(filtered);
        setFilters(newFilters);
      }
    } else {
      handleApplyFilters(newFilters);
    }
  };

  // Botón para alternar entre datos de prueba y backend
  const toggleDataSource = async () => {
    const newIsUsingMockData = !isUsingMockData;
    
    if (newIsUsingMockData) {
      // Cambiando a datos de prueba
      setIsUsingMockData(true);
      setFilteredMockData(mockJobOpportunities);
      setFilters({});
      
      setNotification({
        type: 'success',
        title: 'Usando datos de prueba',
        message: 'Ahora estás visualizando datos de prueba locales'
      });
    } else {
      // Cambiando a backend - intentar cargar datos
      setIsUsingMockData(false);
      setFilters({});
      
      try {
        setNotification({
          type: 'success',
          title: 'Conectando con el servidor',
          message: 'Intentando cargar datos desde el backend...'
        });
        
        // Si ya tenemos datos del backend, no necesitamos refetch
        if (!jobOpportunities) {
          await refetch();
        }
      } catch (err) {
        console.error('Error al intentar conectar con el backend:', err);
        // El useEffect de arriba manejará el error y volverá a datos de prueba
      }
    }
  };

  // Determinar qué datos mostrar y si está cargando
  const jobOpportunitiesToShow = isUsingMockData ? filteredMockData : filteredJobOpportunities;
  const isLoading = isUsingMockData ? false : isBackendLoading;

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

      {/* Panel de control de fuente de datos */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDataSource}
              disabled={isLoading}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 ${
                isUsingMockData 
                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              {isLoading ? '🔄 Conectando...' : (isUsingMockData ? '🧪 Datos de prueba' : '🌐 API Backend')}
            </button>
            
            {!isUsingMockData && (
              <button
                onClick={() => refetch()}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md text-sm hover:bg-blue-200 disabled:opacity-50"
              >
                {isLoading ? '🔄 Cargando...' : '🔄 Refrescar'}
              </button>
            )}
          </div>
          
          {/* Indicador de estado */}
          <div className="text-sm text-gray-600">
            {isUsingMockData ? (
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                {filteredMockData.length} oportunidades (locales)
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-400' : isError ? 'bg-red-400' : 'bg-green-400'}`}></div>
                {isLoading ? 'Cargando...' : isError ? 'Error de conexión' : `${jobOpportunitiesToShow.length} oportunidades (servidor)`}
              </span>
            )}
          </div>
        </div>

        {/* Información adicional */}
        {!isUsingMockData && isError && (
          <div className="mt-2 text-sm text-red-600">
            ⚠️ No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose en la URL correcta.
          </div>
        )}
      </div>

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
        jobOpportunities={jobOpportunitiesToShow}
        onSelectJobOpportunity={handleSelectJobOpportunity}
        isLoading={isLoading}
      />

      {/* Mensaje cuando no hay resultados */}
      {!isLoading && jobOpportunitiesToShow.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No se encontraron salidas laborales
          </h3>
          <p className="text-gray-500 mb-4">
            {Object.keys(filters).some(key => filters[key as keyof JobOpportunityFilters] !== undefined && filters[key as keyof JobOpportunityFilters] !== '')
              ? 'Intenta ajustar tus filtros de búsqueda'
              : 'No hay salidas laborales disponibles en este momento'
            }
          </p>
          {Object.keys(filters).some(key => filters[key as keyof JobOpportunityFilters] !== undefined && filters[key as keyof JobOpportunityFilters] !== '') && (
            <button
              onClick={() => {
                setFilters({});
                if (isUsingMockData) {
                  setFilteredMockData(mockJobOpportunities);
                } else {
                  updateFilters({});
                }
              }}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
}