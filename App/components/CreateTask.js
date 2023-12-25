import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, } from "react-native";
import Button from "./AppButton";
import globalSize from "../globalStyle/globalSize";


export default function CreateTask({
	editTask,
	setEditTask,
	setAllTask,
	needToSaveChanges,
	selectedCategory,
	allData,
	setAllData,
}) {

	const [description, setDescription] = useState("");
	const [borderStyle, setBorderStyle] = useState({});
	const [priority, setPriority] = useState(1)

	useEffect(() => {
		if (editTask) {
			setDescription(selectedCategory ? editTask.description : editTask)
			setPriority(editTask.priority)
		}
	}, [editTask])


	useEffect(() => {
		setEditTask(null)
		setPriority(1)
		setDescription("")
	}, [selectedCategory])


	function handleOnChangeText(text) {
		setDescription(text)

		if (text && borderStyle.borderColor)
			setBorderStyle({})

	}

	function categoryHandle() {
		try {
			let copyAllData = { ...allData }
			if (editTask) { // עריכת קטגוריה
				copyAllData[description] = [...copyAllData[editTask]]
				delete copyAllData[editTask]
				setAllData(copyAllData)
			}
			else { // יצירת קטגוריה
				copyAllData[description] = []
				setAllData(copyAllData)
			}
			needToSaveChanges(copyAllData)
		} catch (error) {
			console.log("Error: categoryHandle = ", error);
		}
	}

	function taskHandle() {
		try {
			let task = editTask || {}
			task.description = description
			task.priority = priority
			task.is_done = false;
			task.id = Math.round(new Date().getTime() / 1000);

			if (editTask) { // עריכת משימה
				setAllTask((tasks) => [...tasks])
			} else { // יצירת משימה
				let copyAllData = { ...allData }
				// console.log("copyAllData[selectedCategory].length 1 ==== ", copyAllData[selectedCategory].length);
				copyAllData[selectedCategory].push(task)
				// console.log("copyAllData[selectedCategory].length 2 ==== ", copyAllData[selectedCategory].length);
				setAllData(copyAllData)
				setAllTask([...copyAllData[selectedCategory]])
			}
			needToSaveChanges()
		} catch (error) {
			console.log("Error: taskHandle = ", error);
		}
	}

	async function ceateOrEdit() {


		// אם הקלט ריק - אז יש התראה
		if (description == "")
			return setBorderStyle({ borderColor: "red" })

		if (selectedCategory) {
			taskHandle()
		} else {
			categoryHandle()
		}

		setEditTask(null)
		setPriority(1)
		setDescription("")
	}


	return (
		<>
			<View style={styles.addTaskContainer}>
				<TextInput
					style={[styles.input, globalSize.text1, borderStyle]}
					multiline
					onChangeText={handleOnChangeText}
					value={description}
					placeholder={selectedCategory ? "New task" : "New category"}
				/>
				<Button title="+" type={3} onPress={ceateOrEdit} />
			</View>
		</>
	);
}



let styles = StyleSheet.create({
	input: {
		padding: 5,
		paddingLeft: 10,

		borderWidth: 1,
		borderRadius: 3,
		width: "90%",
		marginRight: 5,
	},
	addTaskContainer: {
		justifyContent: "center",
		flexDirection: 'row',
	},

});
