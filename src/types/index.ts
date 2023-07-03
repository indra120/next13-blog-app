import type { FC, ReactNode } from 'react'

export type Parent = FC<{ children: ReactNode }>
export type Layout = Parent
export type Actions = (data: FormData) => Promise<any>
