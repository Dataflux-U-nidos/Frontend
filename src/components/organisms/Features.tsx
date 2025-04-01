import { Badge } from "../atoms/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "../atoms/ui/card";
import featureProfileImage from "../../assets/feature-profile.svg";
import featureReviewImage from "../../assets/feature-reviews.svg";
import featureWageImage from "../../assets/feature-wage.svg";

export interface FeatureProps {
  title: string;
  description: string;
  image: string;
}


interface FeaturesProps {
  features: FeatureProps[];
  featureList: string[];
}

export const Features = ({ features, featureList }: FeaturesProps) => {
  return (
    <section
      id="features"
      className="mx-auto container py-21  space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Lo que tenemos{" "}
        <span className="bg-gradient-to-r from-orange-light to-orange-primary text-transparent bg-clip-text">
          para ti
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};