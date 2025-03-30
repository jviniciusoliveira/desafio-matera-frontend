import { PropsWithChildren } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ptBR } from '@mui/x-date-pickers/locales'

const ptBrLocale =
  ptBR.components.MuiLocalizationProvider.defaultProps.localeText
import 'dayjs/locale/pt-br'

type LocalizationProviderProps = PropsWithChildren

export function DatePickerLocalizationProvider({
  children,
}: LocalizationProviderProps) {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={ptBrLocale}
      adapterLocale="pt-br"
    >
      {children}
    </LocalizationProvider>
  )
}
