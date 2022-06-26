import { ReactNode } from 'react'

export type WithChildren<T = {}> = T & { children?: ReactNode }

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any
