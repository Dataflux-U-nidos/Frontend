import { Badge } from "@/components/atoms/ui/badge";
import { Button } from "@/components/atoms/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/ui/card";
import { Check } from "lucide-react";

export enum PopularPlanType {
  NO = 0,
  YES = 1,
}

export interface Plan {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

// Props del componente: un array de Plan
export interface PricingProps {
  plans: Plan[];
}

export const Pricing = ({ plans }: PricingProps) => {
  return (
    <section
      id="pricing"
      className="mx-auto container py-21  space-y-8 "
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Conozca
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          Nuestros{" "}
        </span>
        Planes
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Elige el plan que mejor se adapte a tus necesidades
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((pricing) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge
                    variant="secondary"
                    className="text-sm text-primary"
                  >
                    Más Popular
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">${pricing.price}</span>
                <span className="text-muted-foreground"> /mensuales</span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button className="w-full" >{pricing.buttonText}</Button>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit: string) => (
                  <span
                    key={benefit}
                    className="flex"
                  >
                    <Check className="text-green-500" />{" "}
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
