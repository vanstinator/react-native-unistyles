import { createContext, useContext } from 'react'

export type ContainerDimensions = {
    width: number
    height: number
    breakpoint: string | undefined
    containerName?: string
}

export const ContainerQueryContext = createContext<ContainerDimensions | null>(null)

export const useContainerDimensions = () => useContext(ContainerQueryContext)
