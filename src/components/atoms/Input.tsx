import { Input } from "@/components/atoms/ui/input";
import { ComponentProps } from "react";

export function AtomInput(props: ComponentProps<typeof Input>) {
  return <Input {...props} />;
}
