'use client';
import StatusCard from '@/components/StatusCard';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const Tracking = () => {
	const [trackingId, setTrackingId] = useState('');
	const params = useSearchParams();
	const initialId = params.get('id');

	const {
		data: shipment,
		isLoading,
		isError: error,
	} = useQuery({
		queryKey: ['shipment'],
		queryFn: async () => {
			if (trackingId.length === 0) return null;
			const res = await fetch(`/api/shipments/?id=${trackingId}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});

			const data = await res.json();
			return data;
		},
		enabled: trackingId.length > 0,
	});

	useEffect(() => {
		if (initialId) {
			setTrackingId(initialId);
		}
	}, [initialId]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!trackingId.trim()) {
			alert('Please enter a valid Tracking ID.');
			return;
		}

		const response = await fetch(`/api/shipments/?id=${trackingId}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});

		console.log(response);
	};

	return (
		<div>
			<main className='p-4'>
				<h1 className='text-2xl font-bold text-center my-4'>
					Track Your Shipment
				</h1>
				<form onSubmit={handleSubmit} className='flex flex-col items-center'>
					<input
						type='text'
						placeholder='Enter Tracking ID'
						value={trackingId}
						onChange={(e) => setTrackingId(e.target.value)}
						className='w-full md:w-1/2 p-2 border rounded mb-4 text-black rounded-xl'
					/>
					<button
						type='submit'
						className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
					>
						Track Shipment
					</button>
				</form>

				{isLoading && (
					<p className='text-center text-gray-500 my-4'>
						Fetching shipment details...
					</p>
				)}

				{!!shipment && (
					<div className='mt-4'>
						<StatusCard shipment={shipment} />
					</div>
				)}

				{error && (
					<p className='text-center text-red-500 mt-4'>
						Error: Unable to fetch shipment details. {error}
					</p>
				)}
			</main>
		</div>
	);
};

export default Tracking;
