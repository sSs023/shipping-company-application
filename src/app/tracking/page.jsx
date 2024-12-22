"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import StatusCard from '@/components/StatusCard';
import useTracking from '@/hooks/useTracking';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

const Tracking = () => {
  const router = useRouter();
  const [trackingId, setTrackingId] = useState('');
  const params = useSearchParams()
  const initialId = params.get('id');
  
  const {data: shipment, isLoading, isError: error} = useQuery({
    queryKey: ['shipment'],
    queryFn: async () => {
      const res = await fetch(`/api/shipments/?id=${trackingId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json()
      return data
    },
  })

  useEffect(() => {
    if (initialId) {
      setTrackingId(initialId);
    }
  }, [initialId]);

  const handleChange = (e) => setTrackingId(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      alert('Please enter a valid Tracking ID.');
      return;
    }

    const response = await fetch(`/api/shipments/?id=${trackingId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(response)
  };

  return (
    <div>
      <main className="p-4">
        <h1 className="text-2xl font-bold text-center my-4">Track Your Shipment</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter Tracking ID"
            value={trackingId}
            onChange={handleChange}
            className="w-full md:w-1/2 p-2 border rounded mb-4 text-black"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Track Shipment
          </button>
        </form>

        {isLoading && (
          <p className="text-center text-gray-500 my-4">Fetching shipment details...</p>
        )}

        {!!shipment && (
          <div className="mt-4">
            <StatusCard shipment={shipment} />
          </div>
        )}

        {error && (
          <p className="text-center text-red-500 mt-4">
            Error: Unable to fetch shipment details. {error}
          </p>
        )}
      </main>
    </div>
  );
};

export default Tracking;
