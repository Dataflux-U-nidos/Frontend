import { Avatar, AvatarFallback, AvatarImage } from "../atoms/ui/avatar";
import { Badge } from "../atoms/ui/badge";
import { Button, buttonVariants } from "@/components/atoms/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/atoms/ui/card";
import { Check, Linkedin } from "lucide-react";
import { LightBulbIcon } from "../atoms/ui/Icons";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage
              src="https://i.pravatar.cc/150?img=32"
              alt="Foto de María Pérez"
            />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">María Pérez</CardTitle>
            <CardDescription>Estudiante de Medicina</CardDescription>
          </div>
        </CardHeader>

        <CardContent>“Descubrí la universidad perfecta para mí. ¡La recomiendo 100%!”</CardContent>
      </Card>

      {/* Team */}
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <img
            src="https://www.javeriana.edu.co/recursosdb/2299859/2364811/padre-munera-500.jpg/93bef083-3877-fdac-8dc3-862978b4ceeb?t=1678772459442"
            alt="user avatar"
            className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
          />
          <CardTitle className="text-center">Luis Fernando Múnera</CardTitle>
          <CardDescription className="font-normal text-primary">
            Director de la Universidad Javeriana
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2">
          <p>
            Hemos visto cómo cientos de estudiantes encuentran su carrera ideal gracias a los test personalizados.
          </p>
        </CardContent>

        <CardFooter>
          <div>

            <a
              rel="noreferrer noopener"
              href="https://x.com/RectorJaveriana"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">X icon</span>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-foreground w-5 h-5"
              >
                <title>X</title>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>

            <a
              rel="noreferrer noopener"
              href="https://www.linkedin.com/school/pontificia-universidad-javeriana/posts/?feedView=all"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Linkedin icon</span>
              <Linkedin size="20" />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      <Card className="absolute top-[160px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            Gratis

          </CardTitle>
          <div>
            <span className="text-3xl font-bold">$0</span>
            <span className="text-muted-foreground"> /mensuales</span>
          </div>

          <CardDescription>
            ¿Que esperas? Descubre tu futuro académico!
          </CardDescription>
        </CardHeader>


        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {[
              "Acceso a una amplia red de universidades",
              "Test personalizados para encontrar tu carrera ideal",
              "Información actualizada sobre becas y financiamiento",
            ].map((benefit: string) => (
              <span
                key={benefit}
                className="flex"
              >
                <Check className="text-green-500" />{" "}
                <h3 className="ml-2">{benefit}</h3>
              </span>
            )
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className="absolute w-[350px] -right-[10px] bottom-[-30px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>¿Eres una institución educativa?</CardTitle>
            <CardDescription className="text-md mt-2">
              Únete a nuestra red y llega a miles de estudiantes buscando su carrera ideal.
            </CardDescription>
          </div>
        </CardHeader>
        <CardFooter className="px-6 pb-6">
          <Button variant="default" className="w-full" onClick={() => alert("Redirigir a registro institución…")}>
            Regístrate aquí
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
