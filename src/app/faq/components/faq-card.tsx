import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type FaqCardProps = {
    title: string;
    description: string;
    userImage: string;
    questionId: number;
}

export default function FaqCard({ description, title, userImage, questionId}: FaqCardProps) {

    return (
        <Card> 
            <Link href={`faq/${questionId}`}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{ description }</CardDescription>
            </CardHeader>
            <CardContent>
                <Avatar >
                    <AvatarImage src={userImage} />
                </Avatar>
            </CardContent>
            </Link>
        </Card>   
        )
}