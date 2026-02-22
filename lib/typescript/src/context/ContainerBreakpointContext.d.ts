type ContainerBreakpointStore = {
    subscribe: (callback: () => void) => () => void;
    getSnapshot: () => string | undefined;
};
export declare const ContainerBreakpointContext: import("react").Context<ContainerBreakpointStore | null>;
export declare const useContainerBreakpointStore: () => {
    store: ContainerBreakpointStore;
    emit: (breakpoint: string | undefined) => void;
};
export declare const useContainerBreakpoint: () => string | undefined;
export {};
//# sourceMappingURL=ContainerBreakpointContext.d.ts.map