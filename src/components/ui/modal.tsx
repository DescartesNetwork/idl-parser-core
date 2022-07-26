import Dialog, { DialogProps } from 'rc-dialog'
import { useParser } from '../../providers/parser.provider'

import 'rc-dialog/assets/index.css'

const Modal = (props: DialogProps) => {
  const { appId } = useParser()

  return (
    <Dialog
      getContainer={() => document.getElementById(appId || '') as HTMLElement}
      {...props}
    >
      {props.children}
    </Dialog>
  )
}

export default Modal
