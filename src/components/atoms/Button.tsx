import { Button } from "@/components/atoms/ui/button";
import { ComponentProps } from "react";

export function AtomButton(props: ComponentProps<typeof Button>) {
  return <Button {...props} />;
}
