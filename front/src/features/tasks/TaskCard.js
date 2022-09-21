import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { finishTask, select, selectTasksSelected, unSelect } from "./tasksSlice";

const TaskCard = ({ taskData }) => {
	const { id, title, date, description, author, finish } = taskData;
	const dispatch = useDispatch();

	const tasksSelected = useSelector(selectTasksSelected);

	const cardClick = () => (tasksSelected.includes(id) ? dispatch(unSelect(id)) : dispatch(select(id)));
	const actionFinish = () => dispatch(finishTask({ id, data: { finish: (!(finish === "true")).toString() } }));

	return (
		<div className="card" data-selected={tasksSelected.includes(id)} onClick={cardClick}>
			<div className="card-header">
				<h3>{title}</h3>
				<span>{date}</span>
			</div>
			<div className="card-body">
				<p>{description}</p>
			</div>
			<div className="card-footer">
				<span>{author}</span>
				<button data-finish={finish} onClick={actionFinish}>
					{finish === "true" ? "Fait" : "A faire"}
				</button>
			</div>
		</div>
	);
};

export default TaskCard;
