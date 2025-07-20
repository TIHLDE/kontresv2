'use client';

import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import type { formSchema } from './reservation-form';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/react';
import { useDebounce } from '@uidotdev/usehooks';
import { CommandLoading } from 'cmdk';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import type { z } from 'zod';

interface ReservationComboboxProps {
    field: ControllerRenderProps<z.infer<typeof formSchema>, 'soberWatchId'>;
}

export default function ReservationCombobox({
    field,
}: ReservationComboboxProps) {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const [selectedUserLabel, setSelectedUserLabel] = useState('');

    const { data: users = [], isLoading } = api.user.getUsers.useQuery({
        name: debouncedSearchTerm || 'a',
        page: 1,
    });

    console.log(users);

    useEffect(() => {
        if (field.value && users.length > 0) {
            const selectedUser = users.find((user) => user.id === field.value);

            if (selectedUser) {
                setSelectedUserLabel(selectedUser.name);
            }
        }
    }, [field.value, users]);

    const handleSelect = (currentValue: string) => {
        const selectedUser = users.find((user) => user.id === currentValue);

        if (selectedUser) {
            field.onChange(selectedUser.id);
            setSelectedUserLabel(selectedUser.name);
        }

        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                    type="button"
                >
                    {field.value && selectedUserLabel
                        ? selectedUserLabel
                        : 'Søk etter bruker...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Søk etter bruker..."
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                    />
                    <CommandList>
                        {isLoading && (
                            <CommandLoading>
                                <div className="flex items-center justify-center p-2">
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Søker etter brukere...
                                </div>
                            </CommandLoading>
                        )}

                        {!isLoading && users.length === 0 && (
                            <CommandEmpty>Ingen brukere funnet.</CommandEmpty>
                        )}

                        {users.length > 0 && (
                            <CommandGroup>
                                {users.map((user) => (
                                    <CommandItem
                                        key={user.id}
                                        value={user.id}
                                        onSelect={handleSelect}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                field.value === user.id
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                            )}
                                        />
                                        {user.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
