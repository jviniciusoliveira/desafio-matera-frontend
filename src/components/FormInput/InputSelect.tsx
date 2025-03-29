import { useId } from 'react'
import { Controller } from 'react-hook-form'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material'

type Option = {
  value: string
  label: string
}

type InputSelectProps = SelectProps & {
  name: string
  label: string
  options: Array<Option>
}

export function InputSelect({
  name,
  label,
  options,
  ...rest
}: InputSelectProps) {
  const inputId = useId()

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <FormControl>
          <FormLabel htmlFor={inputId}>{label}</FormLabel>
          <Select
            {...field}
            {...rest}
            required
            fullWidth
            displayEmpty
            size="small"
            error={Boolean(fieldState.error)}
            inputProps={{
              id: inputId,
              'aria-placeholder': 'Selecione um item na lista',
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {Boolean(fieldState.error?.message) && (
            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}
