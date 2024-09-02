'use client';

import { User } from '@/types/User';

import { Input } from '@/components/ui/input';

import { getUsers } from '@/utils/apis/user';

import { cn } from '@/lib/utils';
import { Combobox } from '@headlessui/react';
import debounce from 'debounce';
import { ChangeEvent, Fragment, useState } from 'react';

export default function UserAutocomplete({ onChange, value, ...rest }: any) {
    const [users, setUsers] = useState<User[]>([]);

    const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const data = await getUsers(e.target.value);
        setUsers(data.results);
    };

    const debouncedChange = debounce(handleInputChange, 500);

    return (
        <Combobox value={value} onChange={onChange}>
            <div className="relative">
                <Combobox.Input
                    onChange={debouncedChange}
                    as={Input}
                    {...rest}
                />
                <Combobox.Options className="absolute mt-2 rounded-lg w-full z-10 border border-border bg-white dark:bg-zinc-900">
                    {users.map((user) => (
                        <Combobox.Option
                            key={user.user_id}
                            value={user.user_id}
                            as={Fragment}
                        >
                            {() => (
                                <li
                                    className={cn(
                                        'p-2 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800',
                                    )}
                                >
                                    {user.first_name} {user.last_name}
                                </li>
                            )}
                        </Combobox.Option>
                    ))}
                    {users.length === 0 && (
                        <li className="p-2">Ingen resultater</li>
                    )}
                </Combobox.Options>
            </div>
        </Combobox>
    );
}
