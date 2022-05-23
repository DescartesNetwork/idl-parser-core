import { CSSProperties, Fragment, ReactNode, useEffect } from 'react'

type ModalProps = {
  visible?: boolean
  onClose?: () => void
  children?: ReactNode
  closeIcon?: ReactNode
  mark?: boolean
  bodyStyle?: CSSProperties
  className?: string
}

const Modal = ({
  visible,
  children,
  onClose = () => {},
  closeIcon = <span>x</span>,
  mark = true,
  bodyStyle,
  className,
}: ModalProps) => {
  useEffect(() => {
    if (!visible) onClose()
  }, [onClose, visible])

  const modalCln = !!className
    ? `${className} sntr-modal-wrapper`
    : 'sntr-modal-wrapper'

  if (!visible) return <Fragment />
  return (
    <Fragment>
      <style>
        {
          '.sntr-modal-wrapper{position:fixed;width:100vw;height:100vh;top:0;left:0}.sntr-modal-mark{width:100%;height:100%;backdrop-filter:blur(2px)}.sntr-modal-content{position:absolute;min-width:575px;top:50%;left:50%;transform:translate(-50%,-50%);padding:24px;background:#dadada;border-radius:8px}.sntr-modal-close-ico{position:absolute;display:flex;justify-content:center;align-items:center;width:34px;height:34px;top:0;right:0}'
        }
      </style>
      <div className={modalCln}>
        {!!mark && <div className="sntr-modal-mark"></div>}
        <div style={{ ...bodyStyle }} className="sntr-modal-content">
          <div className="sntr-modal-close-ico" onClick={onClose}>
            {closeIcon}
          </div>
          <div className="sntr-modal-body">{children}</div>
        </div>
      </div>
    </Fragment>
  )
}

export default Modal
