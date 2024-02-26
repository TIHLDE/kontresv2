'use client';

import { User } from '@/types/User';

import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { getUsers } from '@/utils/apis/user';

import { cn } from '@/lib/utils';
import debounce from 'debounce';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

export function UserAutocomplete(props: any) {
    const [users, setUsers] = React.useState<User[]>([]);
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState('');

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {id
                        ? users.find((user) => user.user_id === id)?.first_name
                        : 'Søk etter bruker'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Søk etter bruker"
                        onValueChange={debounce(async (search: string) => {
                            const data = await getUsers(search);
                            setUsers(data.results);
                        }, 500)}
                        {...props}
                    />
                    <CommandEmpty>Fant ingen bruker</CommandEmpty>
                    <CommandGroup>
                        {users.map((user) => (
                            <CommandItem
                                key={user.user_id}
                                value={user.user_id}
                                onSelect={(current_id) => {
                                    setId(current_id === id ? '' : current_id);
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        'mr-2 h-4 w-4',
                                        id === user.user_id
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                    )}
                                />
                                {user.first_name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
