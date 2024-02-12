"use client"

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserRound } from "lucide-react";
import { User } from "@/types/User";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Button } from "../ui/button";
import { useState } from "react";
import { signOutUser } from "@/utils/apis/user";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react"
import { MobileModeToggle, ModeToggle } from "../ui/theme-mode-toggler";

interface BottomBarProps extends React.HTMLProps<HTMLDivElement> {
    user?: User;
}

const BottomBar = ({ user, className, ...props }: BottomBarProps) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const router = useRouter();

    const signOut = () => {
        setProfileOpen(false);
        signOutUser();
        router.refresh();
    }

    return (
        <div className={cn(className, "w-full gap-5 bg-background border border-border py-4 place-content-center flex")}>
            <Button variant={"ghost"} onClick={() => { setProfileOpen(!profileOpen) }} className="px-0">
                <Avatar>
                    <AvatarImage src={user?.image} alt="Profililde" />
                    <AvatarFallback><UserRound className="text-foreground" /></AvatarFallback>
                </Avatar>
            </Button>

            <Button><PlusIcon /></Button>

            <MobileModeToggle variant={"ghost"} />

            <Drawer open={profileOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Hei, {user?.first_name}!</DrawerTitle>
                    </DrawerHeader>

                    <div className="flex flex-col gap-2 p-4">
                        <Button variant={"outline"}>Min profil</Button>
                        <Button variant={"destructive"} onClick={signOut}>Logg ut</Button>
                    </div>
                    <DrawerFooter>
                        <DrawerClose>
                            <Button className="w-full" onClick={() => { setProfileOpen(false) }}>Lukk</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default BottomBar;