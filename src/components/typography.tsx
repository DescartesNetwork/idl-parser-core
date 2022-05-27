import {
  ClassAttributes,
  createElement,
  CSSProperties,
  DOMAttributes,
  ReactNode,
} from 'react'

type TypographyLevel = 1 | 2 | 3 | 4 | 5
type TypographyProps = {
  level?: TypographyLevel
  children?: ReactNode
  className?: string
  style?: CSSProperties
} & ClassAttributes<Element> &
  DOMAttributes<Element>

const Typography = ({
  level,
  className = '',
  children,
  style,
  ...props
}: TypographyProps) => {
  const typoType = !!level ? `h${level}` : 'span'
  const customStyle = { display: 'block' }

  return createElement(
    typoType,
    { ...props, className, style: { ...customStyle, ...style } },
    children,
  )
}

export default Typography
