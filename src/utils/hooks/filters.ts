'use client';

import { useState } from 'react';

export const useFilters = <T>({
    value,
    persistenceKey,
}: {
    value?: T;
    persistenceKey: string;
}) => {
    const [filters, setFilters] = useState<T>(
        value ??
            (JSON.parse(localStorage.getItem(persistenceKey) ?? '{}') as T),
    );

    const setFilterStorage = (filters: T) => {
        localStorage.setItem(persistenceKey, JSON.stringify(filters));
        setFilters(filters);
    };

    return [filters, setFilterStorage] as const;
};
