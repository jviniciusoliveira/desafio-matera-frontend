import { Stack, StackProps } from '@mui/material'

type PageContainerProps = StackProps

export function PageContainer({ children, ...rest }: PageContainerProps) {
  return (
    <Stack spacing={4} {...rest}>
      {children}
    </Stack>
  )
}
