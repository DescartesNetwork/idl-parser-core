import { useCallback, useEffect, useState } from 'react'
import { Program, web3 } from '@project-serum/anchor'

import Button from '../button'

import { useParser } from '../../providers/parser.provider'
import Select from '../select'
import Input from '../input'

const IdlAccount = ({ onChange }: { onChange: (val: string) => void }) => {
  const [address, setAddress] = useState('')
  const [accountType, setAccountType] = useState('')
  const [accountsViewer, setAccountsViewer] = useState<
    Record<string, string[]>
  >({})
  const {
    parser: { idl, programAddress },
  } = useParser()

  const getProgram = useCallback(() => {
    if (!idl || !programAddress) return
    const provider = undefined
    const program = new Program(idl, programAddress, provider)
    return program
  }, [idl, programAddress])

  const onFetchAccountData = useCallback(async () => {
    try {
      const program = getProgram()
      if (!program || !accountType || !address) return
      const accountPublicKey = new web3.PublicKey(address)

      const accountData = await program.account[
        accountType.toLowerCase()
      ].fetch(accountPublicKey)

      const newIdlAccountData: Record<string, string[]> = {}
      for (const key in accountData) {
        newIdlAccountData[key] = []
        // Parse publicKey
        try {
          const keyData: any = accountData[key]
          if (Array.isArray(keyData)) {
            for (const elm of keyData) {
              const pub = new web3.PublicKey(elm.toString())
              newIdlAccountData[key].push(pub.toBase58())
            }
          } else {
            const pub = new web3.PublicKey(keyData.toString())
            newIdlAccountData[key].push(pub.toBase58())
          }
        } catch (error) {
          /* Ignore */
        }
      }
      setAccountsViewer(newIdlAccountData)
    } catch (error) {
      console.log(error)
    }
  }, [accountType, address, getProgram])

  useEffect(() => {
    onFetchAccountData()
  }, [onFetchAccountData])

  useEffect(() => {
    const fistAccount = idl?.accounts?.[0]?.name || ''
    if (fistAccount && !accountType) setAccountType(fistAccount)
  }, [accountType, idl?.accounts])

  return (
    <div className="flex flex-col gap-3">
      <Select
        value={accountType}
        style={{ minWidth: 120, minHeight: 32 }}
        onValue={() => {}}
      >
        {idl?.accounts?.map((acc, idx) => {
          return (
            <option value={acc.name} key={idx}>
              {acc.name}
            </option>
          )
        })}
      </Select>
      <div>
        <span>Address</span>
        <Input value={address} onValue={setAddress} />
      </div>

      {Object.keys(accountsViewer).map((key) => {
        if (!accountsViewer[key].length) return null
        return (
          <div key={key}>
            {accountsViewer[key].map((val) => (
              <div>
                <Input value={val} onValue={() => {}} />
                <Button onClick={() => onChange(val)}>Select</Button>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default IdlAccount
