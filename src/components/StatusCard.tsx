import { IShipment } from '@/types';

const StatusCard = ({ shipment }: { shipment: IShipment }) => (
	<div className='border p-4 rounded-xl shadow-md bg-white'>
		<h2 className='text-xl font-bold'>Shipment ID: {shipment.id}</h2>
		<p>Status: {shipment.status}</p>
		<p>Location: {shipment.location}</p>
	</div>
);

export default StatusCard;
