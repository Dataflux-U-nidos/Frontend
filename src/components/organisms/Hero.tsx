import { AuroraText } from "../atoms/magicui/aurora-text";
import { Button } from "../atoms/ui/button";
import { CircleImage } from "../atoms/ui/circle";

interface HeroProps {
  onCreateAccount: () => void;
}
export const Hero = ({ onCreateAccount }: HeroProps) => {

  return (
    <section className="grid lg:grid-cols-2 place-items-center py-20 md:py-20 gap-10">

      {/* Main text content */}
      <div className="text-center space-y-10 ">
        <h1 className="text-5xl md:text-6xl font-bold ">
          Conectándote con la universidad de{" "}
          <AuroraText>
            Tus sueños
          </AuroraText>
        </h1>
        <p className="flex justify-center text-xl text-gray-600">
          Encuentra la carrera adecuada para ti.
        </p>
        <div className="flex justify-center">
          <Button variant="default" size="lg" onClick={onCreateAccount}>¡Comencemos!</Button>
        </div>
      </div>

      {/* Diagonal images */}
      <div className="relative w-fit h-fit">
        <CircleImage
          src="https://cea.javeriana.edu.co/documents/1578131/9621979/lineas-plan-estrategico.jpg/9dce9b93-1aaa-2293-6814-490446a139c1?t=1689284414781"
          alt="Usuario"
          className="absolute left-25"
        />
        <CircleImage
          src="https://freedesignfile.com/upload/2017/10/Smile-college-student-Stock-Photo.jpg"
          alt="Usuario"
          className="absolute right-35"
        />
      </div>
    
    </section>
  );
};
