// src/components/screens/StudentUniversitiesScreen.tsx
import { useState, useEffect } from 'react';
import { useFilterUniversities } from '@/hooks/university/useFilterUniversitiesHook';
import { useGetAllUniversities } from '@/hooks/university/useGetAllUniversitiesHook';
import { UniversityFilters } from '@/types/universityType';
import { SearchFilterBar } from '@/components/molecules/SearchFilterBar';
import { UniversityGrid } from '@/components/molecules/UniversityGrid';
import { UniversityDetailsModal } from '@/components/molecules/UniversityDetailsModal';
import { UniversityFilterModal } from '@/components/molecules/UniversityFilterModal';
import { Notification, NotificationData } from '@/components/molecules/Notification';
import { University } from 'lucide-react';

export default function StudentUniversitiesScreen() {
  // Estados
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null);
  const [notification, setNotification] = useState<NotificationData | null>(null);
  const [filters, setFilters] = useState<UniversityFilters>({});

  // Obtener datos de universidades
  const { data: allUniversities, isLoading, isError, error, refetch } = useGetAllUniversities();

  // Usar el hook de filtrado
  const { filteredUniversities, updateFilters, resetFilters } = useFilterUniversities(
    allUniversities || [],
    filters
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

  // Manejar errores de la API
  useEffect(() => {
    if (isError && error) {
      setNotification({
        type: 'error',
        title: 'Error al cargar universidades',
        message: error instanceof Error ? error.message : 'Ocurrió un error al obtener las universidades'
      });
    }
  }, [isError, error]);

  // Efecto para refrescar los datos al montar el componente
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Manejador para ver detalles de una universidad
  const handleSelectUniversity = (university: any) => {
    setSelectedUniversity(university);
    setShowDetailsModal(true);
  };

  // Manejador para cerrar el modal de detalles
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedUniversity(null);
  };

  // Manejador para el filtro
  const handleFilter = () => {
    setShowFilterModal(true);
  };

  // Manejador para aplicar filtros
  const handleApplyFilters = (newFilters: UniversityFilters) => {
    setFilters(newFilters);
    updateFilters(newFilters);
    setShowFilterModal(false);
  };

  // Manejador para la búsqueda por nombre
  const handleSearch = (searchTerm: string) => {
    const newFilters = { ...filters, name: searchTerm };
    setFilters(newFilters);
    updateFilters(newFilters);
  };

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
      <UniversityFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
      
      {/* Modal de detalles */}
      <UniversityDetailsModal
        isOpen={showDetailsModal}
        onClose={handleCloseDetailsModal}
        university={selectedUniversity}
      />

      {/* Encabezado y descripción */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <University className="h-6 w-6 text-orange-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Universidades</h1>
        </div>
        <p className="text-gray-600">
          Explora diferentes universidades y encuentra la que mejor se adapte a tu futuro académico.
        </p>
      </div>

      {/* Indicadores de estado */}
      {isLoading && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-blue-700">Cargando universidades...</span>
          </div>
        </div>
      )}

      {/* Información de filtros activos */}
      {Object.keys(filters).length > 0 && (
        <div className="mb-4 p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-orange-700">
              <span className="font-medium">Filtros activos:</span>
              {filters.name && <span className="ml-2">• Búsqueda: "{filters.name}"</span>}
              {filters.zone && <span className="ml-2">• Zona: {filters.zone}</span>}
              {filters.locality && <span className="ml-2">• Localidad: {filters.locality}</span>}
              {filters.address && <span className="ml-2">• Dirección: {filters.address}</span>}
            </div>
            <button
              onClick={() => {
                setFilters({});
                resetFilters();
                setShowFilterModal(false);
              }}
              className="text-orange-600 hover:text-orange-800 text-sm underline"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      )}

      {/* Barra de búsqueda y filtros */}
      <div className="mb-6">
        <SearchFilterBar
          onSearch={handleSearch}
          onFilter={handleFilter}
          searchPlaceholder="Buscar universidades"
          showAddButton={false}
          showFilterButton={true}
        />
      </div>

      {/* Grid de universidades */}
      <UniversityGrid
        universities={filteredUniversities}
        onSelectUniversity={handleSelectUniversity}
        isLoading={isLoading}
      />

      {/* Mensaje cuando no hay resultados */}
      {!isLoading && filteredUniversities.length === 0 && !isError && (
        <div className="text-center py-12">
          <University className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No se encontraron universidades
          </h3>
          <p className="text-gray-500 mb-4">
            {Object.keys(filters).length > 0
              ? 'Intenta ajustar tus filtros de búsqueda'
              : 'No hay universidades disponibles en este momento'
            }
          </p>
          {Object.keys(filters).length > 0 && (
            <button
              onClick={() => {
                setFilters({});
                resetFilters();
              }}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}

      {/* Mensaje de error con opción de reintento */}
      {isError && (
        <div className="text-center py-12">
          <div className="mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error al cargar universidades
            </h3>
            <p className="text-gray-500 mb-4">
              No se pudieron cargar las universidades. Verifica tu conexión e intenta nuevamente.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}