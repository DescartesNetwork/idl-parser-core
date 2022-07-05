import './index.min.css'

export {
  default as ParserProvider,
  useParser,
  withParser,
} from './providers/parser.provider'

export { default as IDLParserWrapper } from './view'

export { default as UploadIdl } from './upload/uploadFile'
export { default as ViewUploadedIdl } from './upload/viewUploaded'
export { default as InstructionView } from './idlViewer/instructionView'
export { default as TemplateView } from './idlViewer/templateView'
