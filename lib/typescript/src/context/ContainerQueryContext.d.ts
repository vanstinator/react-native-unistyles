export type ContainerDimensions = {
    width: number;
    height: number;
    breakpoint: string | undefined;
    containerName?: string;
};
export declare const ContainerQueryContext: import("react").Context<ContainerDimensions | null>;
export declare const useContainerDimensions: () => ContainerDimensions | null;
//# sourceMappingURL=ContainerQueryContext.d.ts.map