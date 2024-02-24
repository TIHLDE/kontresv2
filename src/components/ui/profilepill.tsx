import { ArrowUpLeftFromCircle, HandMetal, MailIcon, UserRound, Wrench } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Card } from "./card"
import { cn } from "@/utils/cn";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { User } from "@/types/User";
import Link from "next/link";

interface ProfilePillProps extends Omit<React.HTMLProps<HTMLDivElement>, "ref"> {
    label?: string;
    image?: string;
}

interface UserProfilePillProps extends React.HTMLProps<HTMLDivElement> {
    user?: User;
}

const genderMap: { [key: number]: string } = {
    1: "Mann",
    2: "Kvinne",
    3: "Annet",
}

const UserProfilePill = ({ user, ...props }: UserProfilePillProps) => {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <ProfileButton  {...props} label={user?.first_name} image={user?.image} />
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                    <Avatar>
                        <AvatarImage src={user?.image} alt={"Profilbilde"} className="rounded-lg" />
                        <AvatarFallback><UserRound className="text-foreground" /></AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 w-full [&_svg]:mr-2 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:opacity-70">
                        <h4 className="text-sm font-semibold">{user?.first_name + " " + user?.last_name}</h4>
                        <Link className="hover:underline text-muted-foreground" href={`https://tihlde.org/profil/${user?.user_id}/`}>@{user?.user_id}</Link>
                        <BioSection className="pt-2" items={[
                            { icon: <MailIcon />, label: <Link className="hover:underline" href={`mailto:${user?.email}`}>{user?.email}</Link> },
                            { icon: <ArrowUpLeftFromCircle />, label: genderMap[user?.gender ?? 2] },
                            ...user?.tool ? [{ icon: <Wrench />, label: (user?.tool ?? 'Ikke oppgitt') }] : [],
                        ]} />
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

interface BioSectionProps extends React.HTMLProps<HTMLDivElement> {
    items?: { icon: React.ReactNode, label: React.ReactNode }[];
}

const BioSection = ({ items, className, ...props }: BioSectionProps) => {
    return (
        <div className={cn("flex flex-col space-y-1", className)}>
            {items?.map((item, index) => (
                <div key={index} className="flex items-center">
                    {item.icon}
                    <p className="text-sm">{item.label}</p>
                </div>
            ))}
        </div>
    )
}

const ProfileButton = ({ label, image, className, ...props }: ProfilePillProps) => {
    return (

        <Card {...props} className={cn("flex p-1 pr-3 items-center gap-3 cursor-pointer", className)}>
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

export default UserProfilePill;