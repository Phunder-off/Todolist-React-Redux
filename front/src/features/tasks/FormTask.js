import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask, updateTask } from "./tasksSlice";

const FormTask = ({ task = {}, setPopup, update }) => {
	const dispatch = useDispatch();

	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description);
	const [author, setAuthor] = useState(task.author);

	const close = () => setPopup("");
	const save = () => {
		if (update) {
			dispatch(updateTask({ id: task.id, data: { title, description, author, date: task.date, finish: task.finish } }));
		} else {
			dispatch(createTask({ title, description, author, date: Date.now(), finish: false }));
		}

		setPopup("");
	};

	return (
		<div className="formTask">
			<div>
				<div className="input-label">
					<label htmlFor="title">Titre</label>
					<input name="title" type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
				</div>
				<div className="input-label">
					<label htmlFor="title">Description</label>
					<input name="description" type="text" value={description} onChange={(e) => setDescription(e.currentTarget.value)} />
				</div>
				<div className="input-label">
					<label htmlFor="title">Auteur</label>
					<input name="author" type="text" value={author} onChange={(e) => setAuthor(e.currentTarget.value)} />
				</div>
			</div>
			<button onClick={save}>Enregister</button>
			<button onClick={close}>Fermer</button>
		</div>
	);
};

export default FormTask;
