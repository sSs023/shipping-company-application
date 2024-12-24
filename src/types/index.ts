export interface IShipment {
	id: number;
	sender: string;
	receiver: string;
	weight: string;
	dimensions: string;
	status: 'Pending' | 'In Transit' | 'Delivered';
	location: string;
}
