import { PropsWithChildren } from 'react'
import {
  FieldErrors,
  FieldValues,
  FormProvider as RHFormProvider,
  UseFormReturn,
} from 'react-hook-form'

type FormProviderProps<TFieldValues extends FieldValues> = PropsWithChildren & {
  methods: UseFormReturn<TFieldValues>
  onSubmit: (_fieldValues: TFieldValues) => void
  onError?: (_fieldErrors: FieldErrors) => void
}

export const FormProvider = <TFieldValues extends FieldValues>({
  children,
  methods,
  onSubmit,
  onError,
}: FormProviderProps<TFieldValues>) => (
  <RHFormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onSubmit, onError)} noValidate>
      {children}
    </form>
  </RHFormProvider>
)
