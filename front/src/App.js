import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Menu from "./components/Menu";

import Navbar from "./components/Navbar";

import TasksList from "./features/tasks/TasksList";

import { fetchTasks } from "./features/tasks/tasksSlice";

import "./css/index.css";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch]);

	return (
		<>
			<header>
				<Navbar />
			</header>
			<main>
				<Menu />
				<TasksList />
			</main>
		</>
	);
}

export default App;
