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
  secondary?: boolean
} & ClassAttributes<Element> &
  DOMAttributes<Element>

const Typography = ({
  level,
  className = '',
  children,
  style,
  secondary = false,
  ...props
}: TypographyProps) => {
  const typoType = !!level ? `h${level}` : 'span'
  const customStyle = { display: 'block', opacity: secondary ? 0.5 : 1 }

  return createElement(
    typoType,
    { ...props, className, style: { ...customStyle, ...style } },
    children,
  )
}

export default Typography
