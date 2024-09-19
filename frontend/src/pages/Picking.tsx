import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../types";

import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
} from "@nextui-org/table";
import { Card, CardBody, Button } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/progress";
import { useNavigate } from "react-router-dom";

const PickingPage: React.FC = () => {
	const navigate = useNavigate();
	const [products, setProducts] = useState<Product[]>([]);
	const [totalOrders, setTotalOrders] = useState(0);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOrders = async (date: string = "2024-09-02") => {
			try {
				const response = await axios.get(
					`http://localhost:8000/orders/picking?date=${date}`
				);
				setProducts(response.data.products);
				setTotalOrders(response.data.totalOrders);
			} catch (err) {
				setError(`Failed to fetch orders: ${err}`);
			} finally {
				setLoading(false);
			}
		};
		fetchOrders();
	}, []);

	if (loading) return <CircularProgress />;
	if (error) return <p>{error}</p>;

	return (
		<div className="justify-center h-screen w-screen flex-col flex items-center">
			<p className="text-xl p-10 uppercase font-bold text-center">
				Pick ups for today
			</p>
			<Card className="py-4 w-full max-w-lg">
				<CardBody className="pb-0 pt-2 px-4 flex-col items-center">
					<p className="text-medium uppercase font-bold text-center">
						Total Orders: {totalOrders}
					</p>
					<p className="text-medium uppercase font-bold text-center">
						Total Items: {products.length}
					</p>
				</CardBody>
			</Card>

			<Table
				className="productTable w-full max-w-lg mt-4"
				aria-label="Pick ups"
			>
				<TableHeader>
					<TableColumn className="text-small uppercase font-bold text-center">
						SKU
					</TableColumn>
					<TableColumn className="text-small uppercase font-bold text-center">
						Name
					</TableColumn>
					<TableColumn className="text-small uppercase font-bold text-center">
						Quantity
					</TableColumn>
				</TableHeader>
				<TableBody>
					{products.map((product) => (
						<TableRow key={product.sku}>
							<TableCell className="text-left p-4">{product.sku}</TableCell>
							<TableCell className="text-left p-4">
								{product.itemName}
							</TableCell>
							<TableCell className="text-center p-4">{product.qty}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Button className="p-4 m-4" onClick={() => navigate("/")}>
				Go Back
			</Button>
		</div>
	);
};

export default PickingPage;
