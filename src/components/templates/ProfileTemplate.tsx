import { ProfileCard } from "../organisms/ProfileCard"
import { PersonalityCard } from "../organisms/PersonalityCard"
import { PreferencesCard } from "../organisms/PreferencesCard"
import { TopCareersCard } from "../organisms/TopCareersCard"
import Nacional from "../../assets/nacional.jpg"

interface StudentProfileTemplateProps {
  name: string;
  email: string;
  age: number;
  school: string;
  location: string;
  avatar: string;
  personality: {
    trait: string;
    value: number;
    color: string;
  }[];
  preferences: {
    label: string;
    icon: string;
    color: string;
  }[];
  topCareers: {
    name: string;
    icon?: string;
    color: string;
  }[];
}

export const StudentProfileTemplate = ({
  name,
  email,
  age,
  school,
  location,
  avatar,
  personality,
  preferences,
  topCareers,
}: StudentProfileTemplateProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner/Header image */}
      <div className="w-full h-64 bg-gray-300 relative overflow-hidden">
        <img 
          src= {Nacional}
          alt="Universidad" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gray-100 rounded-t-full " />
      </div>
      
      <div className="max-w-5xl mx-auto px-4 -mt-24 relative z-10">
        <ProfileCard
          name={name}
          email={email}
          age={age}
          school={school}
          location={location}
          avatar={avatar}
        />
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-2">
            <PreferencesCard preferences={preferences} />
          </div>
          <div className="md:col-span-3">
            <PersonalityCard personality={personality} />
          </div>
        </div>
        
        <div className="mt-6">
          <TopCareersCard careers={topCareers} />
        </div>
      </div>
    </div>
  )
}