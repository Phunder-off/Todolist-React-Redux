import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTasksFilter, filter } from "./tasksSlice";

const FormFilterTask = ({ setPopup }) => {
	const dispatch = useDispatch();
	const currentFilter = useSelector(selectTasksFilter);

	const [filterSelected, setFilterSelected] = useState(currentFilter);

	const actionSelectFilter = (e) => setFilterSelected(e.currentTarget.value);

	const save = (e) => {
		e.preventDefault();
		dispatch(filter(filterSelected));
		setPopup("");
	};

	const close = (e) => {
		e.preventDefault();
		setPopup("");
	};

	return (
		<form className="formTask">
			<h2>Filtrer les tâches</h2>
			<div>
				<div className="radio_group">
					<input type="radio" name="filter" value="all" defaultChecked={currentFilter === "all"} onClick={actionSelectFilter} />
					<label htmlFor="filter_all">Tout</label>
				</div>

				<div className="radio_group">
					<input type="radio" name="filter" value="true" defaultChecked={currentFilter === "true"} onClick={actionSelectFilter} />
					<label htmlFor="filter_true">Fait</label>
				</div>

				<div className="radio_group">
					<input type="radio" name="filter" value="false" defaultChecked={currentFilter === "false"} onClick={actionSelectFilter} />
					<label htmlFor="filter_false">A faire</label>
				</div>
			</div>

			<button onClick={save}>
				<i className="fa fa-filter" aria-hidden="true"></i> Filtrer
			</button>
			<button onClick={close}>
				<i className="fa fa-close" aria-hidden="true"></i> Annuler
			</button>
		</form>
	);
};

export default FormFilterTask;
