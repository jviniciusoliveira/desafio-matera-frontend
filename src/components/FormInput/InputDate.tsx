import { useId } from 'react'
import { Controller } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { FormControl, FormHelperText, FormLabel } from '@mui/material'

type InputDateProps = {
  name: string
  label: string
}

export function InputDate({ name, label }: InputDateProps) {
  const inputId = useId()

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <FormControl>
          <FormLabel htmlFor={inputId}>{label}</FormLabel>
          <DatePicker
            {...field}
            slotProps={{
              textField: {
                variant: 'outlined',
                size: 'small',
                id: inputId,
                error: Boolean(fieldState.error),
              },
            }}
          />
          {Boolean(fieldState.error?.message) && (
            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}
