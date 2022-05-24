import { IdlTypeDefTyEnum } from '@project-serum/anchor/dist/cjs/idl'

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
                <button onClick={() => onChange(variant.name)}>OK</button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default EnumInput
