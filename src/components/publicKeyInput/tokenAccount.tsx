import { useCallback, useEffect, useState } from 'react'
import { utils, web3 } from '@project-serum/anchor'
import { account } from '@senswap/sen-js'

import Button from '../button'
import PublicKeyInput from './index'

const TokenAccount = ({ onChange }: { onChange: (val: string) => void }) => {
  const [mint, setMint] = useState('')
  const [owner, setOwner] = useState('')
  const [tokenAccount, setTokenAccount] = useState('')

  const validConfirm = !!account.isAddress(mint) && !!account.isAddress(owner)

  const getTokenAccountAddress = useCallback(async () => {
    if (!validConfirm) return
    try {
      const mintPub = new web3.PublicKey(mint)
      const ownerPub = new web3.PublicKey(owner)
      const newTokenAccount = await utils.token.associatedAddress({
        mint: mintPub,
        owner: ownerPub,
      })
      setTokenAccount(newTokenAccount.toBase58())
    } catch (error) {
      setTokenAccount('')
    }
  }, [mint, owner, validConfirm])

  useEffect(() => {
    getTokenAccountAddress()
  }, [getTokenAccountAddress])

  return (
    <div className="flex flex-col gap-4">
      <PublicKeyInput
        name="Mint"
        value={mint}
        onChange={(e) => setMint(e.publicKey)}
      />
      <PublicKeyInput
        name="Owner"
        value={owner}
        onChange={(e) => setOwner(e.publicKey)}
      />
      {/* Token account generated  */}
      {tokenAccount && <div>Address: {tokenAccount}</div>}
      <Button
        onClick={() => onChange(tokenAccount)}
        disabled={!tokenAccount}
        block
      >
        Done
      </Button>
    </div>
  )
}

export default TokenAccount