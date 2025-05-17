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

export default function StudentJobOpportunitiesScreen() {
  // Estados
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedJobOpportunity, setSelectedJobOpportunity] = useState<JobOpportunity | null>(null);
  const [notification, setNotification] = useState<NotificationData | null>(null);
  const [filters, setFilters] = useState<JobOpportunityFilters>({});
  
  // Obtener datos del backend
  const { 
    data: jobOpportunities, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useGetAllJobOpportunities();

  // Usar el hook de filtrado para datos del backend
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

  // Manejar errores de la API
  useEffect(() => {
    if (isError && error) {
      console.log('Error detectado desde el backend:', error);
      setNotification({
        type: 'error',
        title: 'Error al cargar salidas laborales',
        message: 'No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.'
      });
    }
  }, [isError, error]);

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
    updateFilters(newFilters);
    setShowFilterModal(false);
  };

  // Manejador para la búsqueda por nombre
  const handleSearch = (searchTerm: string) => {
    const newFilters = { ...filters, name: searchTerm };
    handleApplyFilters(newFilters);
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
        jobOpportunities={filteredJobOpportunities}
        onSelectJobOpportunity={handleSelectJobOpportunity}
        isLoading={isLoading}
      />

      {/* Mensaje cuando no hay resultados */}
      {!isLoading && filteredJobOpportunities.length === 0 && (
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
                updateFilters({});
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