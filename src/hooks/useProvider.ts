import { useMemo } from 'react'
import { AnchorProvider, web3 } from '@project-serum/anchor'
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet'

import { useParser } from '../providers/parser.provider'

export const useProvider = () => {
  const connection = useParser().connection

  const wallet = useMemo(() => {
    const keyPair = web3.Keypair.generate()
    return new NodeWallet(keyPair)
  }, [])

  return useMemo(
    () =>
      new AnchorProvider(new web3.Connection(connection), wallet, {
        commitment: 'confirmed',
        skipPreflight: true,
      }),
    [connection, wallet],
  )
}
