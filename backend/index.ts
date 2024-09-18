import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";

import { PORT } from "./config";
import {products, orders} from "./routes";

const app: Express = express();
app.use(express.json());

const corsOptions = {
	origin: ["http://localhost:5173"],
	methods: ["GET", "PUT", "POST", "DELETE", "HEAD", "PATCH"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (request, response) => {
	console.log(request);
	return response.status(200).send({ message: "BASE GET CALL" });
});

app.use("/products", products);
app.use("/orders", orders);

app.listen(PORT, () => {
	console.log("App running on port: ", PORT);
});
