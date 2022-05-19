import { UploadIdl } from 'parser'
import { useParser } from 'parser/providers/parser.provider'

const App = () => {
  const {
    parser: { idl },
  } = useParser()

  console.log(idl)
  return (
    <div>
      <div>Name: {idl?.name}</div>
      <UploadIdl />
    </div>
  )
}

export default App
