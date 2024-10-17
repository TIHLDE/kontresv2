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

    const descriptionLength = 36;

    return (
        <div className="h-full overflow-hidden">
            <Card className="w-100 h-full">
                <CardHeader>
                    <CardTitle className="text-left">{title}</CardTitle>
                </CardHeader>   
                <CardContent>
                    {description.length > descriptionLength 
                    ? <>{description.slice(0,descriptionLength)} ...</>
                    :<> {description} </>}
                </CardContent>
                <CardContent className="text-xs text-muted-foreground">
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