import { StyleSheet, View, Platform, StatusBar } from "react-native";
import HomeScreen from "./App/screens/HomeScreen";

export default function App() {

	return (
		<View style={styles.defaultStyle}>
			<HomeScreen />
		</View>
	);
}


let styles = StyleSheet.create({
	defaultStyle: {
		padding: "2%",
		overflow: "scroll"
	},
});
