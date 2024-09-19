import axios from "axios";
import express from "express";
import http from "http";

import { searchProducts, getProduct } from "../controllers/products";

// Setup Express app for testing
const app = express();
app.use(express.json());
app.get("/products/", searchProducts);
app.get("/products/:id", getProduct);

// Axios instance pointing to your app
const api = axios.create({
	baseURL: "http://localhost:3000",
	timeout: 1000,
});

let server: http.Server;

describe("Products Controller", () => {
	beforeAll(() => {
		server = app.listen(3000);
	});

	afterAll(() => {
		server.close();
	});

	test("GET /products returns all products", async () => {
		const response = await api.get("/products");
		expect(response.status).toBe(200);
		expect(response.data.products).toHaveLength(3);
	});

	test("GET /products/:id returns product by id", async () => {
		const response = await api.get("/products/P001");

		expect(response.status).toBe(200);
		expect(response.data.products[0].productId).toBe("P001");
	});

	test("GET /products/:id with non-existent id returns 404", async () => {
		try {
			await api.get("/products/INVALID_ID");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				expect(error.response?.status).toBe(404);
				expect(error.response?.data.message).toBe("Product Not Found!");
			} else {
				throw error;
			}
		}
	});
});
