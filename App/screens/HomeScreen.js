import { StyleSheet, View } from "react-native";

import CreateTask from "../components/CreateTask";
import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import storeFunction from "../functions/storeFunction";
import { OpenMnue } from "../components/OpenMnue";

export default function HomeScreen() {
	let [allTask, setAllTask] = useState([])
	let [editTask, setEditTask] = useState(null);
	let [openMnueData, setOpenMnueData] = useState(null);


	async function getTasksFromServer() {
		let data = await storeFunction.getAllTask()
		data && setAllTask(data)
	}

	useEffect(() => {
		getTasksFromServer()
	}, [])
	useEffect(() => {
		console.log('openMnueData = ', openMnueData);
	}, [openMnueData])


	return (
		<>
			{/*  יצירת משימה */}
			<CreateTask
				editTask={editTask}z
				setEditTask={setEditTask}
				setAllTask={setAllTask}
			/>
			{/*  תפריט נפתח (לאחר לחיצה ארוכה על משימה)  */}
			{openMnueData && <OpenMnue openMnueData={openMnueData} setOpenMnueData={setOpenMnueData} setAllTask={setAllTask} />}
			{/*  רשימת משימות */}
			<TaskList
				allTask={allTask}
				setAllTask={setAllTask}
				setEditTask={setEditTask}
				setOpenMnueData={setOpenMnueData}
				openMnueData={openMnueData}

			/>
		</>
	);
}


let styles = StyleSheet.create({

});
