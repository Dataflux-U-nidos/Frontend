import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/ui/dialog";

// Interfaz genérica para cualquier entidad
interface Entity {
  [key: string]: any;
}

// Props para el template de página de listado
interface ListPageTemplateProps<T extends Entity> {
  // Datos principales
  data: T[];
  entityType: string; // Tipo de entidad que se está listando (ej: "Estudiantes")
  
  // Componentes
  SearchBarComponent: React.FC<any>;
  TableComponent: React.FC<any>;
  FormComponent: React.FC<any>;
  
  // Props para los componentes
  searchBarProps?: any;
  tableProps?: any;
  formProps?: any;
  
  // Estado y manejadores para modales
  selectedEntity: T | null;
  showDetailsModal: boolean;
  onCloseDetailsModal: () => void;
  
  // Textos personalizables
  pageTitle?: string;
  pageDescription?: string;
  detailsModalTitle?: string;
  detailsModalDescription?: string;
  
  // Callback para renderizar el contenido del modal de detalles
  renderEntityDetails?: (entity: T) => React.ReactNode;
}

export function ListPageTemplate<T extends Entity>({
  // Datos
  data,
  entityType,
  
  // Componentes
  SearchBarComponent,
  TableComponent,
  FormComponent,
  
  // Props para componentes
  searchBarProps = {},
  tableProps = {},
  formProps = {},
  
  // Estado y manejadores para modales
  selectedEntity,
  showDetailsModal,
  onCloseDetailsModal,
  
  // Textos personalizables
  pageTitle = `Tus ${entityType}`,
  pageDescription = `Gestiona la información de los ${entityType.toLowerCase()} a tu cargo`,
  detailsModalTitle = `Detalles del ${entityType.slice(0, -1)}`, // Quitar la "s" del plural
  detailsModalDescription = `Información detallada del ${entityType.toLowerCase().slice(0, -1)} seleccionado`,
  
  // Render personalizado
  renderEntityDetails
}: ListPageTemplateProps<T>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar para móvil (colapsable) */}
      <div className={`fixed inset-0 z-20 transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setSidebarOpen(false)}></div>
      </div>
      
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Barra superior para móvil */}
        <div className="md:hidden bg-white border-b p-4 flex items-center">
          <button
            className="text-gray-600 focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
          <h1 className="ml-4 text-xl font-semibold">Unidos</h1>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">{pageTitle}</h1>
            <p className="text-sm md:text-base text-gray-600">{pageDescription}</p>
          </div>
          
          <SearchBarComponent {...searchBarProps} />
          <TableComponent data={data} {...tableProps} />
        </div>
      </div>

      {/* Modal para detalles de la entidad */}
      {showDetailsModal && selectedEntity && (
        <Dialog open={showDetailsModal} onOpenChange={onCloseDetailsModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800">
                {detailsModalTitle}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                {detailsModalDescription}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {renderEntityDetails ? (
                renderEntityDetails(selectedEntity)
              ) : (
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                  <pre className="text-sm">{JSON.stringify(selectedEntity, null, 2)}</pre>
                </div>
              )}
              
              <div className="flex justify-end">
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md px-4 py-2 text-sm transition-colors"
                  onClick={onCloseDetailsModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* El FormComponent se renderiza fuera */}
      {FormComponent && <FormComponent {...formProps} />}
    </div>
  );
}