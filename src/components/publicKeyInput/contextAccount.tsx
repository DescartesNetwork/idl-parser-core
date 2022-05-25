import { Fragment } from 'react'

import Button from '../../button'

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
                <Button onClick={() => onClick(val)}>Select</Button>
              </div>
            </Fragment>
          )
        })
      )}
    </div>
  )
}

export default ContextAccount
