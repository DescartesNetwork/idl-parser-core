import { useEffect, useState } from 'react'
import IonIcon from '@sentre/antd-ionicon'

import TemplateView from '../idlViewer/templateView'
import UploadFIle from './uploadFile'
import ViewUploaded from './viewUploaded'
import Modal from '../components/modal'
import InstructionView from '../idlViewer/instructionView'
import GenerateInstruction from '../generateInstruction'
import Button from '../components/button'

import { useParser } from '../providers/parser.provider'

const UploadIdl = () => {
  const [visible, setVisible] = useState(false)
  const { parser, txInstructions } = useParser()
  const { idl } = parser || {}

  useEffect(() => {
    if (!!idl) return setVisible(true)
    else return setVisible(false)
  }, [idl])

  return (
    <div>
      <div className="flex flex-row gap-4 justify-center">
        <div className="flex-auto">
          <UploadFIle />
        </div>
        <Button
          onClick={() => setVisible(true)}
          preffix={<IonIcon name="print-outline" />}
        />
      </div>
      <Modal
        className="md:!w-[95%] lg:!w-[900px]"
        visible={visible}
        onClose={() => setVisible(false)}
        closable={false}
      >
        <div className="grid grid-cols-1 gap-8">
          <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-6 min-h-[300px]">
            <div className="flex flex-col gap-8 p-4 bg-[#EBEBEB]">
              <ViewUploaded />
              <TemplateView />
            </div>
            <InstructionView />
          </div>
          <GenerateInstruction />
        </div>
      </Modal>
    </div>
  )
}
export default UploadIdl
