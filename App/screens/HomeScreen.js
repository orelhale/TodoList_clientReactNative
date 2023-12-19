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

	let [flagSaveDate, setFlagSaveDate] = useState(false)
	let [flagSaveDate222, setFlagSaveDate222] = useState(false)
	let timeToSave = 3000;


	async function getTasksFromServer() {
		let data = await storeFunction.getAllTask()
		data && setAllTask(data)
	}

	useEffect(() => {
		getTasksFromServer()
		// ========== זה לא עובד =========
		return () => {
			if (flagSaveDate) {
				console.log("destroy component");
				storeFunction.saveData(allTask)
			}
		}
	}, [])

	useEffect(() => {
		if (flagSaveDate) {
			setTimeout(() => {
				setFlagSaveDate222(true)
			}, timeToSave)
		}
	}, [flagSaveDate])

	useEffect(() => {
		if (flagSaveDate222) {
			saveChanges()
		}
	}, [flagSaveDate222])

	useEffect(() => {
		if(openMnueData){
			console.log('openMnueData = ', openMnueData);
		}
	}, [openMnueData])

	function needToSaveChanges() {
		if (!flagSaveDate) {
			setFlagSaveDate(true)
		}
	}

	function saveChanges() {
		setFlagSaveDate(false)
		setFlagSaveDate222(false)
		storeFunction.saveData(allTask)
		console.log("---- Data saving  ----");
	}

	return (
		<>
			{/*  יצירת משימה */}
			<CreateTask
				editTask={editTask}
				setEditTask={setEditTask}
				setAllTask={setAllTask}
				needToSaveChanges={needToSaveChanges}
				/>
			{/*  תפריט נפתח (לאחר לחיצה ארוכה על משימה)  */}
			{openMnueData && <OpenMnue
				openMnueData={openMnueData} 
				setOpenMnueData={setOpenMnueData} 
				setAllTask={setAllTask} 
				setEditTask={setEditTask}
			/>}
			{/*  רשימת משימות */}
			<TaskList
				allTask={allTask}
				setAllTask={setAllTask}
				setEditTask={setEditTask}
				setOpenMnueData={setOpenMnueData}
				openMnueData={openMnueData}
				needToSaveChanges={needToSaveChanges}

			/>
		</>
	);
}


let styles = StyleSheet.create({

});
