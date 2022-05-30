import { Idl, AnchorProvider, web3 } from '@project-serum/anchor'
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet'
import { Connection } from '@solana/web3.js'
export class IdlParser {
  static getProgramAddress(IdlData: Idl) {
    if (!IdlData.metadata || !IdlData.metadata.address) return ''
    return IdlData.metadata.address
  }
  static getTypeOfParam(type: any): string {
    if (typeof type === 'string') return type

    if (type?.['defined']) return type['defined']
    if (type?.['option']) return IdlParser.getTypeOfParam(type['option'])
    if (type?.['vec']) return `${IdlParser.getTypeOfParam(type['vec'])} []`
    if (type?.['array']) {
      if (Array.isArray(type?.['array']))
        return `${type?.['array'][0]} [${type?.['array'][1]}]`
      return `${IdlParser.getTypeOfParam(type['array'])} []`
    }
    return '-'
  }
}

export const getAnchorProvider = (connection: Connection) => {
  const keyPair = web3.Keypair.generate()
  const wallet = new NodeWallet(keyPair)
  return new AnchorProvider(connection, wallet, {
    commitment: 'confirmed',
    skipPreflight: true,
  })
}
