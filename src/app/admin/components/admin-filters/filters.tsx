import { Button } from '@/components/ui/button';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';

import FilterBadge from './filter-badge';
import { GroupIcons } from './filter-list';
import { motion } from 'framer-motion';
import { ListFilterIcon } from 'lucide-react';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export type Filter = {
    name: string;
    value: string;
    icon?: ReactNode;
};

export type FilterGroup = {
    header: string;
    value: string;
    icon?: ReactNode;
    filters: Filter[];
};

export type FilterCallbackType = {
    /**
     * The filter that was selected in the menu.
     */
    filter: Filter;
    /**
     * Used to define what filter category this filter belongs to.
     */
    parentValue: string;
};

interface FiltersProps {
    open?: boolean;
    setOpen?: Dispatch<SetStateAction<boolean>>;
    filters?: FilterCallbackType[];
    setFilters?: Dispatch<SetStateAction<FilterCallbackType[]>>;
    onFilterChange?: (value: FilterCallbackType) => void;
    /**
     * List of filter groups to display. Needs a header and a list of filters.
     */
    filterGroups: FilterGroup[];
}
export default function Filters({
    open,
    setOpen,
    filters,
    setFilters,
    filterGroups,
    onFilterChange,
}: FiltersProps) {
    // Function for adding a filter if it is not already in the filters list
    const addFilter = (filter: FilterCallbackType) => {
        if (!isInFilters(filter)) {
            setFilters?.((prev) => [...prev, filter]);
        } else {
            // remove the filter instead
            removeFilter(filter);
        }
    };

    const isInFilters = (filter: FilterCallbackType) =>
        filters?.some(
            (f) =>
                f.filter.value === filter.filter.value &&
                f.parentValue === filter.parentValue,
        );

    const removeFilter = (filter: FilterCallbackType) => {
        setFilters?.((prev) =>
            prev.filter(
                (f) =>
                    f.filter.value !== filter.filter.value ||
                    f.parentValue !== filter.parentValue,
            ),
        );
    };

    return (
        <div className="flex gap-2 items-center">
            <div className="flex gap-1 items-center">
                {filters?.map((filter, index) => (
                    <motion.div
                        key={filter.filter.value + index}
                        initial={{ opacity: 0, translateX: -10 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        exit={{ opacity: 0, translateX: -10 }}
                        transition={{ duration: 0.2 }}
                        className="items-center flex"
                    >
                        <Button
                            variant={'ghost'}
                            className="p-0 hover:bg-transparent h-fit"
                            onClick={() => {
                                removeFilter(filter);
                            }}
                        >
                            <FilterBadge
                                groupIcon={GroupIcons[filter.parentValue]}
                                icon={filter.filter.icon}
                                label={filter.filter.name}
                                parent={filter.parentValue}
                            />
                        </Button>
                    </motion.div>
                ))}
            </div>
            <Button
                onClick={() => setOpen?.(true)}
                variant={'ghost'}
                size={'sm'}
                className="gap-2"
            >
                <ListFilterIcon size={16} />
                Filtre
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Søk etter filtre..." />
                <CommandList>
                    <CommandEmpty>Ingen resultater funnet</CommandEmpty>
                    <CommandGroup
                        heading={
                            <div>
                                <p className="flex items-center">
                                    <kbd className="me-2 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                                        Ctrl+K
                                    </kbd>
                                    Åpner også denne menyen!
                                </p>
                            </div>
                        }
                    ></CommandGroup>
                    {filterGroups.map((group, index) => (
                        <CommandGroup
                            heading={group.header}
                            key={group.header + index}
                        >
                            {group.filters.map((filter, index) => (
                                <CommandItem
                                    className="gap-2"
                                    key={filter.value + index + group.header}
                                    onSelect={() => {
                                        addFilter({
                                            filter,
                                            parentValue: group.value,
                                        });
                                        onFilterChange?.({
                                            filter,
                                            parentValue: group.value,
                                        });
                                    }}
                                >
                                    {filter.icon}
                                    {filter.name}
                                    {isInFilters({
                                        filter: filter,
                                        parentValue: group.value,
                                    }) ? (
                                        <span className="opacity-50">
                                            (valgt)
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    ))}
                </CommandList>
            </CommandDialog>
        </div>
    );
}
