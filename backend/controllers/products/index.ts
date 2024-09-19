import { Request, Response } from "express";

import products from "../../models/products.json";

const searchProducts = (request: Request, response: Response) => {
	try {
		return response.status(200).json({ total: products.length, products });
	} catch (error) {
		return response.status(500).json({
			message: `Server Error Encountered: ${error}`,
		});
	}
};

const getProduct = (request: Request, response: Response) => {
	try {
		const product = products.filter((x) => x.productId === request.params.id);
		if (product.length) {
			return response
				.status(200)
				.json({ total: product.length, products: product });
		}
		return response.status(404).json({
			message: "Product Not Found!",
		});
	} catch (error) {
		return response.status(500).json({
			message: `Server Error Encountered: ${error}`,
		});
	}
};

export { searchProducts, getProduct };
