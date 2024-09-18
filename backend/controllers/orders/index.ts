import { Request, RequestHandler, Response } from "express";

import orders from "../../models/orders.json";

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
			.json({ total: filteredOrders.length, filteredOrders });
	}
	return response.status(404).json({
		message: "No Orders Found",
	});
};

const getOrder = (request: Request, response: Response) => {
	const order = orders.filter((x) => x.orderId === request.params.id);
	if (order.length) {
		return response.status(200).json(order);
	}
	return response.status(404).json({
		message: "Order Not Found",
	});
};

export { searchOrders, getOrder };
