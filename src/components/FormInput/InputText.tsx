import { useId } from 'react'
import { Controller } from 'react-hook-form'
import {
  CircularProgress,
  FormControl,
  FormLabel,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material'

type InputTextProps = TextFieldProps & {
  name: string
  label: string
  isLoading?: boolean
  formatter?: (value: string) => string
}

export function InputText({
  name,
  label,
  formatter,
  isLoading,
  ...rest
}: InputTextProps) {
  const inputId = useId()

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <FormControl>
          <FormLabel htmlFor={inputId}>{label}</FormLabel>
          <TextField
            id={inputId}
            {...field}
            {...rest}
            size="small"
            variant="outlined"
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            onChange={(event) => {
              let value = event.target.value
              if (value && formatter) {
                value = formatter(value)
              }
              field.onChange(value)
            }}
            slotProps={{
              htmlInput: {
                'aria-placeholder': rest['aria-placeholder'],
              },
              input: {
                endAdornment: isLoading && (
                  <InputAdornment position="end">
                    <CircularProgress size="16px" />
                  </InputAdornment>
                ),
              },
            }}
            fullWidth
          />
        </FormControl>
      )}
    />
  )
}
