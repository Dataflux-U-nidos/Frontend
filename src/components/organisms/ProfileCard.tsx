
import { Avatar, AvatarImage } from "../atoms/ui/avatar"

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
    <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-xl shadow">
      <Avatar className="w-28 h-28">
        <AvatarImage src={avatar} alt={name} />
      </Avatar>
      <div>
        <h2 className="text-2xl font-bold text-orange-700">{name}</h2>
        <p className="text-sm text-gray-600">{email}</p>
        <p className="text-sm text-gray-600">{age} años</p>
        <p className="text-sm text-gray-600">{school}</p>
        <p className="text-sm text-gray-600">{location}</p>
      </div>
    </div>
  )
}
