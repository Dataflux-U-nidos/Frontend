// src/components/molecules/UniversityDetailsModal.tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/atoms/ui/dialog";
import { University } from "@/types/universityType";
import { MapPin, Mail, Building, GraduationCap, Users, Settings, Phone, Globe } from "lucide-react";

// Imágenes predefinidas para las universidades (mismo array que en UniversityCard)
const universityImages = [
  "https://www.javeriana.edu.co/recursosdb/2299859/2364811/padre-munera-500.jpg/93bef083-3877-fdac-8dc3-862978b4ceeb?t=1678772459442",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Universidad_Nacional_de_Colombia_-_Bogot%C3%A1.jpg/1200px-Universidad_Nacional_de_Colombia_-_Bogot%C3%A1.jpg",
  "https://www.uniandes.edu.co/sites/default/files/styles/large/public/2021-05/campus-2.jpg",
  "https://www.ucatolica.edu.co/portal/wp-content/uploads/2019/08/edificio-principal.jpg",
  "https://www.usergioarboleda.edu.co/wp-content/uploads/2020/01/campus-bogota-sede-norte.jpg",
  "https://www.ucentral.edu.co/sites/default/files/2020-02/IMG_20200211_113053.jpg",
  "https://www.ean.edu.co/sites/default/files/noticias/EAN-Virtual.jpg",
  "https://www.udistrital.edu.co/sites/default/files/imagenes/noticias/2019/mayo/IMG_5851.JPG",
  "https://www.unisabana.edu.co/fileadmin/_processed_/0/3/csm_campus-puente-del-comun_1920x846_4b9b45e8b3.jpg",
  "https://www.unbosque.edu.co/sites/default/files/2020-03/campus.jpg"
];

// Función para obtener una imagen basada en ID
const getUniversityImage = (id: string): string => {
  const numericId = parseInt(id.replace(/[^0-9]/g, ''), 10) || 0;
  const index = numericId % universityImages.length;
  return universityImages[index];
};

interface UniversityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  university: University | null;
}

export function UniversityDetailsModal({
  isOpen,
  onClose,
  university
}: UniversityDetailsModalProps) {
  // Si no hay una universidad seleccionada, no mostrar el modal
  if (!university) return null;

  // Obtener imagen basada en ID
  const imageUrl = getUniversityImage(university._id || university.id || "1");

  // Formatear la información de ubicación
  const locationInfo = [university.zone, university.locality].filter(Boolean).join(', ');

  // Datos ficticios adicionales para el detalle
  const universityDetails = {
    founded: "1623",
    website: "www.universidad.edu.co",
    phone: "+57 1 320 8320",
    studentCount: "15,000",
    facultyCount: "1,200",
    campuses: 3,
    accreditation: "Acreditación de Alta Calidad",
    ranking: "#2 en Colombia",
    programs: [
      "Ingenierías",
      "Ciencias de la Salud", 
      "Ciencias Sociales",
      "Artes y Humanidades",
      "Ciencias Económicas"
    ],
    description: `Una institución de educación superior reconocida por su excelencia académica y su compromiso con la formación integral de profesionales competentes y ciudadanos responsables. Con más de 400 años de trayectoria, se destaca por su investigación de alta calidad y su contribución al desarrollo del país.`
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {university.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {locationInfo && `${locationInfo} • `}
            {universityDetails.accreditation}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Imagen destacada */}
          <div className="w-full h-64 overflow-hidden rounded-lg">
            <img 
              src={imageUrl} 
              alt={university.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Información principal en cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Building className="h-5 w-5 text-orange-500 mr-2" />
                <h3 className="font-semibold text-gray-800">Información General</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fundada:</span>
                  <span className="font-medium">{universityDetails.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ranking:</span>
                  <span className="font-medium">{universityDetails.ranking}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Campus:</span>
                  <span className="font-medium">{universityDetails.campuses} sedes</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-semibold text-gray-800">Comunidad Académica</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Estudiantes:</span>
                  <span className="font-medium">{universityDetails.studentCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Profesores:</span>
                  <span className="font-medium">{universityDetails.facultyCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Acreditación:</span>
                  <span className="font-medium text-green-600">Vigente</span>
                </div>
              </div>
            </div>
          </div>

          {/* Información de contacto */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Settings className="h-4 w-4 text-gray-600 mr-2" />
              Información de Contacto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium">Dirección</p>
                  <p className="text-gray-700 text-sm">{university.address}</p>
                  {locationInfo && (
                    <p className="text-gray-500 text-xs">{locationInfo}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium">Email institucional</p>
                  <p className="text-gray-700 text-sm">{university.email}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Globe className="h-4 w-4 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium">Sitio web</p>
                  <p className="text-blue-600 text-sm hover:underline cursor-pointer">
                    {universityDetails.website}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium">Teléfono</p>
                  <p className="text-gray-700 text-sm">{universityDetails.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <GraduationCap className="h-4 w-4 text-gray-600 mr-2" />
              Acerca de la Universidad
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {universityDetails.description}
            </p>
            
            {/* Estadísticas adicionales */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-2xl font-bold text-orange-500">{universityDetails.studentCount}</p>
                <p className="text-xs text-gray-500">Estudiantes activos</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-2xl font-bold text-blue-500">{universityDetails.facultyCount}</p>
                <p className="text-xs text-gray-500">Docentes</p>
              </div>
            </div>
          </div>

          {/* Áreas de estudio */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Building className="h-4 w-4 text-green-600 mr-2" />
              Áreas de Estudio
            </h3>
            <div className="flex flex-wrap gap-2">
              {universityDetails.programs.map((program) => (
                <span 
                  key={program} 
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
                >
                  {program}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Oferta académica amplia con programas de pregrado y posgrado
            </p>
          </div>

          {/* Call to action */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 mb-2">
                ¿Interesado en esta universidad?
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Obtén más información sobre programas, admisiones y becas disponibles.
              </p>
              <button className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm font-medium">
                Contactar Universidad
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}