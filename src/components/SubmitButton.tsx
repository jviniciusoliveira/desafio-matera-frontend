import Button, { ButtonProps } from '@mui/material/Button'

type SubmitButtonProps = ButtonProps

export function SubmitButton(props: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="contained"
      size="large"
      fullWidth
      {...props}
    />
  )
}
