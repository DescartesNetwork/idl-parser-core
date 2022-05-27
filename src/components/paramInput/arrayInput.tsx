import { useState } from 'react'
import { IdlType } from '@project-serum/anchor/dist/cjs/idl'

import ParamInput from './index'
import Button from '../button'

const ArrayInput = ({
  idlType,
  onChange,
}: {
  idlType: IdlType
  onChange: (val: string) => void
}) => {
  const [values, setValues] = useState<string[]>([])

  const onAdd = () => {
    const newValues = [...values]
    newValues.push('')
    setValues(newValues)
  }

  const onChangeValues = (idx: number, val: string) => {
    const newValues = [...values]
    newValues[idx] = val
    setValues(newValues)
  }

  const onOk = () => {
    const stringData = values.join(',')
    onChange(stringData)
  }

  return (
    <div className="flex flex-col gap-6">
      <Button onClick={() => onAdd()}>Add</Button>

      {values.map((val, idx) => {
        return (
          <ParamInput
            idlType={idlType}
            name={String(idx)}
            value={val}
            onChange={(data) => onChangeValues(idx, data)}
            key={idx}
          />
        )
      })}
      {!!values.length && <Button onClick={() => onOk()}>Done</Button>}
    </div>
  )
}

export default ArrayInput