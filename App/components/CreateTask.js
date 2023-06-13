import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, } from "react-native";
import Button from "./AppButton";
import globalSize from "../globalStyle/globalSize";
import storeFunction from "../functions/storeFunction";


export default function CreateTask({ editTask, setEditTask, setAllTask }) {

	const [description, setDescription] = useState("");
	const [borderStyle, setBorderStyle] = useState({});
	const [priority, setPriority] = useState(1)


	useEffect(() => {
		if (editTask) {
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

			console.log("description = ", description);
			if (description == "") {
				setBorderStyle({ borderColor: "red" })
				return;
			}

			let dataToServer = editTask || {}

			dataToServer.description = description
			dataToServer.priority = priority
			dataToServer.is_done = false;
			dataToServer.id = new Date().getTime();

			let newTaskList = []
			if (editTask) {
			} else {
				newTaskList = await storeFunction.addTask(dataToServer)
			}
			console.log("newTaskList= ", newTaskList);
			setAllTask(newTaskList)
			setEditTask(null)
			setPriority(1)
			setDescription("")

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
