'use client';

import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { isOnServer } from '~/app/constants';

const makeQueryClient = () => {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 0,
			},
		},
	});
};
let browserQueryClient: QueryClient | undefined = undefined;
export const getQueryClient = () => {
	if (isOnServer) {
		return makeQueryClient();
	}
	browserQueryClient = browserQueryClient ? browserQueryClient : makeQueryClient();
	return browserQueryClient;
}

export const Providers = ({ children }: { children: ReactNode }) => {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}