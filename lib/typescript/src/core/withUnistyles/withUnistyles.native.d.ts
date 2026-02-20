import React, { type ComponentProps } from 'react';
import type { Mappings } from './types';
type GenericComponentProps<P> = ComponentProps<P>;
export declare const withUnistyles: <TComponent, TMappings extends GenericComponentProps<TComponent>>(Component: TComponent, mappings?: Mappings<TMappings>) => React.ForwardRefExoticComponent<React.PropsWithoutRef<Partial<React.ComponentProps<TComponent>> & {
    uniProps?: Mappings<React.ComponentProps<TComponent>>;
}> & React.RefAttributes<React.ComponentRef<TComponent>>>;
export {};
//# sourceMappingURL=withUnistyles.native.d.ts.map