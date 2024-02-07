import { UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { cn } from "@/utils/cn";
import { ModeToggle } from "../ui/theme-mode-toggler";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getUserData } from "@/utils/apis/TEMP";
import { cookies } from "next/headers";

interface UserAreaProps extends React.HTMLProps<HTMLDivElement> {
    username: string;
    image: string;
}

export const UserArea = ({ username, image, className, ...props }: UserAreaProps) => {
    const userData = getUserData();

    return (
        <div {...props} className={cn('flex items-center justify-center w-fit gap-1', className)}>
            <Popover>
                <PopoverTrigger>

                        <Avatar>
                            <AvatarImage src={image} alt={"profilbilde"} />
                            <AvatarFallback><UserRound className="text-foreground" /></AvatarFallback>
                        </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                    <h2>Hei, {  }</h2>
                </PopoverContent>
            </Popover>
            <ModeToggle />
        </div>
    )
}