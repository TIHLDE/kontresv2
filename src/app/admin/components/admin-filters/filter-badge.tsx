import { Badge, BadgeProps } from '@/components/ui/badge';

interface FilterBadeProps extends BadgeProps {
    label: string;
    icon: React.ReactNode;
    parent: string;
}
export default function FilterBadge({
    label,
    icon,
    parent,
    ...props
}: FilterBadeProps) {
    return (
        <Badge className="rounded-md gap-1 items-center" variant={'outline'}>
            {icon}
            {label}
        </Badge>
    );
}
