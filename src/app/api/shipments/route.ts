import fs from 'fs/promises';
import path from 'path';
import { NextRequest } from 'next/server';
import { IShipment } from '@/types';

// Path to the shipments.json file
const filePath = path.join(process.cwd(), 'src/data/shipments.json');

// Function to read shipments from the JSON file
async function readShipments(): Promise<IShipment[]> {
	try {
		const data = await fs.readFile(filePath, 'utf-8');
		return JSON.parse(data);
	} catch (err) {
		console.error('Error reading shipments file:', err);
		return [];
	}
}

// Function to write shipments to the JSON file
async function writeShipments(shipments: IShipment[]) {
	try {
		await fs.writeFile(filePath, JSON.stringify(shipments, null, 2), 'utf-8');
	} catch (err) {
		console.error('Error writing shipments file:', err);
	}
}

export async function POST(req: NextRequest) {
	const body = await req.json(); // Parse the request body
	const shipments = await readShipments(); // Read existing shipments

	// Create a new shipment entry
	const booking = {
		id: shipments.length + 1, // Assign an incremental ID
		...body,
		status: 'Pending', // Default status
		location: 'Warehouse', // Default location
	};

	// Add the new shipment to the array
	shipments.push(booking);

	// Write the updated array back to the JSON file
	await writeShipments(shipments);

	// Return a success response
	return new Response(
		JSON.stringify({ message: 'Shipment booked successfully!', booking }),
		{ status: 201, headers: { 'Content-Type': 'application/json' } }
	);
}

export async function GET(req: NextRequest) {
	const id = req.nextUrl.searchParams.get('id');
	const shipments = await readShipments();
	const shipment = id ? shipments?.find((s) => s.id === +id) : null;

	if (!shipment) {
		return new Response(JSON.stringify({ error: 'Shipment not found' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	return new Response(JSON.stringify(shipment), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
}
