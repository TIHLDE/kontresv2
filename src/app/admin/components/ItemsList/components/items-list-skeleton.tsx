import { Skeleton } from '@/components/ui/skeleton';

const ItemsListSkeleton = () => {
    return (
        <div className="flex flex-col gap-5">
            <Skeleton className="w-40 h-8" />
            <Skeleton className="w-full h-40" />
        </div>
    );
};

export default ItemsListSkeleton;
