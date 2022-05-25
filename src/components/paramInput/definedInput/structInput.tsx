import { useState } from 'react'
import { IdlTypeDefTyStruct } from '@project-serum/anchor/dist/cjs/idl'

import ParamInput from '../index'
import Button from '../../../button'

const StructInput = ({
  structType,
  onChange,
}: {
  structType: IdlTypeDefTyStruct
  onChange: (val: string) => void
}) => {
  const [structData, setStructData] = useState<Record<string, string>>({})

  const onChangeStruct = (key: string, val: string) => {
    const newData = { ...structData }
    newData[key] = val
    setStructData(newData)
  }

  return (
    <div>
      {structType.fields?.map(({ name, type }) => {
        return (
          <div>
            <ParamInput
              name={name}
              idlType={type}
              value={structData[name] || ''}
              onChange={(data) => onChangeStruct(name, data)}
            />
          </div>
        )
      })}
      <div>
        <Button onClick={() => onChange(JSON.stringify(structData))}>OK</Button>
      </div>
    </div>
  )
}
export default StructInput
