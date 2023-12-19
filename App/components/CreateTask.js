import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, } from "react-native";
import Button from "./AppButton";
import globalSize from "../globalStyle/globalSize";


export default function CreateTask({ editTask, setEditTask, setAllTask,needToSaveChanges }) {

	const [description, setDescription] = useState("");
	const [borderStyle, setBorderStyle] = useState({});
	const [priority, setPriority] = useState(1)
	

	useEffect(() => {
		if (editTask) {
			console.log("editTask============ ",editTask);
			setDescription(editTask.description)
			setPriority(editTask.priority)
		}
	}, [editTask])


	function handleOnChangeText(text) {
		setDescription(text)

		if (text && borderStyle.borderColor)
			setBorderStyle({})

	}


	async function handleOnPress() {
		try {

			if (description == "") {
				setBorderStyle({ borderColor: "red" })
				return;
			}

			let task = editTask || {}

			task.description = description
			task.priority = priority
			task.is_done = false;
			task.id = Math.round(new Date().getTime() / 1000);

			if (editTask) {
				setAllTask((tasks)=>[...tasks])
			} else {
				// newTaskList = 
				// await storeFunction.addTask(coptAllTask)
				setAllTask((tasks)=>{
					let copyTasks = [...tasks]
					console.log("tasks.length 1 ==== ", copyTasks.length);
					copyTasks.push(task)
					console.log("tasks.length 2 ==== ", copyTasks.length);
					return copyTasks
				})
			}
			setEditTask(null)
			setPriority(1)
			setDescription("")
			needToSaveChanges()

		} catch (error) {
			console.log("Error: handleOnPress = ", error);
		}
	}


	return (
		<>
			<View style={styles.addTaskContainer}>
				<TextInput
					style={[styles.input, globalSize.text1, borderStyle]}
					multiline
					onChangeText={handleOnChangeText}
					value={description}
					placeholder={"New task"}
				/>
				<Button title="+" type={3} onPress={handleOnPress} />
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
