import { IdlTypeDefTyEnum } from '@project-serum/anchor/dist/cjs/idl'

import Select from '../../select'

const EnumInput = ({
  enumType,
  onChange,
}: {
  enumType: IdlTypeDefTyEnum
  onChange: (val: string) => void
}) => {
  return (
    <Select onValue={onChange} className="w-full p-[8px]">
      {enumType.variants?.map((variant, idx) => {
        return (
          <option value={variant.name} key={variant.name + idx}>
            {variant.name}
          </option>
        )
      })}
    </Select>
  )
}
export default EnumInput
