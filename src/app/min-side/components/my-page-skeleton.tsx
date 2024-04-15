import { Skeleton } from '@/components/ui/skeleton';

const MyPageSkeleton = () => {
    return (
        <div className="flex flex-col gap-5">
            <Skeleton className="w-full h-48" />
            <Skeleton className="w-40 h-8" />
            <Skeleton className="w-80 h-8" />
            <Skeleton className="w-full h-40" />
        </div>
    );
};

export default MyPageSkeleton;
