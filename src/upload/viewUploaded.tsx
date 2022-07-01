import { useRef, useState } from 'react'
import { account } from '@senswap/sen-js'
import IonIcon from '@sentre/antd-ionicon'

import Typography from '../components/typography'
import UploadFIle from './uploadFile'
import Input from 'components/input'

import { useParser } from '../providers/parser.provider'

type ViewUploadedProps = { onClick?: () => void }
const ViewUploaded = ({ onClick = () => {} }: ViewUploadedProps) => {
  const { parser, removeIdl, programAddress, setProgramAddress } = useParser()
  const { idl } = parser || {}
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocusProgramAddress, setIsFocusProgramAddress] = useState(false)
  const [value, setValue] = useState(programAddress)

  const isEmptyProgramAddr = !programAddress
  const clnTextColor = isEmptyProgramAddr ? 'text-[#F9575E]' : 'text-green-600'

  const onFocusFieldProgramAddrr = () => {
    if (!inputRef.current) return setIsFocusProgramAddress(false)
    setIsFocusProgramAddress(true)
    inputRef.current.focus()
  }

  const onUpdateProgrameAddress = () => {
    setIsFocusProgramAddress(false)
    if (!account.isAddress(value)) return setValue(programAddress)
    return setProgramAddress(value)
  }

  const onChange = (val: string) => {
    if (isFocusProgramAddress) return setValue(val)
  }

  const remove = () => {
    removeIdl()
    return true
  }

  if (!idl) return <UploadFIle />

  return (
    <div className="flex flex-col gap-4">
      {/* Program address */}
      <div className="flex flex-col gap-1">
        <Typography>Program Address</Typography>
        <div className="flex flex-row items-center gap-2 border border-solid border-[#B3B3B3] rounded-[8px] pl-[2px] pr-[16px] py-[4px] bg-[#0000000d] text-[16px]">
          <Input
            bordered={false}
            className="flex-auto bg-[transparent]"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onUpdateProgrameAddress}
            ref={inputRef}
          />
          {isFocusProgramAddress ? (
            <IonIcon
              className="cursor-pointer"
              name="save-outline"
              onClick={onUpdateProgrameAddress}
            />
          ) : (
            <IonIcon
              className="cursor-pointer"
              name="create-outline"
              onClick={onFocusFieldProgramAddrr}
            />
          )}
        </div>
      </div>
      {/* File IDL name */}
      <div className="relative flex flex-nowrap justify-between gap-[6px] border border-solid border-[#B3B3B3] rounded-[8px] px-[16px] py-[10px] bg-[#0000000d] text-[16px]">
        <div className={`flex flex-row gap-2 ${clnTextColor}`}>
          <IonIcon name="document-attach-outline" />
          <Typography className="flex-auto">{idl?.name}</Typography>
        </div>
        <div className="cursor-pointer" onClick={remove}>
          <IonIcon name="trash-outline" />
        </div>
      </div>
    </div>
  )
}

export default ViewUploaded
