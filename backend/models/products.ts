interface Item {
	itemName: string;
	SKU: string;
	itemPrice: number;
}

interface Product {
	productName: string;
	productID: string;
	items: Item[];
}

export { Product };
