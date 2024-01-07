import { StyleSheet, View } from "react-native";
import { Button } from '@rneui/themed';
import globalSize from "../globalStyle/globalSize";

export default function AppButton({ title = "", onPress, type = "solid", buttonStyle = {}, titleStyle = {}, style = {} }) {
	// let styleButton = [styles.roundButton]
	let SquareType = [1, 2]
	let roundType = [3, 4]
	let buttonShape = roundType.includes(type) ? styles.roundButton : styles.SquareType

	let buttonDesign = [2, 4].includes(type) ? "outline" : "solid";

	let allButtonStyle = [buttonShape, buttonStyle, (buttonDesign == "solid" ? styles.backgroundBlue : styles.backgroundWhite), style]
	let allTitleStyle = [styles.titleStyle]
	return (
		<Button
			title={title}
			buttonStyle={allButtonStyle}
			titleStyle={globalSize.text1}
			onPress={onPress && onPress}
			type={buttonDesign}
		/>
	);
}


let styles = StyleSheet.create({
	roundButton: {
		borderRadius: 50,
		padding: 0,
		minWidth: 35,
		height: 35,
	},
	squareButton: {
		padding: 0,
		height: 35,
	},
	backgroundBlue: {
		backgroundColor: "#1890FF",
		borderColor: "#1890FF",
	},
	backgroundWhite: {
		backgroundColor: "#FFF",
	},

	// squareButton :{
	// 	padding: 8px,
	// 	background-color: #fff,
	// 	color: #1890FF,
	// 	border: 1px solid #1890FF,
	// 	width: 100px,
	// 	margin-left: 10px,
	// 	border-radius: 4px,
	// 	display: flex,
	// 	justify-content: center,
	// 	align-items: center,
	// },
	// squareSelectButton :{
	// 	padding: 8.5px,
	// 	background-color: #1890FF,
	// 	color: #fff,
	// 	/* border: 1px solid #fff, */
	// 	border: none,
	// 	width: 100px,
	// 	margin-left: 10px,
	// 	border-radius: 4px,
	// 	display: flex,
	// 	justify-content: center,
	// 	align-items: center,
	// }
});
