'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

export function QueryClientComponent({ children }: { children: ReactNode }) {
    const client = new QueryClient({
        defaultOptions: {
            queries: { refetchOnWindowFocus: false, refetchOnReconnect: true, retry: false },
        },
    });
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
