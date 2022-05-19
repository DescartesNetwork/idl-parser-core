// import { Idl } from "@project-serum/anchor";
import { useParser } from 'parser/providers/parser.provider'
import { ChangeEvent } from 'react'

const UploadIdl = () => {
  const {
    // uploadIdl,
    parser: { idl },
    removeIdl,
  } = useParser()

  const remove = () => {
    removeIdl()
    return true
  }
  const upload = (info: ChangeEvent<HTMLInputElement>) => {
    console.log(info.target.value)
    // if (!info.file.originFileObj) return;
    // const fileReader = new FileReader();
    // fileReader.readAsText(info.file.originFileObj, "UTF-8");
    // fileReader.onload = (e) => {
    //   try {
    //     if (!e.target?.result) return;
    //     const idl = JSON.parse(e.target.result.toString()) as Idl;
    //     let validIdl = idl.name && idl.instructions.length && idl.version;
    //     if (validIdl) return uploadIdl(idl);
    //   } catch (err: any) {
    //     // window.notify({ type: 'error', description: err.message })
    //   }
    // };
  }
  if (!!idl)
    return (
      <div className="row-span-full">
        <div className="col-auto">
          <div className="icon">icon</div>
          <div className="file-name">{idl.name}</div>
        </div>
        <div className="col-end-auto">
          <button onClick={remove}>x</button>
        </div>
      </div>
    )
  return (
    // <Upload.Dragger
    //   className="sparser-upload-file"
    //   accept=".json"
    //   onRemove={remove}
    //   onChange={upload}
    //   maxCount={1}
    //   itemRender={() => null}
    // >
    //   <Card bordered={false} style={{ cursor: 'pointer' }}>
    //     <Space direction="vertical" style={{ textAlign: 'center' }} size={0}>
    //       <Typography.Text style={{ fontSize: 36 }}>
    //         <IonIcon name="cloud-upload-outline" />
    //       </Typography.Text>
    //       <Typography.Text style={{ fontSize: 16 }}>
    //         Drop or Click to Upload
    //       </Typography.Text>
    //       <Typography.Text type="secondary">Support JSON</Typography.Text>
    //     </Space>
    //   </Card>
    // </Upload.Dragger>
    <input type="file" onChange={upload}>
      Upload file
    </input>
  )
}

export default UploadIdl
