export type RunType = ({ ref }: RunProps) => void;
export interface RunProps {
    ref: React.RefObject<HTMLElement>;
}

type AnimationHookReturnType = {
    run: RunType;
}

export type AnimationHookType = () => AnimationHookReturnType;