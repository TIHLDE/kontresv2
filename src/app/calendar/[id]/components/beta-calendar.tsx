import { cn } from '@/utils/cn';

interface BetaCalendarProps extends React.HTMLAttributes<HTMLDivElement> {}

const BetaCalendar = ({ className, ...props }: BetaCalendarProps) => {
    return (
        <div {...props} className={cn('flex', className)}>
            {new Array(7).fill(0).map((_, i) => {
                return <CalendarDay key={i} className="w-full" />;
            })}
        </div>
    );
};

interface CalendarFrameProps extends React.HTMLAttributes<HTMLDivElement> {}
const CalendarFrame = ({ className, ...props }: CalendarFrameProps) => {
    return (
        <div
            {...props}
            className={cn(
                'border-solid border-[1px] border-x-0 border-t-0 last:border-b-0 border-collapse border-foreground',
                className,
            )}
        >
            s
        </div>
    );
};

interface CalendarDayProps extends React.HTMLAttributes<HTMLDivElement> {}
const CalendarDay = ({ className, ...props }: CalendarDayProps) => {
    return (
        <div
            {...props}
            className={cn('w-full h-full flex flex-col', className)}
        >
            {new Array(24).fill(0).map((_, i) => {
                return <CalendarFrame key={i} className="w-full h-7" />;
            })}
        </div>
    );
};

export default BetaCalendar;
