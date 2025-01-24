'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { DateTimeRangePicker } from '@/components/ui/date-time-range-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';
import { ChevronRight, Search, Users } from 'lucide-react';
// import { parseAsIsoDateTime, useQueryState } from 'nuqs';
import * as React from 'react';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

export default function SearchFilters() {
    const [isOpen, setIsOpen] = useState(true);

    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: undefined,
    });

    // const [startTime, setStartTime] = useQueryState<Date | undefined>(
    //     'startTime',
    //     parseAsIsoDateTime.withDefault(undefined),
    // );
    // const [endTime, setEndTime] = useQueryState<Date | undefined>('endTime');

    return (
        <Card className="w-full">
            <CardHeader>
                <h2>Filtrer Resultater</h2>
            </CardHeader>
            <CardContent className="w-full flex gap-3 flex-col">
                <Label className="space-y-3">
                    <span>Søk</span>
                    <div className="relative">
                        <Search className="absolute top-[50%] -translate-y-[50%] left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Søkeord..."
                            className="pl-8"
                            aria-label="Søk"
                        />
                    </div>
                </Label>

                <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="space-y-2"
                >
                    <CollapsibleTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center justify-between space-x w-full"
                        >
                            <h4 className="text-sm font-semibold flex flex-row gap-2">
                                <Users />
                                Grupper
                            </h4>

                            <div>
                                <ChevronRight
                                    className={cn(
                                        'transition-transform',
                                        isOpen && 'rotate-90',
                                    )}
                                />
                                <span className="sr-only">Toggle</span>
                            </div>
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="flex flex-col gap-1 border-l-2 ml-6 pl-3">
                        <Label className="flex gap-2 items-center">
                            <Checkbox />
                            <span>NOK</span>
                        </Label>
                        <Label className="flex gap-2 items-center">
                            <Checkbox />
                            <span>KOK</span>
                        </Label>
                        <Label className="flex gap-2 items-center">
                            <Checkbox />
                            <span>Index</span>
                        </Label>
                        <Label className="flex gap-2 items-center">
                            <Checkbox />
                            <span>Pythons</span>
                        </Label>
                        <Label className="flex gap-2 items-center">
                            <Checkbox />
                            <span>Håndball</span>
                        </Label>
                    </CollapsibleContent>
                </Collapsible>

                <Label className="flex gap-2 items-center">
                    <Checkbox />
                    <span>Alkohol er lov</span>
                </Label>

                <div className="mt-2">
                    <Label>
                        <span>Tilgengelig mellom</span>
                    </Label>
                    <DateTimeRangePicker
                        className="w-full"
                        range={dateRange}
                        setRange={setDateRange}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
