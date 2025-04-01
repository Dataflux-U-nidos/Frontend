import { Navbar } from "../organisms/Navbar";
import { Hero } from "../organisms/Hero";
import { Features, FeatureProps } from "../organisms/Features";
import { Testimonials, ReviewProps } from "../organisms/Testimonials";


interface LandingTemplateProps {
  features: FeatureProps[];
  featureList: string[];
  reviews: ReviewProps[];
  onCreateAccount: () => void;
}

export const LandingTemplate = ({ features, featureList, reviews, onCreateAccount }: LandingTemplateProps) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar onCreateAccount={onCreateAccount}/>
      <main>
        <Hero onCreateAccount={onCreateAccount}/>
        <Features features={features} featureList={featureList} />
        <Testimonials reviews={reviews}/>
      </main>
    </div>
  );
};
