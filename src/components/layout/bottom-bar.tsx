import { cn } from "@/lib/utils";

interface BottomBarProps extends React.HTMLProps<HTMLDivElement> {
    userName?: string;
}

const BottomBar = ({ userName, className, ...props }: BottomBarProps) => {
    return (
        <div className={cn(className, "bg-current w-full flex gap-3")}>
            <p>s</p>
            <p>s</p>
            <p>s</p>
            <p>s</p>
        </div>
    )
}

export default BottomBar;