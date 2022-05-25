import { useState } from 'react'
import { IdlType } from '@project-serum/anchor/dist/cjs/idl'

import ParamInput from './index'
import Button from '../../button'

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
    <div>
      <div>
        <Button onClick={() => onAdd()}>Add</Button>
      </div>
      {values.map((val, idx) => {
        return (
          <div key={idx}>
            <ParamInput
              idlType={idlType}
              name={String(idx)}
              value={val}
              onChange={(data) => onChangeValues(idx, data)}
            />
          </div>
        )
      })}
      {!!values.length && (
        <div>
          <Button onClick={() => onOk()}>Done</Button>
        </div>
      )}
    </div>
  )
}

export default ArrayInput
