import { Typography, TypographyProps } from '@mui/material'

type PageTitleProps = TypographyProps

export function PageTitle(props: PageTitleProps) {
  return <Typography variant="h4" {...props} />
}
