import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useGetUniversityById, useUpdateUniversity } from "@/hooks";
import { FormField } from "@/types/formTypes";
import { DynamicForm, DynamicFormHandles } from "@/components/molecules/Dynamic-form";
import { Button } from "@/components/atoms/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRef } from "react";

interface Notification {
  type: 'success' | 'error';
  title: string;
  message: string;
}

// Campos del formulario para editar universidad - basado en el modelo real
const universityFormFields: FormField[] = [
  {
    type: "user",
    key: "name",
    placeholder: "Nombre de la Universidad",
    required: true,
    minLength: 2,
    maxLength: 100
  },
  {
    type: "email",
    key: "email",
    placeholder: "Correo Electrónico",
    required: true,
    maxLength: 100
  },
  {
    type: "address",
    key: "address",
    placeholder: "Dirección",
    required: false,
    maxLength: 200
  },
  {
    type: "address",
    key: "locality",
    placeholder: "Localidad",
    required: false,
    maxLength: 100
  },
  {
    type: "user",
    key: "zone",
    placeholder: "Zona",
    required: false,
    maxLength: 50
  },
  {
    type: "select",
    key: "price_range",
    placeholder: "Rango de Precios",
    required: false,
    options: [
      { value: "LOW", label: "Bajo" },
      { value: "MEDIUM", label: "Medio" },
      { value: "HIGH", label: "Alto" }
    ]
  },
  {
    type: "select",
    key: "aceptation_difficulty",
    placeholder: "Dificultad de Aceptación",
    required: false,
    options: [
      { value: "EASY", label: "Fácil" },
      { value: "MEDIUM", label: "Media" },
      { value: "HARD", label: "Difícil" }
    ]
  },
  {
    type: "textarea",
    key: "description",
    placeholder: "Descripción de la Universidad",
    required: false,
    maxLength: 500
  },
  {
    type: "user",
    key: "link",
    placeholder: "Sitio Web",
    required: false,
    maxLength: 200
  }
];

export default function InfoManagerUniversityScreen() {
  const { user } = useAuthContext();
  const formRef = useRef<DynamicFormHandles>(null);
  
  // Determinar qué ID usar para la universidad
  const universityIdToUse = user?.universityId || user?.id;
  
  // Debug: Verificar el usuario actual
  useEffect(() => {
    console.log('Current user:', user);
    console.log('User universityId:', user?.universityId);
    console.log('User id:', user?.id);
    console.log('University ID to use:', universityIdToUse);
  }, [user, universityIdToUse]);
  
  // Estados
  const [notification, setNotification] = useState<Notification | null>(null);
  const [formData, setFormData] = useState<any | null>(null);
  const [universityLoaded, setUniversityLoaded] = useState(false);
  
  // Hooks - usar el ID determinado
  const { data: universityData, isLoading, error } = useGetUniversityById(universityIdToUse || "");
  const { mutateAsync: updateUniversity, isPending: isUpdating } = useUpdateUniversity();

  // Debug del hook
  useEffect(() => {
    console.log('University data:', universityData);
    console.log('Is loading:', isLoading);
    console.log('Error:', error);
  }, [universityData, isLoading, error]);

  // Cargar datos iniciales cuando se obtiene la universidad
  useEffect(() => {
    if (universityData && !universityLoaded) {
      // Usar type assertion para evitar errores de tipo
      const uniData = universityData as any;
      
      const initialData = {
        name: uniData.name || '',
        email: uniData.email || '',
        address: uniData.address || '',
        locality: uniData.locality || '',
        zone: uniData.zone || '',
        price_range: uniData.price_range || '',
        aceptation_difficulty: uniData.aceptation_difficulty || '',
        description: uniData.description || '',
        link: uniData.link || ''
      };
      
      console.log('Setting initial form data:', initialData);
      setFormData(initialData);
      setUniversityLoaded(true);
    }
  }, [universityData, universityLoaded]);

  // Manejar notificaciones
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

  // Manejar cambios del formulario
  const handleFormChange = (data: any) => {
    console.log('Form data changed:', data);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current || !universityIdToUse) {
      console.error('Form ref or university ID not available');
      return;
    }

    try {
      await formRef.current.handleSubmit(async (data) => {
        console.log('Submitting form data:', data);
        
        // Preparar los datos para la actualización
        const updateData = {
          id: universityIdToUse, // Usar el ID determinado
          updates: {
            name: data.name,
            email: data.email,
            ...(data.address && { address: data.address }),
            ...(data.locality && { locality: data.locality }),
            ...(data.zone && { zone: data.zone }),
            ...(data.price_range && { price_range: data.price_range }),
            ...(data.aceptation_difficulty && { aceptation_difficulty: data.aceptation_difficulty }),
            ...(data.description && { description: data.description }),
            ...(data.link && { link: data.link })
          }
        };

        console.log('Update data to send:', updateData);
        await updateUniversity(updateData);
        
        // Recargar los datos de la universidad después de la actualización
        setUniversityLoaded(false);
        
        setNotification({
          type: 'success',
          title: 'Universidad actualizada',
          message: 'Los datos de la universidad han sido actualizados exitosamente.'
        });
      })();
    } catch (error) {
      console.error('Error updating university:', error);
      setNotification({
        type: 'error',
        title: 'Error al actualizar',
        message: error instanceof Error ? error.message : 'Ha ocurrido un error al actualizar los datos de la universidad.'
      });
    }
  };

  // Componente de notificación
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

  // Mostrar loading si está cargando
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          <p className="text-gray-600">Cargando datos de la universidad...</p>
        </div>
      </div>
    );
  }

  // Mostrar error si no se pueden cargar los datos
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-red-500">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar datos</h3>
              <p className="text-gray-600">No se pudieron cargar los datos de la universidad.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {/* Notificación personalizada */}
      <CustomNotification />
      
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Configuración de la Universidad
              </h1>
              <p className="mt-2 text-gray-600">
                Actualiza la información de tu universidad
              </p>
            </div>
          </div>

          {/* Formulario */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Información de la Universidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              {formData ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <DynamicForm
                    ref={formRef}
                    formDataConfig={universityFormFields}
                    onChange={handleFormChange}
                    initialData={formData}
                  />
                  
                  <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => window.history.back()}
                      disabled={isUpdating}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isUpdating}
                      className="min-w-[120px]"
                    >
                      {isUpdating ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Guardando...
                        </>
                      ) : (
                        'Guardar Cambios'
                      )}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}