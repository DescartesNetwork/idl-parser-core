import { useState } from 'react'

import ParamInput from '../components/paramInput'
import PublicKeyInput from '../components/publicKeyInput'
import Segmented from '../segmented'
import Empty from '../empty'

import { useParser } from '../providers/parser.provider'

export const InstructorAccounts = () => {
  const {
    parser: { accountsMeta, instructionIdl },
    setAccountsMeta,
  } = useParser()

  if (!instructionIdl?.accounts.length) return <Empty />
  return (
    <div>
      {instructionIdl.accounts.map((account, idx) => (
        <div key={idx}>
          <PublicKeyInput
            onChange={(accData) =>
              setAccountsMeta({ name: account.name, data: accData })
            }
            name={account.name}
            value={accountsMeta[account.name]?.publicKey}
          />
        </div>
      ))}
    </div>
  )
}

export const InstructorArguments = () => {
  const {
    parser: { instructionIdl, argsMeta },
    setArgsMeta,
  } = useParser()

  if (!instructionIdl?.args.length) return <Empty />

  return (
    <div>
      {instructionIdl.args.map(({ name, type }, idx) => (
        <div key={idx}>
          <ParamInput
            idlType={type}
            onChange={(val) => setArgsMeta({ name, val })}
            name={name}
            value={argsMeta[name]}
          />
        </div>
      ))}
    </div>
  )
}
type InstrucSegmentedType = 'accounts' | 'arguments'

const INSTRUCTIONS = {
  accounts: <InstructorAccounts />,
  arguments: <InstructorArguments />,
}

const TAB_INSTRUCS = ['accounts', 'arguments']

const InstrctionView = () => {
  const [selected, setSelected] = useState('accounts')
  const {
    parser: { idl },
  } = useParser()

  if (!idl) return <Empty />
  return (
    <div className="grid gird-cols-12">
      <div>
        <Segmented
          value={selected}
          options={TAB_INSTRUCS}
          onChange={setSelected}
        />
      </div>
      <div>{INSTRUCTIONS[selected as InstrucSegmentedType]}</div>
    </div>
  )
}

export default InstrctionView
