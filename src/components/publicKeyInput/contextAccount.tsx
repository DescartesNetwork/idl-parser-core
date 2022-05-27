import Button from '../button'
import Input from '../input'
import Empty from '../empty'

import { useParser } from '../../providers/parser.provider'

const ContextAccount = ({ onClick }: { onClick: (val: string) => void }) => {
  const {
    parser: { accountsMeta },
  } = useParser()

  return (
    <div>
      {!Object.keys(accountsMeta).length ? (
        <Empty />
      ) : (
        Object.keys(accountsMeta).map((key, idx) => {
          const val = accountsMeta?.[key].publicKey
          return (
            <div className="flex flex-col gap-2" key={idx}>
              <span>{key}</span>
              <Input value={val} onValue={() => {}} />
              <Button onClick={() => onClick(val)}>Select</Button>
            </div>
          )
        })
      )}
    </div>
  )
}

export default ContextAccount
