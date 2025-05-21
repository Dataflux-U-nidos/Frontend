import { useState, useEffect } from "react";
import { ListPageTemplate } from "@/components/templates/ListPageTemplate";
import { SearchFilterBar } from "@/components/molecules/SearchFilterBar";
import { DataTable } from "@/components/organisms/DataTable";
import { EntityForm, FormField } from "@/components/molecules/EntityForm";
import { ConfirmationDialog } from "@/components/molecules/ConfirmationDialog";
import { FilterModal, FilterField } from "@/components/molecules/FilterModal";
import { useAuthContext } from "@/context/AuthContext";
import { getUniversityById, /*updateUser*/ } from "@/services/userService";

interface Event {
    name: string;
    description: string;
    location: string;
    date: string;
}

interface University {
    id: string;
    name: string;
    email: string;
    userType: string;
    createdAt: string;
    updatedAt: string;
    locality: string;
    zone: string;
    address: string;
    infomanagers: string[];
    viewers: string[];
    subscriptionPlanId: string;
    price_range: string;
    aceptation_difficulty: string;
    description: string;
    link: string;
    events: Event[];
}

interface Notification {
    type: 'success' | 'error';
    title: string;
    message: string;
}

export default function InfoManagerEventsScreen() {
    // Get current user context
    const { user } = useAuthContext();

    // State for university data
    const [university, setUniversity] = useState<University | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // State for events
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

    // State management for modals
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);

    // Loading states
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    console.log(isSaving);

    // Selected entities
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

    // Filters and search
    const [searchTerm, setSearchTerm] = useState("");
    const [currentFilters, setCurrentFilters] = useState<Record<string, any>>({});

    // Notifications
    const [notification, setNotification] = useState<Notification | null>(null);

    // Fetch university data
    useEffect(() => {
        const fetchUniversityData = async () => {
            if (!user?.universityId) {
                setNotification({
                    type: 'error',
                    title: 'Error',
                    message: 'No se encontró ID de universidad para este usuario.'
                });
                setIsLoading(false);
                return;
            }

            try {
                const universityData = await getUniversityById(user.universityId);
                //@ts-ignore
                setUniversity(universityData);
                //@ts-ignore
                setEvents(universityData.events || []);
                //@ts-ignore
                setFilteredEvents(universityData.events || []);
            } catch (error) {
                setNotification({
                    type: 'error',
                    title: 'Error al cargar datos',
                    message: error instanceof Error
                        ? error.message
                        : 'Ha ocurrido un error al cargar los datos de la universidad.'
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchUniversityData();
    }, [user]);

    // Form fields for adding/editing an event
    const eventFormFields: FormField[] = [
        {
            name: "name",
            label: "Nombre del Evento",
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
            name: "location",
            label: "Ubicación",
            type: "text",
            required: true,
            validation: {
                maxLength: {
                    value: 200,
                    message: "La ubicación no puede exceder 200 caracteres"
                }
            }
        },
        {
            name: "date",
            label: "Fecha y Hora",
            type: "datetime-local",
            required: true
        }
    ];

    // Filter fields for event filtering
    const eventFilterFields: FilterField[] = [
        {
            id: "name",
            label: "Nombre del Evento",
            type: "text",
            placeholder: "Buscar por nombre..."
        },
        {
            id: "location",
            label: "Ubicación",
            type: "text",
            placeholder: "Buscar por ubicación..."
        },
        {
            id: "dateFrom",
            label: "Desde",
            type: "date",
            placeholder: "Fecha inicial"
        },
        {
            id: "dateTo",
            label: "Hasta",
            type: "date",
            placeholder: "Fecha final"
        }
    ];

    // Apply filters and search
    useEffect(() => {
        if (!events.length) {
            setFilteredEvents([]);
            return;
        }

        let filtered = [...events];

        // Apply search term
        if (searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            filtered = filtered.filter(event =>
                event.name.toLowerCase().includes(lowerCaseSearch) ||
                event.description.toLowerCase().includes(lowerCaseSearch) ||
                event.location.toLowerCase().includes(lowerCaseSearch)
            );
        }

        // Apply filters
        if (currentFilters.name) {
            filtered = filtered.filter(event =>
                event.name.toLowerCase().includes(currentFilters.name.toLowerCase())
            );
        }

        if (currentFilters.location) {
            filtered = filtered.filter(event =>
                event.location.toLowerCase().includes(currentFilters.location.toLowerCase())
            );
        }

        if (currentFilters.dateFrom) {
            const fromDate = new Date(currentFilters.dateFrom);
            filtered = filtered.filter(event => new Date(event.date) >= fromDate);
        }

        if (currentFilters.dateTo) {
            const toDate = new Date(currentFilters.dateTo);
            toDate.setHours(23, 59, 59, 999); // End of the day
            filtered = filtered.filter(event => new Date(event.date) <= toDate);
        }

        setFilteredEvents(filtered);
    }, [events, searchTerm, currentFilters]);

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

    // Save events to university
    const saveEventsToUniversity = async (updatedEvents: Event[]) => {
        if (!university) return;

        setIsSaving(true);

        try {
            // Update the university with the new events array
            //await updateUser({
                id: university.id,
                //@ts-ignore
                //updates: { events: updatedEvents }
            //});

            // Update local state
            setUniversity(prev => prev ? { ...prev, events: updatedEvents } : null);
            setEvents(updatedEvents);

            return true;
        } catch (error) {
            setNotification({
                type: 'error',
                title: 'Error al guardar cambios',
                message: error instanceof Error
                    ? error.message
                    : 'Ha ocurrido un error al guardar los cambios en la universidad.'
            });
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    // View details handler
    const handleViewDetails = (event: Event) => {
        setSelectedEvent(event);
        setShowDetailsModal(true);
    };

    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
        setSelectedEvent(null);
    };

    // Add event handlers
    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleAddEvent = async (formData: any) => {
        setIsCreating(true);

        try {
            // Format date if needed
            const newEvent: Event = {
                name: formData.name,
                description: formData.description,
                location: formData.location,
                date: formData.date
            };

            // Add the new event to the events array
            const updatedEvents = [...events, newEvent];

            // Save to university
            const success = await saveEventsToUniversity(updatedEvents);

            if (success) {
                handleCloseAddModal();

                setNotification({
                    type: 'success',
                    title: '¡Evento creado!',
                    message: `El evento ${formData.name} ha sido creado exitosamente.`
                });
            }
        } catch (error) {
            setNotification({
                type: 'error',
                title: 'Error al crear evento',
                message: error instanceof Error
                    ? error.message
                    : 'Ha ocurrido un error al intentar crear el evento.'
            });
        } finally {
            setIsCreating(false);
        }
    };

    // Edit event handlers

    // Delete event handlers
    const handleInitiateDelete = (event: Event) => {
        setEventToDelete(event);
        setShowDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setEventToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!eventToDelete) {
            setNotification({
                type: 'error',
                title: 'Error',
                message: 'No se ha seleccionado ningún evento para eliminar.'
            });
            return;
        }

        setIsDeleting(true);

        try {
            // Find the index of the event to delete
            const eventIndex = events.findIndex(e =>
                e.name === eventToDelete.name &&
                e.date === eventToDelete.date
            );

            if (eventIndex === -1) {
                throw new Error('No se pudo encontrar el evento para eliminar.');
            }

            // Create a new events array without the deleted event
            const updatedEvents = events.filter((_, index) => index !== eventIndex);

            // Save to university
            const success = await saveEventsToUniversity(updatedEvents);

            if (success) {
                setShowDeleteModal(false);
                setEventToDelete(null);

                setNotification({
                    type: 'success',
                    title: 'Evento eliminado',
                    message: `El evento ${eventToDelete.name} ha sido eliminado exitosamente.`
                });
            }
        } catch (error) {
            setNotification({
                type: 'error',
                title: 'Error al eliminar evento',
                message: error instanceof Error
                    ? error.message
                    : 'Ha ocurrido un error al intentar eliminar el evento.'
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
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Entity display configuration for details modal
    const entityDisplayConfig = {
        fields: ["name", "description", "location", "date"] as (keyof Event)[],
        labels: {
            name: "Nombre",
            description: "Descripción",
            location: "Ubicación",
            date: "Fecha y Hora"
        },
        formatters: {
            date: formatDate
        },
        avatar: {
            field: "name" as keyof Event,
            fallback: (event: Event) => event.name.charAt(0).toUpperCase(),
            bgColor: "bg-purple-500",
            textColor: "text-white",
        },
    };

    // Table actions configuration
    const tableActions = [
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
        caption: "Eventos universitarios",
        rowsPerPage: 6,
        onViewDetails: handleViewDetails,
        displayColumns: ["name", "location", "date"],
        columnHeaders: {
            name: "Nombre",
            location: "Ubicación",
            date: "Fecha y Hora",
        },
        columnFormatters: {
            date: formatDate
        },
        actionButtonText: "Ver detalles",
        actions: tableActions,
        isLoading: isLoading
    };

    const searchBarConfig = {
        onSearch: handleSearch,
        onAddEntity: handleOpenAddModal,
        onFilter: handleOpenFilterModal,
        searchPlaceholder: "Buscar evento...",
        addButtonLabel: "Agregar evento",
        showFilterButton: true
    };

    const addFormConfig = {
        isOpen: showAddModal,
        onClose: handleCloseAddModal,
        onSubmit: handleAddEvent,
        fields: eventFormFields,
        title: "Agregar Nuevo Evento",
        description: "Completa el formulario para agregar un nuevo evento universitario.",
        submitButtonText: "Agregar Evento",
        cancelButtonText: "Cancelar",
        isLoading: isCreating
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
                title="Eliminar evento"
                description={`¿Estás seguro de que deseas eliminar el evento "${eventToDelete?.name}"? Esta acción no se puede deshacer.`}
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
                filterFields={eventFilterFields}
                title="Filtrar Eventos"
                description="Selecciona los criterios para filtrar los eventos universitarios"
            />

            {/* Add event form */}
            <EntityForm {...addFormConfig} />

            {/* Edit event form */}

            {/* Main template */}
            <ListPageTemplate
                data={filteredEvents}
                entityType="Eventos"
                SearchBarComponent={SearchFilterBar}
                TableComponent={DataTable}
                FormComponent={EntityForm}
                searchBarProps={searchBarConfig}
                tableProps={tableConfig}
                formProps={addFormConfig}
                selectedEntity={selectedEvent}
                showDetailsModal={showDetailsModal}
                onCloseDetailsModal={handleCloseDetailsModal}
                pageTitle="Gestión de Eventos"
                pageDescription={`Gestiona los eventos de ${university?.name || 'tu universidad'}`}
                detailsModalTitle="Detalles del Evento"
                detailsModalDescription="Información detallada del evento seleccionado"
                entityDisplayConfig={entityDisplayConfig}
                notification={notification}
                onCloseNotification={handleCloseNotification}
            />
        </>
    );
}
