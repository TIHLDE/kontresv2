import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

const Filters = () => {
    return (
        <Card className="h-fit sticky top-32">
            <CardHeader>
                <CardTitle>Filtre</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2.5">
                    <Input placeholder="Søk..." />
                    <CheckboxItem label="Kommende" />
                    <CheckboxItem label="Tidligere" />
                    <CheckboxItem label="Godkjente" />
                    <CheckboxItem label="Avslåtte" />
                </div>
            </CardContent>
        </Card>
    );
};

interface CheckboxItemProps {
    label: string;
}
const CheckboxItem = ({ label }: CheckboxItemProps) => {
    return (
        <div className="flex gap-2.5 items-center">
            <Checkbox id={label} />
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
