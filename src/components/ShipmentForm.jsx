"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ShipmentForm = () => {
  const [formData, setFormData] = useState({
    sender: '',
    receiver: '',
    weight: '',
    dimensions: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate a unique shipment ID
      // const shipmentId = uid();
      const shipmentData = { ...formData };

      // Send data to the API
      const response = await fetch('/api/shipments/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shipmentData),
      });
      const data = await response.json()

      if (response.ok) {
        console.log(data)
        // Redirect to tracking page with tracking ID as a query parameter
        router.push(`/tracking?id=${data.booking.id}`);
      } else {
        const result = await response.json();
        alert(result.message || 'Failed to book shipment');
      }
    } catch (error) {
      alert('Failed to book shipment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-4 shadow-md rounded">
      <div>
        <label className='text-black'>Sender:</label>
        <input
          type="text"
          name="sender"
          value={formData.sender}
          onChange={handleChange}
          className="block w-full p-2 border text-black"
          placeholder="Enter sender name"
          required
        />
      </div>
      <div>
        <label className='text-black'>Receiver:</label>
        <input
          type="text"
          name="receiver"
          value={formData.receiver}
          onChange={handleChange}
          className="block w-full p-2 border text-black"
          placeholder="Enter receiver name"
          required
        />
      </div>
      <div>
        <label className='text-black'>Weight:</label>
        <input
          type="text"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          className="block w-full p-2 border text-black"
          placeholder="Enter shipment weight"
          required
        />
      </div>
      <div>
        <label className='text-black'>Dimensions:</label>
        <input
          type="text"
          name="dimensions"
          value={formData.dimensions}
          onChange={handleChange}
          className="block w-full p-2 border text-black"
          placeholder="Enter shipment dimensions"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
        Book Shipment
      </button>
    </form>
  );
};

export default ShipmentForm;