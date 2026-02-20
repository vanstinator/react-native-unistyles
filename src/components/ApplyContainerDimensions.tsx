import { useLayoutEffect } from 'react'
import { UnistylesShadowRegistry } from '../specs'

type ApplyContainerDimensionsProps = {
    dimensions?: { width: number, height: number }
}

export const ApplyContainerDimensions: React.FunctionComponent<ApplyContainerDimensionsProps> = ({ dimensions }) => {
    // @ts-expect-error - this is hidden from TS
    UnistylesShadowRegistry.setContainerDimensions(dimensions)

    useLayoutEffect(() => {
        // @ts-expect-error - this is hidden from TS
        UnistylesShadowRegistry.setContainerDimensions(dimensions)
    })

    return null
}
