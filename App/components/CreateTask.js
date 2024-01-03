import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import Button from "./AppButton";
import globalSize from "../globalStyle/globalSize";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons"
import globalColor from "../globalStyle/globalColor";
import Popup from "./Popup";


export default function CreateTask({
	editTask,
	setEditTask,
	setAllTask,
	needToSaveChanges,
	selectedCategory,
	allData,
	setAllData,
	app_json,
}) {

	const [description, setDescription] = useState("");
	const [borderStyle, setBorderStyle] = useState({});
	const [priority, setPriority] = useState(1)
	const [isPopupVisible, setIsPopupVisible] = useState(false);
	const [countClicks, setCountClicks] = useState(0);

	useEffect(() => {
		if (editTask) {
			setDescription(selectedCategory ? editTask.description : editTask)
			setPriority(editTask.priority)
		}
	}, [editTask])
	useEffect(() => {
		if (countClicks >= 5) {
			setCountClicks(0)
			setIsPopupVisible(true)
		}
	}, [countClicks])


	useEffect(() => {
		setEditTask(null)
		setPriority(1)
		setDescription("")
		setBorderStyle({})
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
				copyAllData[selectedCategory].push(task)
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
		if (description == "") {
			setCountClicks(countClicks + 1)
			return setBorderStyle({ borderColor: "red" })
		}
		countClicks != 0 && setCountClicks(0)

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
				{editTask
					? <MIcon
						name="pencil-circle"
						size={globalSize.buttonIcon}
						color={globalColor.primary}
						onPress={ceateOrEdit}
					/>
					: <Button title="+" type={3} onPress={ceateOrEdit} />
				}
				<Popup isPopupVisible={isPopupVisible} setIsPopupVisible={setIsPopupVisible} >
					<Text style={{ fontWeight: "bold" }}>Develop by: {app_json.expo.owner}</Text>
					<Text style={{ fontWeight: "bold" }}>Version: {app_json.expo.version}</Text>
				</Popup>
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
		backgroundColor: "#FFF",
		flex: 1,
		marginRight: 5,
	},
	addTaskContainer: {
		justifyContent: "center",
		flexDirection: 'row',
	},

});
