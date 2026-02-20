import { isPseudoClass } from '../convert/pseudo'
import { getContainerQuery, getMediaQuery } from '../utils'
import type { CSSState } from './state'

export const convertToCSS = (hash: string, value: Record<string, any>, state: CSSState, containerName?: string) => {
    Object.entries(value).forEach(([styleKey, styleValue]) => {
        if (styleKey[0] === '_') {
            const isStylePseudoClass = isPseudoClass(styleKey)
            const pseudoClassName = `${hash}${isStylePseudoClass ? ':' : '::'}${styleKey.slice(1)}`

            Object.entries(styleValue).forEach(([pseudoStyleKey, pseudoStyleValue]) => {
                if (typeof pseudoStyleValue === 'object' && pseudoStyleValue !== null) {
                    const allBreakpoints = Object.keys(styleValue)
                    Object.entries(pseudoStyleValue).forEach(([breakpointStyleKey, breakpointStyleValue]) => {
                        const mediaQuery = getMediaQuery(pseudoStyleKey, allBreakpoints)

                        state.set({
                            mediaQuery,
                            className: pseudoClassName,
                            propertyKey: breakpointStyleKey,
                            value: breakpointStyleValue,
                        })

                        if (containerName) {
                            const cq = getContainerQuery(pseudoStyleKey, allBreakpoints, containerName)

                            state.set({
                                mediaQuery: cq,
                                className: pseudoClassName,
                                propertyKey: breakpointStyleKey,
                                value: breakpointStyleValue,
                                isMq: true,
                            })
                        }
                    })

                    return
                }

                state.set({
                    className: pseudoClassName,
                    propertyKey: pseudoStyleKey,
                    value: pseudoStyleValue,
                })
            })

            return
        }

        if (typeof styleValue === 'object') {
            Object.entries(styleValue).forEach(([breakpointStyleKey, breakpointStyleValue]) => {
                const allBreakpoints = Object.entries(value)
                    .filter(([_, value]) => {
                        if (typeof value !== 'object' || value === null) {
                            return false
                        }

                        return breakpointStyleKey in value
                    })
                    .map(([key]) => key)
                const mediaQuery = getMediaQuery(styleKey, allBreakpoints)

                state.set({
                    mediaQuery,
                    className: hash,
                    propertyKey: breakpointStyleKey,
                    value: breakpointStyleValue,
                })

                if (containerName) {
                    const cq = getContainerQuery(styleKey, allBreakpoints, containerName)

                    state.set({
                        mediaQuery: cq,
                        className: hash,
                        propertyKey: breakpointStyleKey,
                        value: breakpointStyleValue,
                        isMq: true,
                    })
                }
            })

            return
        }

        state.set({
            className: hash,
            propertyKey: styleKey,
            value: styleValue,
        })
    })
}
