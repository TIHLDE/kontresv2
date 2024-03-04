'use client';

import { User } from '@/types/User';

import { Input } from '@/components/ui/input';

import { getUsers } from '@/utils/apis/user';

import { cn } from '@/lib/utils';
import { Combobox } from '@headlessui/react';
import debounce from 'debounce';
import { ChangeEvent, Fragment, useState } from 'react';

export default function UserAutocomplete(props: any) {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [query, setQuery] = useState('');

    const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        const data = await getUsers(e.target.value);
        console.log(data);
        setUsers(data.results);
    };

    const debouncedChange = debounce(handleInputChange, 500);

    return (
        <Combobox value={selectedUser} onChange={setSelectedUser}>
            <div className="relative">
                <Combobox.Input
                    onChange={debouncedChange}
                    as={Input}
                    {...props}
                />
                <Combobox.Options className="absolute mt-1 rounded-lg w-full z-10 border border-border bg-white dark:bg-zinc-900">
                    {users.map((user) => (
                        <Combobox.Option
                            key={user.user_id}
                            value={`${user.first_name} ${user.last_name}`}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
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
                </Combobox.Options>
            </div>
        </Combobox>
    );
}
