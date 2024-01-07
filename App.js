import { StyleSheet, View, Platform, StatusBar, ScrollView } from "react-native";
import HomeScreen from "./App/screens/HomeScreen";

export default function App() {

	return (
		<View style={styles.defaultStyle}>
			<View style={styles.marginScreen}>
				<HomeScreen />
			</View>
		</View>
	);
}


let styles = StyleSheet.create({
	defaultStyle: {
		// overflow: "scroll",
		flex: 1,
		backgroundColor: "#f7f7f7",
	},
	marginScreen: {
		margin: "2%",
	}
});
