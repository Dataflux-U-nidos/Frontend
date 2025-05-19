import UniversityRegistryForm from "@/components/organisms/UniversityRegistryForm";
import type { FormField } from "@/types/formTypes";
import { CarouselPlugin, Slide } from "../molecules/Carousel";

interface AuthTemplateProps {
  registryFields: FormField[];
  slides: Slide[];
  onRegister: (values: any) => void;
  onRegistryChange?: (values: Record<string, any>) => void;
}

export default function AuthTemplate({ registryFields, slides, onRegister, onRegistryChange }: Readonly<AuthTemplateProps>) {
  return (
    <main className="grid h-screen w-screen p-8 gap-8 overflow-x-hidden grid-cols-1 xl:grid-cols-2">
      <section className="hidden xl:flex items-center justify-center h-full overflow-hidden rounded-xl">
        <CarouselPlugin slides={slides} />
      </section>
      <section className="flex flex-col h-full min-h-0 overflow-y-auto">
        <UniversityRegistryForm
          registryFields={registryFields}
          onRegister={onRegister}
          onRegistryChange={onRegistryChange}
        />
      </section>
    </main>
  );
}