'use client';

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import { AppStore } from '~/app/App.store';

export const Post = () => {
	// return null;
	const { data } = useQuery({
		queryKey: ['post'],
		queryFn: async () => await AppStore.fetchData(),
	});
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async () => await AppStore.fetchData(),
		onSuccess: () => {
			console.log('on success mutation');
		},
		onError: () => {
			console.log('on error mutation');
		},
		onMutate: () => {
			console.log('on mutate');
		},
		// onSettled: async () => {
		// 	return await queryClient.invalidateQueries({ queryKey: ['post'] })
		// }
	});
	const theData = mutation.data ?? data ?? null;

	console.log('mutation.status:', mutation.status);

	return (
		<div className="p-4 w-1/3 m-auto">
			<div className="text-sm text-gray-600">Cat facts</div>
			{
				mutation.status === 'pending'
					?
					<div className="bg-red-700">Loading</div>
					:
					<div>{theData?.fact}</div>
			}
			<button
				className="mt-4 py-2 px-4 text-center border border-gray-500"
				type="button"
				onClick={() => {
					console.log('click');
					mutation.mutate()
				}}
			>
				Get fact
			</button>
		</div>
	);
};