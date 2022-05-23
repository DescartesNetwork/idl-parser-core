import { Idl } from '@project-serum/anchor'
import { useParser } from '../providers/parser.provider'

export const UploadIdl = () => {
  const {
    uploadIdl,
    parser: { idl },
    removeIdl,
  } = useParser()

  const remove = () => {
    removeIdl()
    return true
  }
  const upload = (file: FileList | null) => {
    if (!file) return
    const fileReader = new FileReader()
    fileReader.readAsText(file[0], 'UTF-8')
    fileReader.onload = (e) => {
      try {
        if (!e.target?.result) return
        const idl = JSON.parse(e.target.result.toString()) as Idl
        let validIdl = idl.name && idl.instructions.length && idl.version
        if (validIdl) return uploadIdl(idl)
      } catch (err: any) {
        // window.notify({ type: "error", description: err.message });
      }
    }
  }
  if (!!idl)
    return (
      <div>
        <span>IDl name:</span>
        <p>{idl.name}</p>
        <span onClick={remove}>close</span>
      </div>
    )
  return (
    <div>
      <input
        type="file"
        accept=".json"
        onChange={(e) => upload(e.target.files)}
      />
    </div>
  )
}
