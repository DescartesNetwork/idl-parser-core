import { CSSProperties, ReactNode } from 'react'

type InputProps = {
  value: string
  onChange: (value: string) => void
  suffix?: ReactNode
  preffix?: ReactNode
  bordered?: boolean
  style?: CSSProperties
  bodyStyle?: CSSProperties
  className?: string
}

const Input = ({
  value,
  bordered = true,
  suffix,
  preffix,
  style,
  bodyStyle,
  onChange,
  className = '',
}: InputProps) => {
  const ipBorder = bordered
    ? { border: '1px solid', borderRadius: 8, padding: '6px 14px' }
    : { border: 'none' }
  const cln = 'flex flex-nowrap justify-between gap-2'

  return (
    <div className={`${cln} ${className}`} style={{ ...ipBorder, ...style }}>
      {preffix}
      <input
        className="flex-auto"
        style={{
          border: 'none',
          outline: 'none',
          background: 'inherit',
          ...bodyStyle,
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {suffix}
    </div>
  )
}

export default Input
