import React, { useState, useEffect } from 'react';
import { useJobOpportunitiesWithMajorFilter } from '@/hooks/jobOpportunity/useJobOpportunitiesWithMajorFilterHook';
import { JobOpportunityFilters } from '@/types/jobOpportunityType';
import { SearchFilterBar } from '@/components/molecules/SearchFilterBar';
import { JobOpportunityGrid } from '@/components/molecules/JobOpportunityGrid';
import { JobOpportunityDetailsModal } from '@/components/molecules/JobOpportunityDetailsModal';
import { JobOpportunityFilterModal } from '@/components/molecules/JobOpportunityFilterModal';
import { Notification, NotificationData } from '@/components/molecules/Notification';
import { Briefcase } from 'lucide-react';

export default function StudentJobOpportunitiesScreen() {
  // Estados
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedJobOpportunity, setSelectedJobOpportunity] = useState<any>(null);
  const [notification, setNotification] = useState<NotificationData | null>(null);
  
  // Usar el hook personalizado que maneja todo el filtrado
  const { 
    jobOpportunities,
    filters,
    updateFilters,
    resetFilters,
    isLoading,
    isError,
    error 
  } = useJobOpportunitiesWithMajorFilter();

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
        title: 'Error al cargar salidas laborales',
        message: error instanceof Error ? error.message : 'Ocurrió un error al obtener las salidas laborales'
      });
    }
  }, [isError, error]);

  // Manejador para ver detalles de una salida laboral
  const handleSelectJobOpportunity = (jobOpportunity: any) => {
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
    console.log('🎯 Screen aplicando filtros:', newFilters);
    updateFilters(newFilters);
    setShowFilterModal(false);
  };

  // Manejador para la búsqueda por nombre
  const handleSearch = (searchTerm: string) => {
    const newFilters = { ...filters, name: searchTerm };
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

      {/* Indicadores de estado */}
      {isLoading && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-blue-700">Cargando salidas laborales...</span>
          </div>
        </div>
      )}

      {/* Información de filtros activos */}
      {Object.keys(filters).length > 0 && (
        <div className="mb-4 p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-orange-700">
              <span className="font-medium">Filtros activos:</span>
              {filters.majorId && <span className="ml-2">• Carrera seleccionada</span>}
              {filters.name && <span className="ml-2">• Búsqueda: "{filters.name}"</span>}
              {filters.salaryMin && <span className="ml-2">• Salario min: ${filters.salaryMin.toLocaleString()}</span>}
              {filters.salaryMax && <span className="ml-2">• Salario max: ${filters.salaryMax.toLocaleString()}</span>}
            </div>
            <button
              onClick={() => {
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
          searchPlaceholder="Buscar salidas laborales"
          showAddButton={false}
          showFilterButton={true}
        />
      </div>

      {/* Grid de salidas laborales */}
      <JobOpportunityGrid
        jobOpportunities={jobOpportunities}
        onSelectJobOpportunity={handleSelectJobOpportunity}
        isLoading={isLoading}
      />

      {/* Mensaje cuando no hay resultados */}
      {!isLoading && jobOpportunities.length === 0 && !isError && (
        <div className="text-center py-12">
          <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No se encontraron salidas laborales
          </h3>
          <p className="text-gray-500 mb-4">
            {Object.keys(filters).length > 0
              ? 'Intenta ajustar tus filtros de búsqueda'
              : 'No hay salidas laborales disponibles en este momento'
            }
          </p>
          {Object.keys(filters).length > 0 && (
            <button
              onClick={resetFilters}
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
              Error al cargar salidas laborales
            </h3>
            <p className="text-gray-500 mb-4">
              No se pudieron cargar las salidas laborales. Verifica tu conexión e intenta nuevamente.
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