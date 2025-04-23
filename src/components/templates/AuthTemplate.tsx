import AuthForm from "@/components/organisms/Auth-form"
import { FormField } from "@/types/formTypes";
import { CarouselPlugin, Slide } from "../molecules/Carousel"
import { LoginInput, User } from "../../types"

interface AuthTemplateProps {
  loginFields: FormField[]
  registryFields: FormField[]
  slides: Slide[]
  onLogin: (values: LoginInput) => void
  onRegister: (values: User) => void
  onForgotPassword: () => void
}

export default function AuthTemplate({
  loginFields,
  registryFields,
  slides,
  onLogin,
  onRegister,
  onForgotPassword,
}: AuthTemplateProps) {
  return (
    <main className="grid h-screen w-screen p-8 gap-8 overflow-x-hidden grid-cols-1 xl:grid-cols-2">
      {/* Hide on mobiles/tablets, visible on xl and above */}
      <section className="hidden xl:flex items-center justify-center h-full overflow-hidden rounded-xl">
        <CarouselPlugin slides={slides} />
      </section>

      <section className="flex flex-col h-full min-h-0">
        <AuthForm
          loginFields={loginFields}
          registryFields={registryFields}
          onLogin={onLogin}
          onRegister={onRegister}
          onForgotPassword={onForgotPassword}
        />
      </section>
    </main>
  )
}
