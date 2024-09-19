import axios from "axios";
import express from "express";
import http from "http";

import {
	searchOrders,
	getOrder,
	getItemsForPacking,
	getItemsForPicking,
} from "../controllers/orders";

// Setup Express app for testing
const app = express();
app.use(express.json());
app.get("/orders/", searchOrders);
app.get("/orders/picking", getItemsForPicking);
app.get("/orders/packing", getItemsForPacking);
app.get("/orders/:id", getOrder);

const api = axios.create({
	baseURL: "http://localhost:3000",
	timeout: 1000,
});

let server: http.Server;

describe("Orders Controller", () => {
	beforeAll(() => {
		server = app.listen(3000);
	});

	afterAll(() => {
		server.close();
	});

	test("GET / with no query params returns all orders", async () => {
		const response = await api.get("/orders");
		expect(response.status).toBe(200);
		expect(response.data.total).toBeGreaterThan(0);
		expect(response.data.orders).toBeDefined();
	});

	test("GET / with id query param filters orders by id", async () => {
		const response = await api.get("/orders", { params: { id: "ORD001" } });
		expect(response.status).toBe(200);
		expect(response.data.total).toBeGreaterThan(0);
		expect(response.data.orders[0].orderId).toBe("ORD001");
	});

	test("GET / with email query param filters orders by email", async () => {
		const response = await api.get("/orders", {
			params: { email: "johndoe@example.com" },
		});
		expect(response.status).toBe(200);
		expect(response.data.total).toBeGreaterThan(0);
		expect(response.data.orders[0].customerEmail).toBe("johndoe@example.com");
	});

	test("GET / with date query param filters orders by date", async () => {
		const response = await api.get("/orders", {
			params: { date: "2024-09-01" },
		});
		expect(response.status).toBe(200);
		expect(response.data.total).toBeGreaterThan(0);
		expect(response.data.orders[0].orderDate).toBe("2024-09-01");
	});

	test("GET /orders/picking without date returns all items for picking", async () => {
		const response = await api.get("/orders/picking");
		expect(response.status).toBe(200);
		expect(response.data.totalOrders).toBeGreaterThan(0);
		expect(response.data.products).toBeDefined();
	});

	test("GET /orders/picking with date filters items for picking by date", async () => {
		const response = await api.get("/orders/picking", {
			params: { date: "2024-09-01" },
		});
		expect(response.status).toBe(200);
		expect(response.data.totalOrders).toBeGreaterThan(0);
		expect(response.data.products).toBeDefined();
	});

	test("GET /items-for-packing without date returns all items for packing", async () => {
		const response = await api.get("/orders/packing");
		expect(response.status).toBe(200);
		expect(response.data.totalOrders).toBeGreaterThan(0);
		expect(response.data.orders).toBeDefined();
	});

	test("GET /items-for-packing with date filters items for packing by date", async () => {
		const response = await api.get("/orders/packing", {
			params: { date: "2024-09-01" },
		});
		expect(response.status).toBe(200);
		expect(response.data.totalOrders).toBeGreaterThan(0);
		expect(response.data.orders).toBeDefined();
	});

	test("GET / with non-existent query params returns 404", async () => {
		try {
			await api.get("/orders", {
				params: { email: "nonexistent@example.com" },
			});
		} catch (error) {
			if (axios.isAxiosError(error)) {
				expect(error.response?.status).toBe(404);
				expect(error.response?.data.message).toBe("No Orders Found");
			} else {
				throw error;
			}
		}
	});

	test("GET /orders/:id returns order by id", async () => {
		const response = await api.get("/orders/ORD001");
		expect(response.status).toBe(200);
		expect(response.data.orders[0].orderId).toBe("ORD001");
	});

	test("GET /orders/:id with non-existent id returns 404", async () => {
		try {
			await api.get("/orders/INVALID_ID");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				expect(error.response?.status).toBe(404);
				expect(error.response?.data.message).toBe("Order Not Found");
			} else {
				throw error;
			}
		}
	});
});
