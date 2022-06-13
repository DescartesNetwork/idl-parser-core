import { Fragment, useState } from 'react'
import { IdlType } from '@project-serum/anchor/dist/cjs/idl'

import DefinedInput from './definedInput'
import PublicKeyInput from '../publicKeyInput'
import ArrayInput from './arrayInput'
import Input from '../input'
import Button from '../button'
import Typography from '../typography'
import Modal from '../modal'
import Select from '../select'

import { useParser } from '../../providers/parser.provider'
import { AddressCategory } from '../../constants'
import { IdlParser } from '../../helpers'
import IonIcon from '@sentre/antd-ionicon'

const NORMAL_TYPES = [
  'u8',
  'i8',
  'u16',
  'i16',
  'u32',
  'i32',
  'f32',
  'u64',
  'i64',
  'f64',
  'u128',
  'i128',
]

type WrapInputProps = {
  idlType: any
  inputName: string
  onChange: (value: string) => void
}

const WrapInput = ({ inputName, idlType, onChange }: WrapInputProps) => {
  const { parser } = useParser()
  if (!parser.idl?.accounts) return null

  if (idlType['vec'])
    return <ArrayInput idlType={idlType['vec']} onChange={onChange} />
  if (idlType['array']) {
    if (Array.isArray(idlType['array'])) {
      return <ArrayInput idlType={idlType['array'][0]} onChange={onChange} />
    }
    return <ArrayInput idlType={idlType['array']} onChange={onChange} />
  }

  if (idlType['defined']) {
    return (
      <WrapInput
        idlType={idlType['defined']}
        inputName={inputName}
        onChange={onChange}
      />
    )
  }

  return <DefinedInput name={idlType} onChange={onChange} />
}

type ParamInputProps = {
  name: string
  value: string
  idlType: IdlType
  onChange: (val: string) => void
  placeholder?: string
  onRemove?: () => void
  acceptRemove?: boolean
}

const ParamInput = ({
  name,
  value,
  idlType,
  onChange,
  placeholder = 'Input or select your types',
  onRemove = () => {},
  acceptRemove = false,
}: ParamInputProps) => {
  const [visible, setVisible] = useState(false)
  const [systemSelected, setSystemSelected] = useState(AddressCategory.system)

  const onChangeWrapInput = (val: string) => {
    onChange(val)
    setVisible(false)
  }

  const isExistIdlType = !NORMAL_TYPES.includes(idlType.toString())

  return (
    <div>
      {idlType === 'publicKey' ? (
        <PublicKeyInput
          name={name}
          onChange={(acc) => onChange(acc.publicKey)}
          onRemove={onRemove}
          acceptRemove
          value={value}
        />
      ) : (
        <div className="grid gird-cols-1 gap-1">
          <div className="flex flex-row gap-2">
            <Typography className="capitalize text-gray-400">{name}</Typography>
            <Typography secondary>
              ({IdlParser.getTypeOfParam(idlType)})
            </Typography>
          </div>
          <div className="flex flex-row gap-4">
            <Input
              className="flex-auto"
              placeholder={placeholder}
              value={value}
              onValue={onChange}
              bordered={false}
              suffix={
                isExistIdlType && (
                  <Button type="text" onClick={() => setVisible(true)}>
                    <Typography level={5}>Init</Typography>
                  </Button>
                )
              }
            />
            {acceptRemove && (
              <Button
                type="text"
                onClick={onRemove}
                suffix={<IonIcon name="trash-outline" />}
              />
            )}
          </div>
        </div>
      )}
      {/* Advanced input */}
      {isExistIdlType && (
        <Modal
          visible={visible}
          onClose={() => setVisible(false)}
          destroyOnClose
        >
          <div className="grid grid-cols-1 gap-8">
            <Typography
              className="!flex flex-1"
              style={{
                textTransform: 'capitalize',
                fontWeight: 600,
              }}
            >
              {name}
            </Typography>
            <WrapInput
              idlType={idlType}
              onChange={onChangeWrapInput}
              inputName={name}
            />
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ParamInput
