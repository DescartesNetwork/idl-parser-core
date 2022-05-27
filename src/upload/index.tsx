import { useEffect, useState } from 'react'

import TemplateView from '../idlViewer/templateView'
import UploadFIle from './uploadFile'
import ViewUploaded from './viewUploaded'
import Modal from '../components/modal'
import InstructionView from '../idlViewer/instructionView'

import { useParser } from '../providers/parser.provider'

const UploadIdl = () => {
  const {
    parser: { idl },
    removeIdl,
  } = useParser()
  const [visible, setVisible] = useState(false)

  const onClose = () => {
    setVisible(false)
    removeIdl()
  }

  useEffect(() => {
    if (!!idl) return setVisible(true)
    else return setVisible(false)
  }, [idl])

  return (
    <div>
      <UploadFIle />
      <Modal
        className="!sm:w-full !lg:w-[900px]"
        visible={visible}
        onClose={onClose}
        closable={false}
      >
        <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-6 min-h-[300px]">
          <div className="flex flex-col gap-5">
            <div className="bg-slate-50 p-4">
              <ViewUploaded />
            </div>
            <div className="bg-slate-50 p-4 h-full">
              <TemplateView />
            </div>
          </div>
          <InstructionView />
        </div>
      </Modal>
    </div>
  )
}
export default UploadIdl
