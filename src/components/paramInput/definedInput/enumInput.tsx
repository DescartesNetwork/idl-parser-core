import { IdlTypeDefTyEnum } from '@project-serum/anchor/dist/cjs/idl'

import Button from '../../../button'

const EnumInput = ({
  enumType,
  onChange,
}: {
  enumType: IdlTypeDefTyEnum
  onChange: (val: string) => void
}) => {
  return (
    <div>
      {enumType.variants?.map((variant) => {
        return (
          <div key={variant.name}>
            <div>
              <div>
                <input value={variant.name} />
              </div>
              <div>
                <Button onClick={() => onChange(variant.name)}>OK</Button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default EnumInput
