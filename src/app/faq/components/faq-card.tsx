import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookableItem } from "@prisma/client";

type FaqCardProps = {
    title: string;
    description: string;
    bookableItems: BookableItem[];
    author: string;
    group: string;
}

export default function FaqCard({ description, title,bookableItems, author, group}: FaqCardProps) {

    return (
        <Card className="w-100 h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-left">{title}</CardTitle>
            </CardHeader>   
            <CardContent className="flex flex-col gap-4 h-full">
                <a className="h-12 line-clamp-2">
                    {description}   
                </a>
                <span className="text-xs text-muted-foreground ">
                    {author}, {group}
                </span>
                <span className="mt-auto bottom-5 left-5">
                    {bookableItems.map((item) => (
                        <Badge key={item.itemId} className="m-1 ">
                                {item.name}
                        </Badge>
                    ))}
                </span> 
            </CardContent>
        </Card>
    );
}