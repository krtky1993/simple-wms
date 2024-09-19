import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
const HomePage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="justify-center h-screen w-screen flex-col flex items-center">
			<p className="text-4xl p-10  font-bold text-center">Welcome!</p>
			<p className="text-2xl p-10  font-bold text-center">
				Select your function
			</p>
			<div className="flex-row">
				<Button
					color="primary"
					className="p-4 m-4"
					onClick={() => navigate("/picking")}
				>
					Picking
				</Button>
				<Button
					color="primary"
					className="p-4 m-4"
					onClick={() => navigate("/packing")}
				>
					Packing
				</Button>
			</div>
		</div>
	);
};

export default HomePage;
