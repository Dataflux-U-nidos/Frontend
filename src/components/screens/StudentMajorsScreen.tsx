// src/components/screens/StudentMajorsScreen.tsx
import { useState, useEffect, useMemo } from 'react';
import { useFilterMajors } from '@/hooks/major/useFilterMajorsHook';
import { useGetAllMajors } from '@/hooks/major/useGetAllMajorsHook';
import { MajorFilters } from '@/types/majorType';
import { SearchFilterBar } from '@/components/molecules/SearchFilterBar';
import { FilterModal, FilterField } from '@/components/molecules/FilterModal';
import { MajorDetailsModal } from '@/components/molecules/MajorDetailsModal';
import { Notification, NotificationData } from '@/components/molecules/Notification';
import { CareerCard } from '@/components/molecules/CareerCard';
import { BookOpen } from 'lucide-react';

export default function StudentMajorsScreen() {
  // Estados
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState<any>(null);
  const [notification, setNotification] = useState<NotificationData | null>(null);
  const [filters, setFilters] = useState<MajorFilters>({});

  // Obtener datos de carreras
  const { data: allMajors, isLoading, isError, error, refetch } = useGetAllMajors();

  // Usar el hook de filtrado
  const { filteredMajors, updateFilters, resetFilters } = useFilterMajors(
    allMajors || [],
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
        title: 'Error al cargar carreras',
        message: error instanceof Error ? error.message : 'Ocurrió un error al obtener las carreras'
      });
    }
  }, [isError, error]);

  // Efecto para refrescar los datos al montar el componente
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Manejador para ver detalles de una carrera
  const handleSelectMajor = (major: any) => {
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
  const handleApplyFilters = (newFilters: MajorFilters) => {
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

  const focusOptions = useMemo(() => {
    if (!allMajors) return [];
      const uniques = Array.from(new Set(allMajors.map((m) => m.focus).filter(Boolean)));
    return uniques.map((f) => ({ value: f, label: f }));
  }, [allMajors]);

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
      type: "select",
      options: focusOptions,
    }
  ];

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
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
        filterFields={filterFields}
        title="Filtrar Carreras"
        description="Selecciona los criterios para filtrar las carreras universitarias"
      />
      
      {/* Modal de detalles */}
      <MajorDetailsModal
        isOpen={showDetailsModal}
        onClose={handleCloseDetailsModal}
        major={selectedMajor}
      />

      {/* Encabezado y descripción */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <BookOpen className="h-6 w-6 text-orange-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Programas Académicos</h1>
        </div>
        <p className="text-gray-600">
          Explora las diferentes opciones académicas disponibles para tu formación profesional.
        </p>
      </div>

      {/* Indicadores de estado */}
      {isLoading && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-blue-700">Cargando programas académicos...</span>
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
              {filters.difficulty && <span className="ml-2">• Dificultad: {filters.difficulty}</span>}
              {filters.priceMin && <span className="ml-2">• Precio min: ${filters.priceMin.toLocaleString()}</span>}
              {filters.priceMax && <span className="ml-2">• Precio max: ${filters.priceMax.toLocaleString()}</span>}
              {filters.focus && <span className="ml-2">• Enfoque: {filters.focus}</span>}
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
          searchPlaceholder="Buscar programas"
          showAddButton={false}
          showFilterButton={true}
        />
      </div>

      {/* Grid de carreras - mismo diseño que universidades */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMajors.map((major) => (
            <CareerCard
              key={major._id || major.id}
              major={major}
              onClick={() => handleSelectMajor(major)}
            />
          ))}
        </div>
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 animate-pulse h-64 rounded-lg p-6"
            />
          ))}
        </div>
      )}

      {/* Mensaje cuando no hay resultados */}
      {!isLoading && filteredMajors.length === 0 && !isError && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No se encontraron programas académicos
          </h3>
          <p className="text-gray-500 mb-4">
            {Object.keys(filters).length > 0
              ? 'Intenta ajustar tus filtros de búsqueda'
              : 'No hay programas disponibles en este momento'
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
              Error al cargar programas académicos
            </h3>
            <p className="text-gray-500 mb-4">
              No se pudieron cargar los programas. Verifica tu conexión e intenta nuevamente.
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