import ViewTxInstructions from '../generateInstruction/viewTxInstructions'
import { InstructionView, TemplateView } from '../idlViewer'
import ViewUploaded from '../upload/viewUploaded'

const IdlParserWrapper = () => {
  return (
    <div className="grid grid:cols-1 gap-6">
      <div className="flex w-full flex-col md:flex-row gap-10 md:gap-6">
        <div className="flex w-full md:w-1/2 p-4 flex-col gap-8 bg-[#EBEBEB]">
          <ViewUploaded />
          <TemplateView />
        </div>
        <div className="w-full md:w-1/2">
          <InstructionView />
        </div>
      </div>
      <ViewTxInstructions />
    </div>
  )
}

export default IdlParserWrapper
