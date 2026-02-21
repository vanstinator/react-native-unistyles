import React, { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { ViewStyle } from 'react-native'
import { ContainerQueryContext, type ContainerDimensions } from '../context/ContainerQueryContext'
import * as unistyles from '../web/services'

type ContainerQueryProps = React.PropsWithChildren<{
    style?: ViewStyle
}>

function getBreakpointFromWidth(width: number, breakpoints: Record<string, number | undefined>): string | undefined {
    const sorted = Object.entries(breakpoints)
        .filter((pair): pair is [string, number] => pair[1] !== undefined)
        .sort(([, a], [, b]) => a - b)

    if (sorted.length === 0) {
        return undefined
    }

    const idx = sorted.findIndex(([, value]) => width < value)

    if (idx <= 0) {
        return sorted[0]?.[0]
    }

    return sorted[idx - 1]![0]
}

const ApplyContainerName: React.FunctionComponent<{ name?: string }> = ({ name }) => {
    unistyles.services.shadowRegistry.setContainerName(name)
    return null
}

export const ContainerQuery: React.FunctionComponent<ContainerQueryProps> = ({ children, style }) => {
    const uniqueId = useId()
    const containerName = `uni-cq-${uniqueId.replace(/:/g, '')}`
    const containerRef = useRef<HTMLDivElement>(null)
    const [dims, setDims] = useState<ContainerDimensions | null>(null)
    const breakpoints = (unistyles.services.runtime.breakpoints ?? {}) as Record<string, number | undefined>
    const previousContainerName = unistyles.services.shadowRegistry.getContainerName()

    const updateDimensions = useCallback((width: number, height: number) => {
        const breakpoint = getBreakpointFromWidth(width, breakpoints)

        setDims({ width, height, breakpoint, containerName })
    }, [containerName])

    useEffect(() => {
        const element = containerRef.current

        if (!element) {
            return
        }

        const observer = new ResizeObserver(entries => {
            const entry = entries[0]

            if (!entry) {
                return
            }

            const { width, height } = entry.contentRect

            updateDimensions(width, height)
        })

        observer.observe(element)

        const { width, height } = element.getBoundingClientRect()

        updateDimensions(width, height)

        return () => observer.disconnect()
    }, [updateDimensions])

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        containerType: 'inline-size',
        containerName,
        ...(style as React.CSSProperties)
    }

    return (
        <div ref={containerRef} style={containerStyle}>
            <ApplyContainerName name={containerName} />
            <ContainerQueryContext.Provider value={dims}>
                {children}
            </ContainerQueryContext.Provider>
            <ApplyContainerName name={previousContainerName} />
        </div>
    )
}
