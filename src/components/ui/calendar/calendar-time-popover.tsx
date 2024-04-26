import { leftPad } from '../../../lib/utils';

const days = [
    'Mandag',
    'Tirsdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lørdag',
    'Søndag',
];
export default function CalendarTimePopover({
    mousePosition,
    currentDay,
    view,
    containerRef,
}: {
    containerRef: React.RefObject<HTMLDivElement>;
    mousePosition: React.MouseEvent<HTMLDivElement, MouseEvent> | null;
    currentDay: Date;
    view: 'week' | 'day';
}) {
    if (!mousePosition) return null;
    return (
        <div
            className="z-20 fixed pointer-events-none border shadow-md text-sm bg-background rounded-md px-4 py-2 -translate-x-1/2 -translate-y-full"
            style={{
                top: mousePosition.clientY,
                left: mousePosition.pageX,
            }}
        >
            {
                days[
                    view == 'week'
                        ? Math.floor(
                              ((mousePosition.pageX -
                                  containerRef.current!.offsetLeft) /
                                  containerRef.current!.offsetWidth) *
                                  7,
                          )
                        : currentDay.getDay() - 1
                ]
            }{' '}
            {/*the hour and minute where the cursor is */}
            {leftPad(
                Math.floor(
                    ((mousePosition.pageY - containerRef.current!.offsetTop) /
                        containerRef.current!.offsetHeight) *
                        24,
                ),
                2,
                '0',
            )}
            :
            {leftPad(
                Math.floor(
                    (mousePosition.nativeEvent.offsetY /
                        (mousePosition.target as HTMLDivElement).offsetHeight) *
                        60,
                ),
                2,
                '0',
            )}
        </div>
    );
}
