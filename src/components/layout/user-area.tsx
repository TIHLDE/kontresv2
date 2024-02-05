import { UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { cn } from "@/utils/cn";
import { ModeToggle } from "../ui/theme-mode-toggler";

interface UserAreaProps extends React.HTMLProps<HTMLDivElement> {
    username: string;
    image: string;
}

export const UserArea = ({ username, image, className, ...props }: UserAreaProps) => {
    return (
        <div {...props} className={cn('flex items-center justify-center w-fit gap-1', className)}>
            <Button variant={"ghost"}>
                <Avatar>
                    <AvatarImage src={image} alt={"profilbilde"} />
                    <AvatarFallback><UserRound className="text-foreground" /></AvatarFallback>
                </Avatar>
            </Button>
            <ModeToggle />
        </div>
    )
}