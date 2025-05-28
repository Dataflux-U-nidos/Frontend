import { Avatar, AvatarImage } from "../atoms/ui/avatar"
import { 
  Mail, 
  Calendar, 
  GraduationCap, 
  MapPin,
  User
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
    <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-blue-50/40 backdrop-blur-sm">
      <CardContent className="p-0">
        {/* Header decorativo */}
        <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-blue-500 h-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-600/20 to-blue-600/30"></div>
          {/* Patrones decorativos mejorados */}
          <div className="absolute top-6 right-6 opacity-15">
            <User className="h-20 w-20 text-white" />
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
          <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-white/5 blur-lg"></div>
        </div>

        {/* Contenido principal */}
        <div className="px-8 pb-8 -mt-16 relative">
          {/* Avatar con mejor diseño */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative group">
              <div className="w-36 h-36 rounded-full bg-gradient-to-r from-white to-gray-50 p-1.5 shadow-2xl ring-4 ring-white/50 transition-all duration-300 group-hover:shadow-3xl group-hover:scale-105">
                <Avatar className="w-full h-full border-4 border-gradient-to-r from-orange-200 to-blue-200 ring-2 ring-white/80">
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
              <div className="mb-6">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-orange-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {fullName}
                </h1>
                <div className="h-1.5 w-16 bg-gradient-to-r from-orange-400 via-orange-500 to-blue-500 rounded-full mx-auto md:mx-0 shadow-sm"></div>
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