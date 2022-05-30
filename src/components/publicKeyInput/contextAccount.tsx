import Button from '../button'
import Input from '../input'
import Empty from '../empty'
import Typography from '../typography'

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
        <div className="grid grid-cols-1 gap-4">
          {Object.keys(accountsMeta).map((key, idx) => {
            const val = accountsMeta?.[key].publicKey
            return (
              <div className="grid grid-cols-1 gap-1" key={idx}>
                <Typography secondary>{key}</Typography>
                <div className="flex flex-row gap-4">
                  <Input className="flex-auto" value={val} onValue={() => {}} />
                  <Button onClick={() => onClick(val)}>Select</Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ContextAccount
