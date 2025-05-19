import { Avatar, AvatarImage } from "../atoms/ui/avatar"
import { 
  Camera, 
  Mail, 
  Calendar, 
  GraduationCap, 
  MapPin,
  User,
  Edit3
} from "lucide-react"
import {
  Card,
  CardContent,
} from "../atoms/ui/card"

type ProfileCardProps = {
  avatar: string
  name: string
  last_name?: string
  email: string
  age: number
  school: string
  location: string
}

export function ProfileCard({
  avatar,
  name,
  last_name,
  email,
  age,
  school,
  location,
}: ProfileCardProps) {
  const fullName = last_name ? `${name} ${last_name}` : name;
  
  return (
    <Card className="shadow-lg border-0 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50">
      <CardContent className="p-0">
        {/* Header decorativo */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-orange-700 opacity-20"></div>
          {/* Patrón decorativo */}
          <div className="absolute top-4 right-4 opacity-10">
            <User className="h-16 w-16 text-white" />
          </div>
        </div>

        {/* Contenido principal */}
        <div className="px-6 pb-6 -mt-12 relative">
          {/* Avatar con mejor diseño */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-white p-1 shadow-2xl">
                <Avatar className="w-full h-full border-4 border-orange-100">
                  <AvatarImage 
                    src={avatar} 
                    alt={fullName}
                    className="object-cover"
                  />
                </Avatar>
              </div>
            </div>
            
            {/* Información del usuario */}
            <div className="flex-1 text-center md:text-left md:mt-6">
              {/* Nombre principal */}
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                  {fullName}
                </h1>
                <div className="h-1 w-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mx-auto md:mx-0"></div>
              </div>

              {/* Información en grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="flex items-center justify-center md:justify-start gap-3 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 font-medium">Email</p>
                    <p className="text-sm text-gray-700 font-medium truncate" title={email}>
                      {email}
                    </p>
                  </div>
                </div>

                {/* Edad */}
                <div className="flex items-center justify-center md:justify-start gap-3 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Calendar className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 font-medium">Edad</p>
                    <p className="text-sm text-gray-700 font-medium">
                      {age} años
                    </p>
                  </div>
                </div>

                {/* Institución */}
                <div className="flex items-center justify-center md:justify-start gap-3 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <GraduationCap className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 font-medium">Institución</p>
                    <p className="text-sm text-gray-700 font-medium truncate" title={school}>
                      {school}
                    </p>
                  </div>
                </div>

                {/* Ubicación */}
                <div className="flex items-center justify-center md:justify-start gap-3 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                  <div className="p-2 bg-red-100 rounded-full">
                    <MapPin className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 font-medium">Ubicación</p>
                    <p className="text-sm text-gray-700 font-medium truncate" title={location}>
                      {location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}