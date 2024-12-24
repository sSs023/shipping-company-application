import Navbar from '../components/Navbar';
import StatusCard from '../components/StatusCard';
import useTracking from '../hooks/useTracking';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { useState, useEffect, FormEventHandler } from 'react';

const Tracking = () => {
	const router = useRouter();
	const [trackingId, setTrackingId] = useState('');
	const { status, error, isLoading } = useTracking(trackingId);

	useEffect(() => {
		if (router.query.trackingId) {
			setTrackingId(router.query.trackingId as string);
		}
	}, [router.query.trackingId]);

	const handleSubmit: FormEventHandler<HTMLFormElement> | undefined = (e) => {
		e?.preventDefault();
		if (!trackingId.trim()) {
			alert('Please enter a valid Tracking ID.');
			return;
		}
		// Optionally trigger tracking logic here if needed
	};

	return (
		<div>
			<Navbar />
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
						className='w-full md:w-1/2 p-2 border rounded mb-4 text-black'
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

				{status && (
					<div className='mt-4'>
						<StatusCard shipment={status} />
					</div>
				)}

				{error && (
					<p className='text-center text-red-500 mt-4'>
						Error: Unable to fetch shipment details. {error}
					</p>
				)}
			</main>
			<Footer />
		</div>
	);
};

export default Tracking;
