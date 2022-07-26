import { useMemo } from 'react'

import { useParser } from '../providers/parser.provider'

export const useProgramAddress = () => {
  const { programAddresses } = useParser()
  const {
    customer: customProgramAddr,
    idl: idlProgramAddr,
    provider: providerProgramAddr,
  } = programAddresses

  const systemProgramAddr = useMemo(
    () => customProgramAddr || idlProgramAddr || providerProgramAddr,
    [customProgramAddr, idlProgramAddr, providerProgramAddr],
  )

  return systemProgramAddr
}
