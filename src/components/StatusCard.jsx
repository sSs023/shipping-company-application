const StatusCard = ({ shipment }) => (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-xl font-bold">Shipment ID: {shipment.id}</h2>
      <p>Status: {shipment.status}</p>
      <p>Location: {shipment.location}</p>
    </div>
  );
  
  export default StatusCard;