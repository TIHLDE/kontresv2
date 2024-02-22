import { UserRound } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Card } from "./card"
import { cn } from "@/utils/cn";

interface ProfilePillProps extends Omit<React.HTMLProps<HTMLDivElement>, "ref"> {
    label?: string;
    image?: string;
}

const ProfilePill = ({ label, image, className, ...props }: ProfilePillProps) => {
    return (
        <Card {...props} className={cn("flex p-1 items-center gap-3", className)}>
            <Avatar className="rounded-lg">
                <AvatarImage
                    src={image}
                    alt="profilbilde"
                />
                <AvatarFallback>
                    <UserRound className="text-foreground" />
                </AvatarFallback>
            </Avatar>
            <span>{label}</span>
        </Card>
    )
}

export default ProfilePill;