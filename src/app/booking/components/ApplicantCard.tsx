import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { UserRound } from "lucide-react"

interface ApplicantCardProps {
    label?: string;
    image?: string;
}

/**
 * Used for displaying the "Sender inn forespørsel som" card at the bottom of the reservation form.
 */
const ApplicantCard = ({ label, image }: ApplicantCardProps) => {
    return (
        <div className="mt-10">
            <p className="w-full text-center">Sender inn forespørsel som</p>
            <Card className="p-2 w-fit mx-auto">
                <div className="flex gap-5 items-center">
                    <Avatar className="rounded-lg">
                        <AvatarImage src={image} alt="Profililde" />
                        <AvatarFallback><UserRound className="text-foreground" /></AvatarFallback>
                    </Avatar>
                    <h2>{label}</h2>
                </div>
            </Card>
        </div>
    )
}

export default ApplicantCard;