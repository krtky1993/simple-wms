interface LineItem {
	lineItemId: string;
	productId: string;
	productName: string;
	price: number;
}

interface Order {
	orderId: string;
	orderTotal: number;
	orderDate: string;
	shippingAddress: string;
	customerName: string;
	customerEmail: string;
	lineItems: LineItem[];
}

interface Filter {
	id?: string;
	date?: string;
	email?: string;
}

export { LineItem, Order, Filter };
