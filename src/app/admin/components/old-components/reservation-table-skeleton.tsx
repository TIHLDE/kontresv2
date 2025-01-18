import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';

const ReservationTableSkeleton = ({
    className,
    ...props
}: React.HTMLProps<HTMLDivElement>) => {
    return (
        <div {...props} className={cn('flex flex-col gap-5', className)}>
            <Skeleton className="w-40 h-8" />
            <Skeleton className="w-80 h-8" />
            <Skeleton className="w-full h-40" />
        </div>
    );
};

export default ReservationTableSkeleton;
