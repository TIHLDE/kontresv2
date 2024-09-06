'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { DetailedItem } from '@/utils/apis/types';
import { useFilters } from '@/utils/hooks/filters';

import { CheckboxProps } from '@radix-ui/react-checkbox';

type FilterType = {
    upcoming: boolean;
    expired: boolean;
    accepted: boolean;
    rejected: boolean;
    awaiting: boolean;
    item: string;
};

interface FiltersProps {
    items: DetailedItem[];
}
const Filters = ({ items }: FiltersProps) => {
    const [filters, setFilters] = useFilters<FilterType>({
        persistenceKey: 'adminfilters',
    });

    return (
        <Card className="h-fit sticky top-32">
            <CardHeader>
                <CardTitle>Filtre</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2.5">
                    <Input placeholder="Søk..." />
                    <Select
                        defaultValue={filters.item ?? 'all'}
                        onValueChange={(id) => {
                            setFilters({
                                ...filters,
                                item: id,
                            });
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Velg gjenstand" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">
                                Alle gjenstander
                            </SelectItem>
                            {items.map((item, index) => (
                                <SelectItem value={item.id} key={index}>
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="grid grid-cols-2 gap-2.5">
                        <CheckboxItem
                            label="Kommende"
                            checkboxProps={{
                                defaultChecked: filters.upcoming,
                                onCheckedChange: (checked) => {
                                    setFilters({
                                        ...filters,
                                        upcoming: checked as boolean,
                                    });
                                },
                            }}
                        />
                        <CheckboxItem
                            label="Utløpte"
                            checkboxProps={{
                                defaultChecked: filters.expired,
                                onCheckedChange: (checked) => {
                                    setFilters({
                                        ...filters,
                                        expired: checked as boolean,
                                    });
                                },
                            }}
                        />
                        <CheckboxItem
                            label="Bekreftet"
                            checkboxProps={{
                                defaultChecked: filters.accepted,
                                onCheckedChange: (checked) => {
                                    setFilters({
                                        ...filters,
                                        accepted: checked as boolean,
                                    });
                                },
                            }}
                        />
                        <CheckboxItem
                            label="Avventer"
                            checkboxProps={{
                                defaultChecked: filters.awaiting,
                                onCheckedChange: (checked) => {
                                    setFilters({
                                        ...filters,
                                        awaiting: checked as boolean,
                                    });
                                },
                            }}
                        />
                        <CheckboxItem
                            label="Avslått"
                            checkboxProps={{
                                defaultChecked: filters.rejected,
                                onCheckedChange: (checked) => {
                                    setFilters({
                                        ...filters,
                                        rejected: checked as boolean,
                                    });
                                },
                            }}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

interface CheckboxItemProps {
    label: string;
    checkboxProps?: CheckboxProps;
}
const CheckboxItem = ({ label, checkboxProps }: CheckboxItemProps) => {
    return (
        <div className="flex gap-2.5 items-center">
            <Checkbox id={label} {...checkboxProps} />
            <label
                htmlFor={label}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {label}
            </label>
        </div>
    );
};

export default Filters;
