import { Skeleton } from '../../ui/skeleton';

const HeaderSkeleton = () => {
    return (
        <div className="flex gap-3 items-center w-full">
            <Skeleton className="h-12 w-[300px]" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />

            <div className="w-full justify-end flex gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10" />
            </div>
        </div>
    );
};

export default HeaderSkeleton;
