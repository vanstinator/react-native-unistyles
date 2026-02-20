import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { View, type LayoutChangeEvent, type ViewStyle } from 'react-native'
import { ContainerQueryContext, type ContainerDimensions } from '../context/ContainerQueryContext'
import { UnistylesRuntime, UnistylesShadowRegistry } from '../specs'
import { ApplyContainerDimensions } from './ApplyContainerDimensions'

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

export const ContainerQuery: React.FunctionComponent<ContainerQueryProps> = ({ children, style }) => {
    const [dims, setDims] = useState<ContainerDimensions | null>(null)
    const previousContainerDims = useRef(
        // @ts-expect-error - this is hidden from TS
        UnistylesShadowRegistry.getContainerDimensions() as { width: number, height: number } | undefined
    )
    const breakpoints = (UnistylesRuntime.breakpoints ?? {}) as Record<string, number | undefined>

    const onLayout = useCallback((event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout
        const breakpoint = getBreakpointFromWidth(width, breakpoints)

        setDims({ width, height, breakpoint })
    }, [])

    useLayoutEffect(() => {
        // @ts-expect-error - this is hidden from TS
        UnistylesShadowRegistry.flush()
    })

    return (
        <View style={style} onLayout={onLayout} collapsable={false}>
            <ApplyContainerDimensions dimensions={dims ?? undefined} />
            <ContainerQueryContext.Provider value={dims}>
                {children}
            </ContainerQueryContext.Provider>
            <ApplyContainerDimensions dimensions={previousContainerDims.current} />
        </View>
    )
}
