import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type FaqCardProps = {
    title: string;
    description: string;
    userImage: string;
}

export default function FaqCard({ description, title, userImage}: FaqCardProps) {

    return (
        <Card className="h-full"> 
            <CardHeader>
                <CardTitle>{title}</CardTitle>
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