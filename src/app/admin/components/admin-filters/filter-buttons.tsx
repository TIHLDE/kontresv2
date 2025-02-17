'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { StateAtomType } from '@/app/reservasjon/[id]/components/ReservationMeta';
import { cn } from '@/lib/utils';
import { ReservationState } from '@prisma/client';
import { CheckIcon, ChevronRight, Search } from 'lucide-react';
import { Dispatch, useState } from 'react';

interface FilterButtonsProps extends React.HTMLProps<HTMLDivElement> {
    state: ReservationState;
    setState: Dispatch<ReservationState>;
}

export const stateMap: { [key in ReservationState]: string } = {
    APPROVED: 'Bekreftet',
    PENDING: 'Avventer',
    REJECTED: 'Avslått',
};

export default function FilterButtons({
    state,
    setState,
    className,
    ...props
}: FilterButtonsProps) {
    const [statusOpen, setStatusOpen] = useState(false);

    return (
        <div className={cn('flex flex-col gap-5', className)} {...props}>
            <div className="flex flex-col gap-1 w-full">
                <span>Søk</span>
                <div className="relative">
                    <Search
                        className="absolute top-1/2 -translate-y-1/2 left-2.5"
                        size={16}
                    />
                    <Input type="text" className="pl-8" />
                </div>
            </div>
            <Collapsible open={statusOpen} onOpenChange={setStatusOpen}>
                <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <div className="flex items-center flex-row justify-between w-full">
                            <div className="flex gap-2 items-center">
                                <CheckIcon size={16} />
                                <span>Status</span>
                            </div>
                            <ChevronRight
                                className={cn(
                                    'transition-transform',
                                    statusOpen && 'rotate-90',
                                )}
                            />
                            <span className="sr-only">Toggle</span>
                        </div>
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col gap-1 border-l-2 ml-6 pl-3 mt-2">
                    {Object.values(ReservationState).map((stateItem) => (
                        <Label
                            key={stateItem}
                            className="flex gap-2 items-center"
                        >
                            <Checkbox
                                checked={state.includes(stateItem)}
                                onCheckedChange={(e) => {
                                    setState(stateItem);
                                }}
                            />
                            <span>{stateMap[stateItem]}</span>
                        </Label>
                    ))}
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}
