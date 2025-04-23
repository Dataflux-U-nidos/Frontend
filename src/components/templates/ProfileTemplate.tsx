import { ProfileCard } from "../organisms/ProfileCard"
import { PersonalityCard } from "../organisms/PersonalityCard"
import { PreferencesCard } from "../organisms/PreferencesCard"
import { TopCareersCard } from "../organisms/TopCareersCard"

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
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <ProfileCard
        name={name}
        email={email}
        age={age}
        school={school}
        location={location}
        avatar={avatar}
      />
      <div className="grid md:grid-cols-2 gap-6">
        <PersonalityCard personality={personality} />
        <PreferencesCard preferences={preferences} />
      </div>
      <TopCareersCard careers={topCareers} />
    </div>
  )
}
