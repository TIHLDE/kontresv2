'use client';

import { Button } from '@/components/ui/button';

import { loginUser } from '../actions';

export default function LoginButton() {
    return (
        <Button
            onClick={async () => {
                'use sever';
                await loginUser('', '', '/');
            }}
        >
            Goto signin
        </Button>
    );
}
