import Button from '../button'

import { useParser } from '../providers/parser.provider'

const TemplateView = () => {
  const {
    parser: { idl },
    setInstruction,
  } = useParser()

  return (
    <div className="grid gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {idl?.instructions.map((instruc, idx) => (
        <div key={idx}>
          <Button onClick={() => setInstruction(instruc.name)} block>
            {instruc.name}
          </Button>
        </div>
      ))}
    </div>
  )
}

export default TemplateView
