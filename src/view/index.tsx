import {
  GenerateInstructionAction,
  ViewTxInstructions,
} from '../generateInstruction'
import { InstructionView, TemplateView } from '../idlViewer'
import ViewUploaded from '../upload/viewUploaded'

const IdlParser = () => {
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

const IdlParserWrapper = () => {
  return (
    <div className="grid grid-cols-1 p-4 gap-6">
      <IdlParser />
      <GenerateInstructionAction />
    </div>
  )
}

export default IdlParserWrapper
