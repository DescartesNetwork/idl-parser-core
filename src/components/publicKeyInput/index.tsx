import { useState } from 'react'
import { web3 } from '@project-serum/anchor'

import SystemAccount from './systemAccount'
import ContextAccount from './contextAccount'
import IdlAccount from './idlAccount'
import TokenAccount from './tokenAccount'
import Pda from './pda'
import Modal from '../../modal'

import { ParserSystemOptions } from '../../constants'
import { AccountsMeta } from '../../providers/parser.provider'

type PubicKeyInputProps = {
  name: string
  value: string
  onChange: (value: AccountsMeta) => void
  size?: number
  placeholder?: string
  bordered?: boolean
}
type ModalViewProps = {
  selected: string
  onChange: (val: string) => void
}

export const SELECT_SYSTEM = [
  ParserSystemOptions.context,
  ParserSystemOptions.idl,
  ParserSystemOptions.pda,
  ParserSystemOptions.system,
  ParserSystemOptions.token,
]

const ModalView = ({ selected, onChange }: ModalViewProps) => {
  switch (true) {
    case selected === ParserSystemOptions.context:
      return <ContextAccount onClick={onChange} />
    case selected === ParserSystemOptions.idl:
      return <IdlAccount onChange={onChange} />
    case selected === ParserSystemOptions.system:
      return <SystemAccount onChange={onChange} />
    case selected === ParserSystemOptions.token:
      return <TokenAccount onChange={onChange} />
    default:
      return <Pda onChange={onChange} />
  }
}

const PublicKeyInput = ({
  name,
  value,
  onChange,
  placeholder = 'Input or select your types',
}: PubicKeyInputProps) => {
  const [visible, setVisible] = useState(false)
  const [systemSelected, setSystemSelected] = useState(
    ParserSystemOptions.system,
  )

  const onChangePublicKey = (address: string) => {
    onChange({ publicKey: address, privateKey: '' })
    setVisible(false)
  }

  const onNewKeypair = () => {
    const newKeypair = web3.Keypair.generate()
    onChange({
      publicKey: newKeypair.publicKey.toBase58(),
      privateKey: Buffer.from(newKeypair.secretKey).toString('hex'),
    })
    setVisible(false)
  }

  return (
    <div>
      <div>
        <span style={{ textTransform: 'capitalize' }}>{name}</span>
      </div>
      <div>
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChangePublicKey(e.target.value)}
        />
        <span
          style={{ fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => setVisible(true)}
        >
          Init
        </span>
      </div>
      <div>
        <select
          style={{ textTransform: 'capitalize', minWidth: 120 }}
          defaultValue={ParserSystemOptions.system}
          onChange={(e) => setSystemSelected(e.target.value)}
        >
          {SELECT_SYSTEM.map((item, idx) => (
            <option
              style={{ textTransform: 'capitalize' }}
              value={item}
              key={idx}
            >
              {item}
            </option>
          ))}
        </select>
      </div>
      {/* Advanced input */}
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <h5>{name}</h5>
        <ModalView selected={systemSelected} onChange={onChangePublicKey} />
      </Modal>
    </div>
  )
}

export default PublicKeyInput
