import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, I18nManager } from "react-native";

import CreateTask from "../components/CreateTask";
import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import storeFunction from "../functions/storeFunction";
import { OpenMnue } from "../components/OpenMnue";
import CategoriesList from "../components/CategoriesList";
import { Button } from "@rneui/base";
import globalColor from "../globalStyle/globalColor";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons"
import globalSize from "../globalStyle/globalSize";
import app_json from "../../app.json";

export default function HomeScreen() {
	let [allData, setAllData] = useState(null)
	let [allTask, setAllTask] = useState(null)
	let [categories, setCategories] = useState()
	let [selectedCategory, setSelectedCategory] = useState()
	let [editTask, setEditTask] = useState(null);
	let [openMnueData, setOpenMnueData] = useState(null);

	let [flagSaveDate, setFlagSaveDate] = useState(false)
	let [flagSaveDate222, setFlagSaveDate222] = useState(false)

	let timeToSave = 3000;

	useEffect(() => {
		getTasksFromServer()
		console.log("app_json ===== ", app_json);
		// ========== זה לא עובד =========
		return () => {
			if (flagSaveDate) {
				console.log("destroy component");
				storeFunction.saveAllData(allData)
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
		if (openMnueData) {
			console.log('openMnueData = ', openMnueData);
		}
	}, [openMnueData])

	useEffect(() => {
		if (allData) {
			let keyList = Object.keys(allData)
			setCategories(keyList)
		}
	}, [allData])

	useEffect(() => {
		if (categories) {
			console.log("categories ==== ", categories);
			for (let c of categories) {
				console.log(c + " = " + allData[c].length);
			}
		}
	}, [categories])

	useEffect(() => {
		if (selectedCategory) {
			setAllTask([...allData[selectedCategory]])
		} else {

			console.log("allData==== ", allData);
		}
	}, [selectedCategory])

	useEffect(() => {
		if (allTask) {
			console.log("allTask==== ", allTask);
		}
	}, [allTask])


	let [isRTL, setIsRTL] = useState(I18nManager.isRTL)


	function needToSaveChanges(data) {
		if (data) {
			return saveChanges(data)
		}
		if (!flagSaveDate) {
			setFlagSaveDate(true)
		}
	}

	async function getTasksFromServer() {
		let data = await storeFunction.getAllData()
		// data && setAllTask(data)
		data && setAllData(data)
	}

	function saveChanges(data) {
		setFlagSaveDate(false)
		setFlagSaveDate222(false)
		storeFunction.saveAllData(data || allData)
		console.log("---- Data saving  ----");
	}

	return (
		<View style={styles.container}>

			{/*  יצירת משימה */}
			<CreateTask
				editTask={editTask}
				setEditTask={setEditTask}
				setAllTask={setAllTask}
				needToSaveChanges={needToSaveChanges}
				selectedCategory={selectedCategory}
				allData={allData}
				setAllData={setAllData}
				app_json={app_json}
			/>
			{/* לחצן חזר */}
			{(allTask && selectedCategory) &&
				<View style={isRTL && styles.ltr}>
					<Pressable onPress={() => setSelectedCategory()} style={({ pressed }) => [styles.retrunButton, { backgroundColor: pressed ? globalColor.gray : 'white' }]}>
						<MIcon
							// name="arrow-left-thick"
							// name="arrow-left"
							// name="keyboard-return"
							name="keyboard-backspace"
							size={globalSize.smallButtonIcon}
							color={globalColor.primary}
						/>
					</Pressable>
				</View>
			}
			{/*  תפריט נפתח (לאחר לחיצה ארוכה על משימה)  */}
			{openMnueData && <OpenMnue
				openMnueData={openMnueData}
				setOpenMnueData={setOpenMnueData}
				setAllTask={setAllTask}
				setEditTask={setEditTask}
				needToSaveChanges={needToSaveChanges}
				allData={allData}
				selectedCategory={selectedCategory}
				setAllData={setAllData}
			/>}

			<ScrollView>
				{/*  רשימת קטגוריות */}
				{(categories && !selectedCategory) && <CategoriesList
					categories={categories}
					setSelectedCategory={setSelectedCategory}
					setOpenMnueData={setOpenMnueData}
				/>}
	
				{/*  רשימת משימות */}
				{(allTask && selectedCategory) && <TaskList
					allTask={allTask}
					setAllTask={setAllTask}
					setEditTask={setEditTask}
					setOpenMnueData={setOpenMnueData}
					openMnueData={openMnueData}
					needToSaveChanges={needToSaveChanges}
				/>}
			</ScrollView>
		</View>
	);
}


let styles = StyleSheet.create({
	container: {
		overflow: "scroll",
	},
	retrunButton: {
		// borderRadius:1,
		flexDirection: 'row',
		borderRadius: 20,
		borderWidth: 0.5,
		// padding: 5,
		width: 35,
		height: 35,
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
		marginRight: 'auto',
		backgroundColor: "#FFF",
		borderColor: "#1890FF",
	},
	retrunButtonText: {
		fontSize: 20,
		color: "#1890FF",
	},
	ltr: {
		display: "flex",
		flexDirection: "row-reverse",
	},
});




