interface Product {
	itemName: string;
	sku: string;
	price: number;
	qty?: number;
}

interface LineItem {
	lineItemId?: string;
	productId: string;
	productName: string;
	price: number;
	qty?: number;
	items?: Product[];
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

export { LineItem, Order, Product };
