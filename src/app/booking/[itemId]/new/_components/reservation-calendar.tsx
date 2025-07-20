'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';

import { useMediaQuery } from '@uidotdev/usehooks';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

interface ReservationCalendarProps {
    value: Date;
    onChange: (date: Date) => void;
    minDateTime: Date;
}

export default function ReservationCalendar({
    value,
    onChange,
    minDateTime,
}: ReservationCalendarProps) {
    const [selectedDateTime, setSelectedDateTime] = useState(
        value ?? minDateTime,
    );

    useEffect(() => {
        if (selectedDateTime < minDateTime) {
            const updatedDateTime = new Date(minDateTime);
            // Round up to next 30 minute interval
            const minMinutes = minDateTime.getMinutes();
            const roundedMinutes = Math.ceil(minMinutes / 30) * 30;

            updatedDateTime.setHours(
                minDateTime.getHours(),
                roundedMinutes,
                0,
                0,
            );

            // If we rounded to next hour
            if (roundedMinutes === 60) {
                updatedDateTime.setHours(minDateTime.getHours() + 1, 0, 0, 0);
            }

            setSelectedDateTime(updatedDateTime);
            onChange(updatedDateTime);
        }
    }, [minDateTime, selectedDateTime, onChange]);

    const isTimeDisabled = (timeSlot: string): boolean => {
        const [hours, minutes] = timeSlot.split(':').map(Number);
        const dateToCheck = new Date(selectedDateTime);
        dateToCheck.setHours(hours ?? Number('00'), minutes, 0, 0);

        return dateToCheck < minDateTime;
    };

    const updateDateTime = (newDate: Date | undefined, preserveTime = true) => {
        if (!newDate) return;

        const updatedDateTime = new Date(newDate);

        if (preserveTime) {
            // Keep the current time when changing date
            updatedDateTime.setHours(
                selectedDateTime.getHours(),
                selectedDateTime.getMinutes(),
                0,
                0,
            );

            // If we're selecting today's date and the preserved time is before minDateTime
            if (
                updatedDateTime.toDateString() === minDateTime.toDateString() &&
                updatedDateTime < minDateTime
            ) {
                // Round up to next 30 minute interval from minDateTime
                const minMinutes = minDateTime.getMinutes();
                const roundedMinutes = Math.ceil(minMinutes / 30) * 30;
                updatedDateTime.setHours(
                    minDateTime.getHours(),
                    roundedMinutes,
                    0,
                    0,
                );

                // If we rounded to next hour
                if (roundedMinutes === 60) {
                    updatedDateTime.setHours(
                        minDateTime.getHours() + 1,
                        0,
                        0,
                        0,
                    );
                }
            }
        }

        setSelectedDateTime(updatedDateTime);
        onChange(updatedDateTime);
    };

    return (
        <div className="rounded-md border">
            <div className="flex">
                <Calendar
                    mode="single"
                    selected={selectedDateTime}
                    onSelect={(date) => updateDateTime(date)}
                    className="p-2 sm:pe-5"
                    disabled={[{ before: minDateTime }]}
                />
                <div className="relative w-full sm:w-40">
                    <div className="absolute inset-0 py-4">
                        <ScrollArea className="h-full sm:border-s">
                            <div className="space-y-3">
                                <div className="flex shrink-0 items-center px-5">
                                    <p className="text-sm font-medium">
                                        {useMediaQuery('(max-width: 640px)')
                                            ? format(selectedDateTime, 'EEE, d')
                                            : format(
                                                  selectedDateTime,
                                                  'EEEE, d',
                                              )}
                                    </p>
                                </div>
                                <div className="grid gap-1.5 px-5">
                                    {Array.from({ length: 48 }).map((_, i) => {
                                        const hours = Math.floor(i / 2);
                                        const minutes =
                                            i % 2 === 0 ? '00' : '30';
                                        const timeSlot = `${hours.toString().padStart(2, '0')}:${minutes}`;
                                        const isDisabled =
                                            isTimeDisabled(timeSlot);
                                        const isSelected =
                                            selectedDateTime.getHours() ===
                                                hours &&
                                            selectedDateTime.getMinutes() ===
                                                (i % 2 === 0 ? 0 : 30);

                                        return (
                                            <Button
                                                type="button"
                                                key={timeSlot}
                                                variant={
                                                    isSelected
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                size="sm"
                                                className="w-full"
                                                disabled={isDisabled}
                                                onClick={() => {
                                                    const newDate = new Date(
                                                        selectedDateTime,
                                                    );
                                                    newDate.setHours(
                                                        hours,
                                                        Number(minutes),
                                                        0,
                                                        0,
                                                    );
                                                    updateDateTime(
                                                        newDate,
                                                        false,
                                                    );
                                                }}
                                            >
                                                {timeSlot}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    );
}
