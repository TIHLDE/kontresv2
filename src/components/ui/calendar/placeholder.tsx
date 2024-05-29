import React from 'react';

export default function PossiblePlaceholder({
    mousePosition,
    dragStart,
    dragEnd,
    view,
    containerRef,
}: {
    mousePosition: React.MouseEvent<HTMLDivElement, MouseEvent> | null;
    dragStart: React.MouseEvent<HTMLDivElement, MouseEvent> | null;
    dragEnd: React.MouseEvent<HTMLDivElement, MouseEvent> | null;
    view: 'week' | 'day';
    containerRef: React.RefObject<HTMLDivElement>;
}) {
    if (mousePosition == null || dragStart == null) return null;

    const height = mousePosition!.pageY - dragStart!.pageY;
    return (
        mousePosition &&
        dragStart &&
        !dragEnd && (
            <div
                className="rounded-md absolute bg-secondary shadow-sm border z-10 pointer-events-none"
                style={{
                    top:
                        dragStart.pageY -
                        containerRef.current!.getBoundingClientRect().top -
                        window.scrollY,
                    //trash formel men orker virkelig ikke rn
                    left:
                        view == 'week'
                            ? (Math.floor(
                                  ((dragStart.pageX -
                                      containerRef.current!.offsetLeft) /
                                      containerRef.current!.offsetWidth) *
                                      7,
                              ) *
                                  100) /
                                  7 +
                              '%'
                            : '0',
                    height,
                    width: view == 'week' ? 100 / 7 + '%' : '100%',
                }}
            ></div>
        )
    );
}
