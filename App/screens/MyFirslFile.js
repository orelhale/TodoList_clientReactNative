import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  StatusBar,
  TouchableNativeFeedback,
  ImageBackground,
  TouchableHighlight,
  Button,
} from "react-native";

export default function MyFirslFile() {
  let handlePress = () => console.log(Platform.OS);
  let handlePressImage = () =>
    console.log("StatusBar.currentHeight = ", StatusBar.currentHeight);

  return (
    <View style={styles.containerMyFirslFile}>
      <ImageBackground
        source={{ uri: "https://picsum.photos/200/400" }}
        style={{ alignItems: "center",flex:1 }}
        resizeMode="contain"
      >
        <View style={{ top: 30, alignItems: "center" }}>
          <TouchableHighlight
            onPress={handlePressImage}
            style={{ width: 200, height: 300 }}
          >
            <Image
              source={{
                uri: "https://picsum.photos/200/300",
                width: 200,
                height: 300,
              }}
              // style={{top:30}}
            />
          </TouchableHighlight>

          <Text onPress={handlePress}>Open orel app 2</Text>
        </View>
      </ImageBackground>
      <Button
        title="sff"
        backgroundColor="yellow"
        style={{ width: "100%", height: 30, color: "yellow" }}
      />
      <Button title="s" buttonStyle={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerMyFirslFile: {
   //  //  backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  button: {
    borderColor: "yellow",
    color: "yellow",
  },
});
