import React, { useEffect, useState } from "react";
import axios from "axios";
import { Order } from "../types";

import { Accordion, AccordionItem } from "@nextui-org/react";

import { Card, CardBody, Button, Divider } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/progress";
import { useNavigate } from "react-router-dom";

const PackingPage: React.FC = () => {
	const navigate = useNavigate();
	const [orders, setOrders] = useState<Order[]>([]);
	const [totalOrders, setTotalOrders] = useState(0);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);

		const day = date.getDate();
		const month = date.toLocaleString("default", { month: "long" });
		const year = date.getFullYear();

		// Determine the day suffix (e.g., "st", "nd", "rd", "th")
		const daySuffix =
			day % 10 === 1 && day !== 11
				? "st"
				: day % 10 === 2 && day !== 12
				? "nd"
				: day % 10 === 3 && day !== 13
				? "rd"
				: "th";

		return `${day}${daySuffix} ${month}, ${year}`;
	};

	useEffect(() => {
		const fetchOrders = async (date: string = "2024-09-02") => {
			try {
				const response = await axios.get(
					`http://localhost:8000/orders/packing?date=${date}`
				);
				setOrders(response.data.orders);
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
			<p className="text-4xl p-10 uppercase font-bold text-center">
				Order Details
			</p>
			<Card className="py-4 w-full max-w-lg">
				<CardBody className="pt-2 px-4 flex-col items-center">
					<p className="text-2xl uppercase font-bold text-center">
						Total Orders: {totalOrders}
					</p>
				</CardBody>
			</Card>
			<div className="flex flex-row py-10 justify-center w-full max-w-lg">
				<Accordion variant="splitted">
					{orders.map((order) => {
						return (
							<AccordionItem
								key={order.orderId}
								aria-label={order.orderId}
								title={
									<h3 className="text-center text-lg font-bold">
										{order.orderId}
									</h3>
								}
							>
								<Card className="py-4 w-full max-w-lg">
									<CardBody className="pt-2 px-4 flex-col items-left">
										<p className="text-medium font-bold text-left">
											Order Date: {formatDate(order.orderDate)}
										</p>
										<Divider className="my-4" />
										<div className="mb-2">
											<p className="font-bold">Line Items:</p>
											{order.lineItems.map((product) => {
												return (
													<Accordion variant="splitted">
														<AccordionItem
															className="my-1"
															key={product.productId}
															aria-label={product.productName}
															title={
																<div className="flex justify-between items-center">
																	<p className="text-left">
																		{product.productName}
																	</p>
																	{product.qty && (
																		<p className="text-right">
																			Qty: {product.qty}
																		</p>
																	)}
																</div>
															}
														>
															<Card className="py-4 w-full max-w-lg">
																<CardBody className="py-2 px-4 flex-col items-left">
																	<div className="mb-2">
																		<p className="font-bold">Items:</p>
																		{product.items?.map((item) => {
																			console.log(JSON.stringify(product));
																			return <p>{item.itemName}</p>;
																		})}
																	</div>
																</CardBody>
															</Card>
														</AccordionItem>
													</Accordion>
												);
											})}
										</div>
										<Divider className="my-4" />
										<div className="mb-2">
											<p className="font-bold">Ships To:</p>
											<p>Name: {order.customerName}</p>
											<p>Email: {order.customerEmail}</p>
											<p>Address: {order.shippingAddress}</p>
										</div>
									</CardBody>
								</Card>
							</AccordionItem>
						);
					})}
				</Accordion>
			</div>
			<Button className="p-4 m-4" onClick={() => navigate("/")}>
				Go Back
			</Button>
		</div>
	);
};

export default PackingPage;
