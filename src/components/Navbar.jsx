import Link from 'next/link';

const Navbar = () => (
  <nav className="bg-blue-500 p-4 text-white flex justify-between">
    <Link href="/">Home</Link>
    <div>
      <Link href="/booking">Book Shipment</Link>
      <Link href="/tracking" className="ml-4">Track Shipment</Link>
    </div>
  </nav>
);

export default Navbar;