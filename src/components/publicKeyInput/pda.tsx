import { useCallback, useState } from 'react'
import { web3 } from '@project-serum/anchor'
import { account } from '@senswap/sen-js'

import PubicKeyInput from './index'
import { useParser } from '../../providers/parser.provider'

const Pda = ({ onChange }: { onChange: (val: string) => void }) => {
  const [seeds, setSeeds] = useState<string[]>([])
  const [pdaAddress, setPdaAddress] = useState('')
  const {
    parser: { programAddress },
  } = useParser()

  const onAdd = () => {
    const newSeed = [...seeds]
    newSeed.push('')
    setSeeds(newSeed)
  }

  const onChangeInput = async (idx: number, val: string) => {
    if (!account.isAddress(programAddress)) return
    const newSeed = [...seeds]
    newSeed[idx] = val
    setSeeds(newSeed)
  }

  const deriveNewPDAAddress = useCallback(async () => {
    if (!seeds.length) return setPdaAddress('')

    const [pdaAddress] = await web3.PublicKey.findProgramAddress(
      seeds.map((val) => {
        if (account.isAddress(val)) return new web3.PublicKey(val).toBuffer()
        return Buffer.from(val)
      }),
      new web3.PublicKey(programAddress || ''),
    )
    setPdaAddress(pdaAddress.toBase58())
  }, [programAddress, seeds])

  return (
    <div>
      <div>
        <button onClick={() => onAdd()}>Add</button>
      </div>

      {seeds.map((val, idx) => {
        return (
          <div>
            <PubicKeyInput
              value={val}
              name={'seed ' + (idx + 1)}
              onChange={(val) => onChangeInput(idx, val.publicKey)}
            />
          </div>
        )
      })}

      {pdaAddress && <div>PDA Address: {pdaAddress}</div>}
      <div>
        <button onClick={deriveNewPDAAddress} disabled={!seeds.length}>
          Fetch PDA
        </button>
      </div>
      <div>
        <button onClick={() => onChange(pdaAddress)} disabled={!pdaAddress}>
          Done
        </button>
      </div>
    </div>
  )
}

export default Pda
