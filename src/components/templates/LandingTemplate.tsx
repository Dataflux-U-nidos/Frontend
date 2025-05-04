import { Navbar } from "../organisms/Navbar";
import { Hero } from "../organisms/Hero";
import { Features, FeatureProps } from "../organisms/Features";
import { Testimonials, ReviewProps } from "../organisms/Testimonials";
import { Pricing, PricingProps } from "../organisms/Pricing";


interface LandingTemplateProps {
  features: FeatureProps[];
  featureList: string[];
  reviews: ReviewProps[];
  pricingList: PricingProps["plans"];
  onCreateAccount: () => void;
}

export const LandingTemplate = ({ features, featureList, reviews, onCreateAccount, pricingList }: LandingTemplateProps) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar onCreateAccount={onCreateAccount}/>
      <main>
        <Hero onCreateAccount={onCreateAccount}/>
        <Features features={features} featureList={featureList} />
        <Testimonials reviews={reviews}/>
        <Pricing plans={pricingList} />
      </main>
    </div>
  );
};
