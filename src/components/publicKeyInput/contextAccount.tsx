import { Fragment } from 'react'
import { useParser } from '../../providers/parser.provider'

const ContextAccount = ({ onClick }: { onClick: (val: string) => void }) => {
  const {
    parser: { accountsMeta },
  } = useParser()

  return (
    <div>
      {!Object.keys(accountsMeta).length ? (
        <div>Empty</div>
      ) : (
        Object.keys(accountsMeta).map((key, idx) => {
          const val = accountsMeta?.[key].publicKey
          return (
            <Fragment key={idx}>
              <div>
                <span>{key}</span>
              </div>

              <div>
                <input value={val} />
              </div>
              <div>
                <button onClick={() => onClick(val)}>Select</button>
              </div>
            </Fragment>
          )
        })
      )}
    </div>
  )
}

export default ContextAccount
