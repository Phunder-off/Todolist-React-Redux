import React from "react";
import { useSelector } from "react-redux";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Popup from "../../components/Popup";

import TaskCard from "./TaskCard";
import { selectTasksAll, selectTasksFilter, selectTasksStatus } from "./tasksSlice";

const TasksList = () => {
	const tasks = useSelector(selectTasksAll);
	const tasksStatus = useSelector(selectTasksStatus);

	const currentFilter = useSelector(selectTasksFilter);

	return (
		<div id="tasks-list">
			{tasksStatus.state === "loading" && <Popup component={<Loader />} />}
			{tasksStatus.state === "failed" && <Popup component={<Message title="Erreur" message={tasksStatus.message} />} />}

			{tasks
				.filter((task) => task.finish === currentFilter || currentFilter === "all")
				.map((taskData) => (
					<TaskCard key={`card_${taskData.id}`} taskData={taskData} />
				))}
		</div>
	);
};

export default TasksList;
