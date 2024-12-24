import Navbar from '../components/Navbar';
import ShipmentForm from '../components/ShipmentForm';
import Footer from '../components/Footer';

const Booking = () => (
  <div>
    <Navbar />
    <main className="p-4">
      <h1 className="text-2xl font-bold text-center my-4">Book Your Shipment</h1>
      <ShipmentForm />
    </main>
    <Footer />
  </div>
);

export default Booking;