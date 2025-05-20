import React from 'react'
import {  MapPin, Calendar, Users, GraduationCap } from 'lucide-react'
import { RecommendationWithUniversity } from '@/types/recomendationType'
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  // si tienes DialogHeader, DialogFooter, etc. también los puedes usar
} from '@/components/atoms/ui/dialog'
import { cn } from '@/lib/utils'

interface UniversityRecommendationModalProps {
  isOpen: boolean
  onClose: () => void
  recommendation: RecommendationWithUniversity | null
}

export const UniversityRecommendationModal: React.FC<UniversityRecommendationModalProps> = ({
  isOpen,
  onClose,
  recommendation
}) => {
  if (!recommendation) return null

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY': return 'bg-green-100 text-green-800'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800'
      case 'HARD': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogOverlay className="fixed inset-0 bg-black/80" />

      <DialogContent
        className={cn(
          "bg-white",
          // animaciones Radix
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0   data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95  data-[state=open]:zoom-in-95",
          // centrar en pantalla
          "fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          // restricciones de tamaño y scroll
          "min-w-[50vw] max-h-[90vh] overflow-y-auto",
        )}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {recommendation.name}
            </h2>
            <p className="text-lg font-semibold text-gray-700 mt-1">
              {recommendation.university.name}
            </p>
          </div>
          
        </div>

        <div className="p-6">
          {/* Banner/Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatPrice(recommendation.price)}
                </div>
                <div className="text-sm text-gray-600">Por semestre</div>
              </div>
              <div className="text-center">
                <div
                  className={`
                    inline-block px-3 py-1 rounded-full text-sm font-medium
                    ${getDifficultyColor(recommendation.difficulty)}
                  `}
                >
                  {recommendation.difficulty === 'EASY' ? 'Fácil'
                    : recommendation.difficulty === 'MEDIUM' ? 'Moderada'
                      : 'Difícil'}
                </div>
                <div className="text-sm text-gray-600 mt-1">Dificultad</div>
              </div>
            </div>
          </div>

          {/* Resto del contenido (idéntico al tuyo) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Información de la Carrera */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <GraduationCap className="mr-2 h-5 w-5 text-blue-600" />
                Información de la Carrera
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Descripción
                  </label>
                  <p className="text-gray-800 mt-1">
                    {recommendation.description}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Área de Enfoque
                  </label>
                  <p className="text-gray-800 mt-1">
                    {recommendation.focus}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Competencias Relacionadas
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {recommendation.preferences.map((pref, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {pref.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Información de la Universidad */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-600" />
                Información de la Universidad
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Descripción
                  </label>
                  <p className="text-gray-800 mt-1">
                    {recommendation.university.description}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Ubicación
                  </label>
                  <div className="flex items-center mt-1">
                    <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="text-gray-800">
                      {recommendation.university.address}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {recommendation.university.zone},{" "}
                    {recommendation.university.locality}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Dificultad de Admisión
                  </label>
                  <div className="mt-2">
                    <span
                      className={`
                        inline-block px-3 py-1 rounded-full text-sm font-medium
                        ${getDifficultyColor(
                        recommendation.university.aceptation_difficulty
                      )}
                      `}
                    >
                      {recommendation.university.aceptation_difficulty === 'EASY'
                        ? 'Fácil'
                        : recommendation.university.aceptation_difficulty === 'MEDIUM'
                          ? 'Moderada'
                          : 'Difícil'}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Contacto
                  </label>
                  <p className="text-gray-800 mt-1">
                    {recommendation.university.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Eventos */}
          {recommendation.university.events?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                Eventos Próximos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendation.university.events.map((event, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {event.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {event.description}
                    </p>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botón de acción */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            {recommendation.university.link && (
              <button
                onClick={() => window.open(recommendation.university.link, '_blank')}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Visitar Universidad
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
