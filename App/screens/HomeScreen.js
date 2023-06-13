import { StyleSheet, View } from "react-native";

import CreateTask from "../components/CreateTask";
import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import storeFunction from "../functions/storeFunction";

export default function HomeScreen() {
	let [allTask, setAllTask] = useState([])
	let [editTask, setEditTask] = useState(null);


	async function getTasksFromServer() {
		let data = await storeFunction.getAllTask()
		data && setAllTask(data)
	}

	useEffect(() => {
		getTasksFromServer()
	}, [])


	return (
		<>
			<CreateTask editTask={editTask} setEditTask={setEditTask} setAllTask={setAllTask} />
			<View style={styles.marginView} />
			<TaskList allTask={allTask} setAllTask={setAllTask} setEditTask={setEditTask} />
		</>
	);
}


let styles = StyleSheet.create({
	marginView: {
		marginTop: 10,
	}
});
