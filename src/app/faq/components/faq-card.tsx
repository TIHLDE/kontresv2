import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookableItem } from "@prisma/client";
import Link from "next/link"

type FaqCardProps = {
    title: string;
    description: string;
    bookableItems: BookableItem[];
    author: string;
    group: string;
}

export default async function FaqCard({ description, title,bookableItems, author, group}: FaqCardProps) {

    return (
        <div className="h-full overflow-hidden">
            <Card className="w-100 h-full">
                <CardHeader>
                    <CardTitle className="text-left">{title}</CardTitle>
                </CardHeader>   
                <CardContent>
                    {description}
                </CardContent>
                <CardContent className="text-xs text-muted-foreground">
                    {author}, {group}
                </CardContent>
                <CardContent>
                {bookableItems.map((item, index) => (
                    <Link key={index} href={`faq/${""}`}> 
                    <Badge key={index} className="m-1 ">
                            {item.name}
                    </Badge>
                    </Link>   
                ))}
                </CardContent>
            </Card>
        </div>
    );
}