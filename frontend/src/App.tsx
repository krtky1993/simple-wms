import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, PackingPage, PickingPage } from "./pages";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/picking" element={<PickingPage />} />
				<Route path="/packing" element={<PackingPage />} />
			</Routes>
		</Router>
	);
};

export default App;
