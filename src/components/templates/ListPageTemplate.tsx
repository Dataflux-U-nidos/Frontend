import React, { useState } from "react";
import { EntityDetailsModal } from "@/components/organisms/EntityDetailsModal";

interface Entity {
  [key: string]: any;
}

// Props for the ListPageTemplate component
interface ListPageTemplateProps<T extends Entity> {
  data: T[];
  entityType: string; // Tipo de entidad que se está listando (ej: "Estudiantes")
  
  SearchBarComponent: React.FC<any>;
  TableComponent: React.FC<any>;
  FormComponent: React.FC<any>;
  
  searchBarProps?: any;
  tableProps?: any;
  formProps?: any;
  
  selectedEntity: T | null;
  showDetailsModal: boolean;
  onCloseDetailsModal: () => void;
  
  pageTitle?: string;
  pageDescription?: string;
  detailsModalTitle?: string;
  detailsModalDescription?: string;
  
  renderEntityDetails?: (entity: T) => React.ReactNode;
  entityDisplayConfig?: {
    fields?: (keyof T)[];
    labels?: Record<string, string>;
    formatters?: Record<string, (value: any) => React.ReactNode>;
    avatar?: {
      field: keyof T;
      fallback: (entity: T) => string;
      bgColor?: string;
      textColor?: string;
    };
  };
}

export function ListPageTemplate<T extends Entity>({
  data,
  entityType,
  
  SearchBarComponent,
  TableComponent,
  FormComponent,
  
  searchBarProps = {},
  tableProps = {},
  formProps = {},
  
  selectedEntity,
  showDetailsModal,
  onCloseDetailsModal,
  
  pageTitle = `Tus ${entityType}`,
  pageDescription = `Gestiona la información de los ${entityType.toLowerCase()} a tu cargo`,
  detailsModalTitle = `Detalles del ${entityType.slice(0, -1)}`, // Quitar la "s" del plural
  detailsModalDescription = `Información detallada del ${entityType.toLowerCase().slice(0, -1)} seleccionado`,
  
  renderEntityDetails,
  entityDisplayConfig
}: ListPageTemplateProps<T>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar for mobile */}
      <div className={`fixed inset-0 z-20 transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setSidebarOpen(false)}></div>
      </div>
      
      {/* Principle content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Superior bar for mobile */}
        

        {/* Principle content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">{pageTitle}</h1>
            <p className="text-sm md:text-base text-gray-600">{pageDescription}</p>
          </div>
          
          <SearchBarComponent {...searchBarProps} />
          <TableComponent data={data} {...tableProps} />
        </div>
      </div>

      {/* Modal for entity details using the organism EntityDetailsModal */}
      <EntityDetailsModal
        isOpen={showDetailsModal}
        onClose={onCloseDetailsModal}
        entity={selectedEntity}
        title={detailsModalTitle}
        description={detailsModalDescription}
        renderContent={renderEntityDetails}
        entityDisplayConfig={entityDisplayConfig}
      />

      {/* FormComponent is renderized out */}
      {FormComponent && <FormComponent {...formProps} />}
    </div>
  );
}