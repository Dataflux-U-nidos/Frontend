import { Avatar, AvatarImage } from "../atoms/ui/avatar"
import { Camera } from "lucide-react"

type ProfileCardProps = {
  avatar: string
  name: string
  email: string
  age: number
  school: string
  location: string
}

export function ProfileCard({
  avatar,
  name,
  email,
  age,
  school,
  location,
}: ProfileCardProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-2xl shadow-md">
      <div className="relative">
        <Avatar className="w-36 h-36 border-4 border-white shadow-lg">
          <AvatarImage src={avatar} alt={name} />
        </Avatar>
        <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md">
          <Camera className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-orange-500">{name}</h2>
        <p className="text-gray-600 mb-1">{email}</p>
        <p className="text-gray-600 mb-1">{age} años</p>
        <p className="text-gray-600 mb-1">{school}</p>
        <p className="text-gray-600">{location}</p>
      </div>
    </div>
  )
}