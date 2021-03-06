import { useCallback, useEffect, useState } from 'react'
import { web3 } from '@project-serum/anchor'

import IonIcon from '@sentre/antd-ionicon'

import { KeypairMeta, useParser } from '../../providers/parser.provider'
import { useProgram } from '../../hooks/useProgram'
import { Empty, Input, Select, Typography, Button } from '../ui'
import { Spinner } from '../ui/button'
import Selection, { DUMMY_OPTION_VALUE } from '../ui/selection'

const Cache: { [x: string]: any } = {}

const IdlAccount = ({ onChange }: { onChange: (val: KeypairMeta) => void }) => {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [accountType, setAccountType] = useState('')
  const [accountsViewer, setAccountsViewer] = useState<
    Record<string, string[]>
  >({})
  const { parser } = useParser()
  const { idl } = parser || {}
  const program = useProgram()

  const onFetchAccountData = useCallback(async () => {
    try {
      setLoading(true)
      if (!program || !accountType || !address) return
      const accountPublicKey = new web3.PublicKey(address)

      const key = `${accountType.toLowerCase()}:${accountPublicKey.toBase58()}`

      if (Cache[key]) {
        var accountData = await Cache[key]
      } else {
        Cache[key] =
          program.account[accountType.toLowerCase()].fetch(accountPublicKey)
        accountData = await Cache[key]
      }

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
      setAccountsViewer({})
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [accountType, address, program])

  useEffect(() => {
    onFetchAccountData()
  }, [onFetchAccountData])

  useEffect(() => {
    const fistAccount = idl?.accounts?.[0]?.name || ''
    if (fistAccount && !accountType) setAccountType(fistAccount)
  }, [accountType, idl?.accounts])

  const options = idl?.accounts?.map(({ name }) => {
    return { label: name, value: name }
  }) || [DUMMY_OPTION_VALUE]

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-1">
        <Typography secondary>{accountType} address</Typography>
        <div className="flex flex-row gap-4">
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            bordered={false}
            preffix={loading ? <Spinner /> : <IonIcon name="search-outline" />}
            className="flex-auto stroke-slate-500"
          />
          <Selection
            options={options}
            selected={accountType}
            onSelected={setAccountType}
            style={{ maxWidth: 180 }}
          />
        </div>
      </div>

      <div className="grid gird-cols-1 gap-4 p-[24px] bg-stone-100">
        {!!Object.keys(accountsViewer).length ? (
          Object.keys(accountsViewer).map((key, idx) => {
            if (!accountsViewer[key].length) return null
            return (
              <div className="grid gird-cols-1 gap-1" key={idx}>
                <Typography secondary>{key}</Typography>
                <div className="grid gird-cols-1 gap-2">
                  {accountsViewer[key].map((val, jdx) => (
                    <div className="flex flex-row gap-4" key={jdx}>
                      <Input
                        className="flex-auto"
                        value={val}
                        bordered={false}
                        // Do nothing
                        onChange={() => {}}
                      />
                      <Button
                        type="text"
                        className="font-bold"
                        onClick={() => onChange({ publicKey: val })}
                      >
                        Select
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })
        ) : (
          <Empty />
        )}
      </div>
    </div>
  )
}

export default IdlAccount
