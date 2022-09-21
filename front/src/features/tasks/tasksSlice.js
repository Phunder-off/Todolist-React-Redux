import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_LINK = "http://localhost:3000/tasks/";

const initialState = {
	tasks: [],
	status: { state: "idle", message: "" },
	filter: "all",
	tasksSelected: [],
};

const isPending = (action) => action.type.endsWith("pending");
const isFulfilled = (action) => action.type.endsWith("fulfilled");
const isRejected = (action) => action.type.endsWith("rejected");

const withReloadTasks = async (request) => {
	try {
		await request();
	} catch (error) {
		return error;
	}
	return (await axios.get(API_LINK)).data;
};

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => (await axios.get(API_LINK)).data);

export const createTask = createAsyncThunk("tasks/create", async (data) => await withReloadTasks(() => axios.post(API_LINK, data)));

export const deleteTask = createAsyncThunk("tasks/delete", async (id) => await withReloadTasks(() => axios.delete(API_LINK + id)));

export const updateTask = createAsyncThunk("tasks/update", async ({ id, data }) => await withReloadTasks(() => axios.put(`${API_LINK}${id}`, data)));

export const finishTask = createAsyncThunk("tasks/finish", async ({ id, data }) => await withReloadTasks(() => axios.patch(`${API_LINK}${id}`, data)));

export const tasksSlice = createSlice({
	name: "tasks",
	initialState,

	reducers: {
		select: (state, action) => {
			state.tasksSelected.push(action.payload);
		},
		unSelect: (state, action) => {
			state.tasksSelected.splice(state.tasksSelected.indexOf(action.payload), 1);
		},
		filter: (state, action) => {
			state.filter = action.payload;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(deleteTask.fulfilled, (state) => {
				state.tasksSelected = [];
			})
			.addMatcher(isFulfilled, (state, action) => {
				let newState = state;

				newState.tasks = action.payload;
				newState.status.state = "idle";

				return newState;
			})
			.addMatcher(isPending, (state) => {
				state.status.state = "loading";
			})
			.addMatcher(isRejected, (state) => {
				state.status = { state: "failed", message: "Echec de la recuperation des données" };
			});
	},
});

export const selectTasksAll = (state) => state.tasks.tasks;
export const selectTasksStatus = (state) => state.tasks.status;
export const selectTasksSelected = (state) => state.tasks.tasksSelected;
export const selectTasksFilter = (state) => state.tasks.filter;

export const { select, unSelect, filter } = tasksSlice.actions;

export default tasksSlice.reducer;
