import { Request, RequestHandler, Response } from "express";

import orders from "../../models/orders.json";
import products from "../../models/products.json";
import { Product } from "../../models/types";

const searchOrders: RequestHandler = (request: Request, response: Response) => {
	const { id, email, date } = request.query;
	let filteredOrders = orders;
	if (id) {
		filteredOrders = filteredOrders.filter((order) => order.orderId === id);
	}
	if (email) {
		filteredOrders = filteredOrders.filter(
			(order) => order.customerEmail === email
		);
	}
	if (date) {
		filteredOrders = filteredOrders.filter((order) => order.orderDate === date);
	}
	if (filteredOrders.length) {
		return response
			.status(200)
			.json({ total: filteredOrders.length, orders: filteredOrders });
	}
	return response.status(404).json({
		message: "No Orders Found",
	});
};

const getOrder = (request: Request, response: Response) => {
	const order = orders.filter((order) => order.orderId === request.params.id);
	if (order.length) {
		return response.status(200).json({ total: order.length, orders: order });
	}
	return response.status(404).json({
		message: "Order Not Found",
	});
};

const getItemsForPicking = (request: Request, response: Response) => {
	const { date } = request.query;
	const filteredOrders = date
		? orders.filter((order) => order.orderDate === date)
		: orders;

	const items: { [key: string]: Product } = {};

	filteredOrders.forEach((order) => {
		order.lineItems.forEach((item: { productId: string }) => {
			const product = products.find(
				(product) => product.productId === item.productId
			);

			if (product && product.items) {
				product.items.forEach((subItem) => {
					if (items[subItem.sku]) {
						items[subItem.sku].qty! += 1;
					} else {
						items[subItem.sku] = {
							sku: subItem.sku,
							itemName: subItem.itemName,
							price: subItem.price,
							qty: 1,
						};
					}
				});
			}
		});
	});

	return response.status(200).json({
		orderDate: date,
		totalOrders: filteredOrders.length,
		products: Object.values(items),
	});
};

const getItemsForPacking = (request: Request, response: Response) => {
	const { date } = request.query;
	const filteredOrders = date
		? orders.filter((order) => order.orderDate === date)
		: orders;

	const orderDetails = filteredOrders.map((order) => {
		const {
			orderId,
			orderTotal,
			orderDate,
			shippingAddress,
			customerEmail,
			customerName,
		} = order;
		return {
			orderId,
			orderTotal,
			orderDate,
			shippingAddress,
			customerEmail,
			customerName,
			lineItems: order.lineItems.map((item) => ({
				productId: item.productId,
				productName: item.productName,
				qty: item.qty,
				price: item.price,
				items: products.find((product) => product.productId === item.productId)!
					.items,
			})),
		};
	});

	return response.status(200).json({
		totalOrders: orderDetails.length,
		orders: orderDetails,
	});
};

export { searchOrders, getOrder, getItemsForPicking, getItemsForPacking };
