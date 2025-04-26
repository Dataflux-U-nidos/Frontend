import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/atoms/ui/dialog";
import { Button } from "@/components/atoms/ui/button";

interface EntityDetailsModalProps<T extends Record<string, any>> {
  isOpen: boolean;
  onClose: () => void;
  entity: T | null;
  title?: string;
  description?: string;
  closeButtonText?: string;
  primaryButtonText?: string;
  onPrimaryAction?: (entity: T) => void;
  renderContent?: (entity: T) => React.ReactNode;
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

export function EntityDetailsModal<T extends Record<string, any>>({
  isOpen,
  onClose,
  entity,
  title = "Detalles",
  description = "",
  closeButtonText = "Cerrar",
  primaryButtonText,
  onPrimaryAction,
  renderContent,
  entityDisplayConfig
}: EntityDetailsModalProps<T>) {
  if (!entity) return null;

  if (renderContent) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-sm text-gray-500">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {renderContent(entity)}
            
            <DialogFooter className="flex justify-end space-x-2">
              {primaryButtonText && onPrimaryAction && (
                <Button 
                  onClick={() => onPrimaryAction(entity)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-4 py-2 text-sm transition-colors"
                >
                  {primaryButtonText}
                </Button>
              )}
              <Button
                onClick={onClose}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md px-4 py-2 text-sm transition-colors"
              >
                {closeButtonText}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Automatic rendering of fields based on entityDisplayConfig
  if (entityDisplayConfig) {
    const { fields, labels = {}, formatters = {}, avatar } = entityDisplayConfig;
    
    const displayFields = fields || (Object.keys(entity) as (keyof T)[]);
    
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-sm text-gray-500">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
              {/* Avatar y encabezado si está configurado */}
              {avatar && (
                <div className="flex items-center mb-4">
                  <div 
                    className={`${avatar.bgColor || 'bg-orange-500'} ${avatar.textColor || 'text-white'} rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold`}
                  >
                    {avatar.fallback(entity)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-lg">
                      {String(entity[displayFields[0]])}
                    </h3>
                    {displayFields.length > 1 && (
                      <p className="text-gray-600">
                        {String(entity[displayFields[1]])}
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Principle Fields */}
              <div className="grid grid-cols-2 gap-4">
                {displayFields
                  .filter(field => !avatar || (field !== displayFields[0] && field !== displayFields[1]))
                  .map(field => (
                    <div key={String(field)}>
                      <p className="text-gray-500">{labels[String(field)] || String(field)}:</p>
                      <p className="font-medium">
                        {formatters[String(field)] 
                          ? formatters[String(field)](entity[field])
                          : String(entity[field])}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            
            <DialogFooter className="flex justify-end space-x-2">
              {primaryButtonText && onPrimaryAction && (
                <Button 
                  onClick={() => onPrimaryAction(entity)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-4 py-2 text-sm transition-colors"
                >
                  {primaryButtonText}
                </Button>
              )}
              <Button
                onClick={onClose}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md px-4 py-2 text-sm transition-colors"
              >
                {closeButtonText}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Simple rendering of entity
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-gray-500">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
            <pre className="text-sm whitespace-pre-wrap overflow-auto">
              {JSON.stringify(entity, null, 2)}
            </pre>
          </div>
          
          <DialogFooter className="flex justify-end">
            <Button
              onClick={onClose}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md px-4 py-2 text-sm transition-colors"
            >
              {closeButtonText}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}