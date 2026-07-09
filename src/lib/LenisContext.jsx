import { createContext, useContext } from 'react'

export const LenisCtx = createContext(null)
export const useLenis = () => useContext(LenisCtx)
