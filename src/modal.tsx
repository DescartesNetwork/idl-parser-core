import {
  CSSProperties,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  visible?: boolean
  onClose?: () => void
  children?: ReactNode
  closeIcon?: ReactNode
  mark?: boolean
  bodyStyle?: CSSProperties
  className?: string
}

const RawModal = ({
  visible,
  children,
  onClose = () => {},
  closeIcon = <span>x</span>,
  mark = true,
  bodyStyle,
  className,
}: ModalProps) => {
  const modalBodyRef = useRef<HTMLDivElement>(null)

  const onClickOutSide = useCallback(
    (event: MouseEvent) => {
      const ref = modalBodyRef.current
      const target = event.target
      if (!!ref && !ref?.contains(target as Node)) onClose()
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutSide)
    return () => document.removeEventListener('mousedown', onClickOutSide)
  }, [onClickOutSide])

  useEffect(() => {
    if (!visible) onClose()
  }, [onClose, visible])

  const modalCln = !!className
    ? `${className} sntr-modal-wrapper`
    : 'sntr-modal-wrapper'

  if (!visible) return <Fragment />

  return (
    <div className={modalCln}>
      {!!mark && <div className="sntr-modal-mark"></div>}
      <div
        style={{ ...bodyStyle }}
        className="sntr-modal-content"
        ref={modalBodyRef}
      >
        <div className="sntr-modal-close-ico" onClick={onClose}>
          {closeIcon}
        </div>
        <div className="sntr-modal-body">{children}</div>
      </div>
    </div>
  )
}

const Modal = (props: ModalProps) => {
  return createPortal(
    <RawModal {...props} />,
    document.querySelector('body') as Element,
  )
}

export default Modal
