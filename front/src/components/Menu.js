import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTasks, selectTasksAll, selectTasksSelected } from "../features/tasks/tasksSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Popup from "./Popup";
import FormTask from "../features/tasks/FormTask";
import FormFilterTask from "../features/tasks/FormFilterTask";

const Menu = () => {
	const dispatch = useDispatch();

	const tasksSelected = useSelector(selectTasksSelected);

	const tasks = useSelector(selectTasksAll);

	const [popup, setPopup] = useState();

	const actionReloadTask = () => dispatch(fetchTasks());
	const actionDeleteTask = () => tasksSelected.map((tasksId) => dispatch(deleteTask(tasksId)));

	const actionNewTask = () => setPopup(<Popup component={<FormTask setPopup={setPopup} />} update={false} />);
	const actionUpdateTask = () => tasksSelected.length > 0 && setPopup(<Popup component={<FormTask task={tasks.find((task) => task.id === tasksSelected[0])} setPopup={setPopup} update={true} />} />);

	const actionFilterTask = () => setPopup(<Popup component={<FormFilterTask setPopup={setPopup} />} />);

	return (
		<div id="menu">
			{popup}
			<button type="button" onClick={actionReloadTask}>
				<FontAwesomeIcon icon={solid("rotate")} />
				<span> Recharger</span>
			</button>
			<button type="button" onClick={actionNewTask}>
				<FontAwesomeIcon icon={solid("plus")} />
				<span> Ajouter une tache</span>
			</button>
			<button type="button" onClick={actionDeleteTask}>
				<FontAwesomeIcon icon={solid("trash")} />
				<span> Supprimer</span>
			</button>
			<button type="button" onClick={actionUpdateTask}>
				<FontAwesomeIcon icon={solid("pen-to-square")} />
				<span> Mettre a jour</span>
			</button>
			<button type="button" onClick={actionFilterTask}>
				<FontAwesomeIcon icon={solid("filter")} />
				<span> Filtrer</span>
			</button>
		</div>
	);
};

export default Menu;
