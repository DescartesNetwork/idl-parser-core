import { useState } from 'react'
import { Button } from '../components/ui'

import { convertStringDataToPubKey } from '../helpers'
import { useArgs } from '../hooks/useArgs'
import { useProgram } from '../hooks/useProgram'
import { useRemainingAccounts } from '../hooks/useRemainingAccounts'
import { useParser } from '../providers/parser.provider'

const GenerateInstructionAction = () => {
  const [loading, setLoading] = useState(false)
  const { parser, setTxInstructions } = useParser()
  const { accountsMetas: accountsMeta, ixSelected } = parser
  const program = useProgram()
  const args = useArgs(ixSelected)
  const remainingAccounts = useRemainingAccounts(ixSelected)

  const onInit = async () => {
    try {
      setLoading(true)
      const accountsMetaPubkey = convertStringDataToPubKey(accountsMeta)
      const instruction = await program.methods[ixSelected]
        .call(this, ...args)
        .accounts(accountsMetaPubkey)
        .remainingAccounts(remainingAccounts)
        .instruction()

      return setTxInstructions({ name: ixSelected, data: instruction })
    } catch (err) {
      console.log(err)
      return setTxInstructions()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={onInit} loading={loading} type="primary" block>
      Generate Instruction
    </Button>
  )
}

export default GenerateInstructionAction
