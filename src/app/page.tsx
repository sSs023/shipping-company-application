import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="p-4">
        <h1 className="text-3xl font-bold text-center my-4">Welcome to the Shipping Company</h1>
        <p className="text-center mb-4">Please choose an option below:</p>
        <div className="flex justify-center space-x-4">
          <Link href="/booking" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Book a Shipment
          </Link>
          <Link href="/tracking" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Track a Shipment
          </Link>
        </div>
      </main>
    </div>
  );
}