import { useState } from 'react'
import PublicKeyInput from '../components/publicKeyInput'
import { useParser } from '../providers/parser.provider'

const InstructorAccounts = () => {
  const {
    parser: { accountsMeta, instructionIdl },
    setAccountsMeta,
  } = useParser()

  if (!instructionIdl?.accounts.length) return <div>Emtpy</div>
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

const InstructorArguments = () => {
  const {
    parser: { instructionIdl, argsMeta },
    setArgsMeta,
  } = useParser()

  if (!instructionIdl?.args.length) return <div>Empty</div>

  return (
    <div>
      {instructionIdl.args.map((arg, idx) => (
        <div key={idx}>
          <span>{arg.name}</span>
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
  const [selected, setSelected] = useState<InstrucSegmentedType>('accounts')
  const {
    parser: { idl },
  } = useParser()

  if (!idl) return <div>EMpty</div>

  return (
    <div>
      <div className="tabs">
        {TAB_INSTRUCS.map((tab, idx) => (
          <div
            key={idx}
            onClick={() => setSelected(tab as InstrucSegmentedType)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div>{INSTRUCTIONS[selected]}</div>
    </div>
  )
}

export default InstrctionView
