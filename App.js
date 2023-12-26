import { StyleSheet, View, Platform, StatusBar, ScrollView } from "react-native";
import HomeScreen from "./App/screens/HomeScreen";

export default function App() {

	return (
		<View style={styles.defaultStyle}>
			<ScrollView>
				<HomeScreen />
			</ScrollView>
		</View>
	);
}


let styles = StyleSheet.create({
	defaultStyle: {
		margin: "2%",
		overflow: "scroll",
		flex:1,
		
	},
});
