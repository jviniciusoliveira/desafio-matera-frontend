import { ImgHTMLAttributes, useState } from 'react'
import { Skeleton } from '@mui/material'
import { styled } from 'styled-components'

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  isLoading: boolean
}

const Image = styled('img').withConfig({
  shouldForwardProp: (prop) => prop !== 'isLoading',
})<ImageProps>`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  display: ${(props) => (props.isLoading ? 'none' : 'inline-block')};
`

export function ProductImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div>
      {isLoading && <Skeleton variant="rounded" width={60} height={60} />}
      <Image
        {...props}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        isLoading={isLoading}
      />
    </div>
  )
}
