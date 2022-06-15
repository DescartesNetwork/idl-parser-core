import { useCallback, useState } from 'react'
import { Program } from '@project-serum/anchor'
import { PublicKey, Connection } from '@solana/web3.js'

import Button from '../components/button'
import ViewTxInstructions from './viewTxInstructions'

import { useParser } from '../providers/parser.provider'
import {
  convertStringDataToPubKey,
  getAnchorProvider,
  normalizeAnchorArgs,
} from '../helpers'

const GenerateInstruction = () => {
  const [loading, setLoading] = useState(false)
  const { parser, connection, setTxInstructions, txInstructions } = useParser()
  const {
    idl,
    programAddress,
    accountsMeta,
    argsMeta,
    instructionSelected,
    instructionIdl,
  } = parser || {}

  const getProgram = useCallback(() => {
    if (!idl || !programAddress || !connection) return
    const connect = new Connection(connection)
    const provider = getAnchorProvider(connect)
    return new Program(idl, programAddress, provider)
  }, [connection, idl, programAddress])

  const initInstructionNonArgs = useCallback(
    async (data: Record<string, PublicKey>) => {
      const program = getProgram()
      if (!program || !instructionSelected) return

      return await program.methods[instructionSelected]().accounts(data)
    },
    [getProgram, instructionSelected],
  )

  const initInstruction = useCallback(
    async (data: Record<string, PublicKey>) => {
      const program = getProgram()
      if (!program || !instructionSelected || !instructionIdl) return
      const args = argsMeta[instructionSelected]
      const nomalizedArgsMeta = normalizeAnchorArgs(args, instructionIdl)
      return await program.methods[instructionSelected](
        ...nomalizedArgsMeta,
      ).accounts(data)
    },
    [argsMeta, getProgram, instructionIdl, instructionSelected],
  )

  const onInit = async () => {
    try {
      setLoading(true)
      const accountsMetaPubkey = convertStringDataToPubKey(accountsMeta)

      let instruction = undefined
      if (!!instructionIdl?.args.length) {
        instruction = await initInstruction(accountsMetaPubkey)
      } else {
        instruction = await initInstructionNonArgs(accountsMetaPubkey)
      }
      const data = await instruction?.instruction()
      if (!data) return setTxInstructions()
      return setTxInstructions({ name: instructionSelected || '', data })
    } catch (err) {
      console.log(err, 'err')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-10">
      <Button onClick={onInit} block loading={loading} type="primary">
        Generate Instruction
      </Button>
      <ViewTxInstructions />
    </div>
  )
}

export default GenerateInstruction
