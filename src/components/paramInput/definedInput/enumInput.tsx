import { IdlTypeDefTyEnum } from '@project-serum/anchor/dist/cjs/idl'

import Button from '../../button'
import Input from '../../input'

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
            <Input value={variant.name} onValue={() => {}} />
            <Button onClick={() => onChange(variant.name)} block>
              Done
            </Button>
          </div>
        )
      })}
    </div>
  )
}
export default EnumInput
