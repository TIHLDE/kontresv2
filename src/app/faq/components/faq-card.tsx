import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfilePill } from "@/components/ui/profilepill";
import { User } from "@/types/User";
import { useRouter } from "next/router";

type FaqCardProps = {
    title: string;
    description: string;
    userImage: string;
    questionId: number;
}

export default function FaqCard({ description, title, userImage, questionId}: FaqCardProps) {
    const router = useRouter();
    function handleClick(){
        router.push(`/faq/${questionId}`);
    }

    return (
        <Card onClick={handleClick}>
            <CardHeader>
                <CardTitle>{ title }</CardTitle>
                <CardDescription>{ description }</CardDescription>
            </CardHeader>
            <CardContent>
                <Avatar >
                    <AvatarImage src={userImage} />
                </Avatar>
            </CardContent>

        </Card>    
        )
}