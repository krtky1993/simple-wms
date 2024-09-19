import { Request, Response } from "express";

import products from "../../models/products.json";

const searchProducts = (request: Request, response: Response) => {
	return response.status(200).json({ total: products.length, products });
};

const getProduct = (request: Request, response: Response) => {
	const product = products.filter((x) => x.productId === request.params.id);
	if (product.length) {
		return response
			.status(200)
			.json({ total: product.length, products: product });
	}
	return response.status(404).json({
		message: "Product Not Found!",
	});
};

export { searchProducts, getProduct };
