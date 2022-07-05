import { useState, useEffect, Fragment } from 'react'
import { web3 } from '@project-serum/anchor'

import IonIcon from '@sentre/antd-ionicon'
import SystemAccount from './systemAccount'
import RecentAccount from './recentAccount'
import IdlAccount from './idlAccount'
import TokenAccount from './tokenAccount'
import Pda from './pda'
import { Button, Input, Modal, Select, Typography } from '../ui'

import { AddressCategory } from '../../types'
import { KeypairMeta, useParser } from '../../providers/parser.provider'
import { useSuggestAccountCategory } from '../../hooks/useSuggestAccountCategory'

export const SELECT_SYSTEM = [
  AddressCategory.walletAddress,
  AddressCategory.newKeypair,
  AddressCategory.idl,
  AddressCategory.token,
  AddressCategory.pda,
  AddressCategory.recent,
  AddressCategory.system,
]

type ModalViewProps = {
  inputType: string
  onChange: (val: KeypairMeta) => void
}

const ModalView = ({ inputType, onChange }: ModalViewProps) => {
  switch (inputType) {
    case AddressCategory.recent:
      return <RecentAccount onChange={onChange} />
    case AddressCategory.idl:
      return <IdlAccount onChange={onChange} />
    case AddressCategory.system:
      return <SystemAccount onChange={onChange} />
    case AddressCategory.token:
      return <TokenAccount onChange={onChange} />
    default:
      return <Pda onChange={onChange} />
  }
}

type PubicKeyInputProps = {
  accountName: string
  value: string
  placeholder?: string
  onChange: (value: KeypairMeta) => void
  onRemove?: () => void
}

const PublicKeyInput = ({
  accountName,
  value,
  placeholder = '',
  onChange,
  onRemove,
}: PubicKeyInputProps) => {
  const [visible, setVisible] = useState(false)
  const [category, setCategory] = useState<AddressCategory>()
  const { findDefaultCategory } = useSuggestAccountCategory()
  const { walletAddress } = useParser()

  // Select default category
  useEffect(() => {
    if (!category) {
      const defaultCategory = findDefaultCategory(accountName)
      setCategory(defaultCategory)
    }
  }, [category, findDefaultCategory, accountName])

  const onChangePublicKey = (keypair: KeypairMeta) => {
    onChange(keypair)
    setVisible(false)
  }

  const onSelectCategory = (category: AddressCategory) => {
    setCategory(category)
    switch (category) {
      case AddressCategory.walletAddress:
        return onChange({ publicKey: walletAddress || '' })
      case AddressCategory.newKeypair:
        const newKeyPair = web3.Keypair.generate()
        return onChange({
          publicKey: newKeyPair.publicKey.toBase58(),
          privateKey: Buffer.from(newKeyPair.secretKey).toString('hex'),
        })
    }
    setVisible(true)
  }

  if (!category) return <Fragment />

  return (
    <div className="flex flex-col gap-[6px]">
      <Typography className="capitalize text-gray-600">
        {accountName}
      </Typography>
      <div className="flex flex-nowrap gap-[16px]">
        <Input
          className="flex-auto"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChangePublicKey({ publicKey: e.target.value })}
          bordered={false}
          suffix={
            <Button type="text" onClick={() => setVisible(true)} disabled>
              <Typography level={5}>auto</Typography>
            </Button>
          }
        />
        <Select
          style={{ minWidth: 120 }}
          value={category}
          onChange={(e) => onSelectCategory(e.target.value as AddressCategory)}
        >
          {SELECT_SYSTEM.map((item, idx) => (
            <option
              style={{ textTransform: 'capitalize' }}
              value={item}
              key={idx}
            >
              {item}
            </option>
          ))}
        </Select>
        {onRemove && (
          <Button
            type="text"
            onClick={onRemove}
            suffix={<IonIcon name="trash-outline" />}
          />
        )}
      </div>
      {/* Advanced input */}
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        closeIcon={<IonIcon name="close-outline" />}
      >
        <div className="flex flex-col gap-10">
          <Typography level={5} className="capitalize font-bold">
            {accountName}
          </Typography>
          <ModalView inputType={category} onChange={onChangePublicKey} />
        </div>
      </Modal>
    </div>
  )
}

export default PublicKeyInput
