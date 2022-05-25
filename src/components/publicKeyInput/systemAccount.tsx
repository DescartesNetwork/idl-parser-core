import { utils, web3 } from '@project-serum/anchor'

import Button from '../../button'

const SYSTEM_ACCOUNTS = [
  { name: 'systemProgram', value: web3.SystemProgram.programId },
  { name: 'rent', value: web3.SYSVAR_RENT_PUBKEY },
  { name: 'tokenProgram', value: utils.token.TOKEN_PROGRAM_ID },
  { name: 'associatedTokenProgram', value: utils.token.ASSOCIATED_PROGRAM_ID },
]

const SystemAccount = ({ onChange }: { onChange: (val: string) => void }) => {
  return (
    <div>
      {SYSTEM_ACCOUNTS.map((account, idx) => (
        <div key={idx}>
          <Button onClick={() => onChange(account.value.toBase58())}>
            {account.name}
          </Button>
        </div>
      ))}
      <div>
        <Button
          onClick={() =>
            onChange('BkLRcJucoTF9GnxQUa94fkqZdoL9LTWCoT5gF54zVsJk')
          }
        >
          Wallet Address
        </Button>
      </div>
    </div>
  )
}

export default SystemAccount
