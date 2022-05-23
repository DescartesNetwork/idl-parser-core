import { useParser } from '../providers/parser.provider'

const TemplateView = () => {
  const {
    parser: { idl },
    setInstruction,
  } = useParser()

  return (
    <div>
      {idl?.instructions.map((instruc, idx) => (
        <div key={idx}>
          <button onClick={() => setInstruction(instruc.name)}>
            {instruc.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default TemplateView
