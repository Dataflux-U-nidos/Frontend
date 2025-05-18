// src/components/templates/GradesFormTemplate.tsx
import { forwardRef, useState } from "react"
import { DynamicForm, DynamicFormHandles } from "@/components/molecules/Dynamic-form"
import type { FormField, SelectFormField } from "@/types/formTypes"

const zoneOptions = [
  { value: "Norte",        label: "Norte" },
  { value: "Sur",          label: "Sur" },
  { value: "Occidente",    label: "Occidente" },
  { value: "Oriente",      label: "Oriente" },
  { value: "Noroccidente", label: "Noroccidente" },
  { value: "Nororiente",   label: "Nororiente" },
  { value: "Suroccidente", label: "Suroccidente" },
  { value: "Suroriente",   label: "Suroriente" },
]

const localityMap: Record<string, { value: string; label: string }[]> = {
  Norte: [
    { value: "Usaquén",     label: "Usaquén" },
    { value: "Suba",        label: "Suba" },
    { value: "Barrios Unidos", label: "Barrios Unidos" },
  ],
  Sur: [
    { value: "Ciudad Bolívar", label: "Ciudad Bolívar" },
    { value: "Usme",           label: "Usme" },
    { value: "Tunjuelito",     label: "Tunjuelito" },
    { value: "Sumapaz",        label: "Sumapaz" },
  ],
  Occidente: [
    { value: "Engativá", label: "Engativá" },
    { value: "Fontibón", label: "Fontibón" },
  ],
  Oriente: [
    { value: "Santa Fe",      label: "Santa Fe" },
    { value: "La Candelaria", label: "La Candelaria" },
  ],
  Noroccidente: [
    { value: "Suba",     label: "Suba" },
    { value: "Engativá", label: "Engativá" },
  ],
  Nororiente: [
    { value: "Chapinero", label: "Chapinero" },
    { value: "Usaquén",   label: "Usaquén" },
  ],
  Suroccidente: [
    { value: "Kennedy", label: "Kennedy" },
    { value: "Bosa",    label: "Bosa" },
  ],
  Suroriente: [
    { value: "Rafael Uribe Uribe", label: "Rafael Uribe Uribe" },
    { value: "Ciudad Bolívar",      label: "Ciudad Bolívar" },
  ],
}

export interface GradesFormTemplateProps {
  onChange?: (data: Record<string, any>) => void
}

export const GradesFormTemplate = forwardRef<DynamicFormHandles, GradesFormTemplateProps>(({ onChange }, ref) => {
  const [values, setValues] = useState<Record<string, any>>({})

  const handleChange = (data: Record<string, any>) => {
    setValues(data)
    onChange?.(data)
  }

  const formDataConfig: FormField[] = [
    {
      key: "zone",
      type: "select",
      placeholder: "Zona",
      required: true,
      options: zoneOptions,
      selectPlaceholder: "Selecciona una zona",
    } as SelectFormField,

    {
      key: "locality",
      type: "select",
      placeholder: "Localidad",
      required: true,
      options: values.zone ? localityMap[values.zone] || [] : [],
      selectPlaceholder: values.zone
        ? "Selecciona una localidad"
        : "Primero selecciona zona",
    } as SelectFormField,

    { key: "artes",             type: "grade", placeholder: "Artes",             required: true },
    { key: "cienciasNaturales", type: "grade", placeholder: "Ciencias Naturales", required: true },
    { key: "cienciasSociales",  type: "grade", placeholder: "Ciencias Sociales",  required: true },
    { key: "idiomas",           type: "grade", placeholder: "Idiomas",           required: true },
    { key: "lenguaje",          type: "grade", placeholder: "Lenguaje",          required: true },
    { key: "matematicas",       type: "grade", placeholder: "Matemáticas",       required: true },
  ]

  return (
    <DynamicForm
      ref={ref}
      formDataConfig={formDataConfig}
      onChange={handleChange}
    />
  )
})
