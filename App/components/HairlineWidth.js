import { StyleSheet, View } from "react-native";

export default function HairlineWidth({style}) {
   return (
      <View style={[styles.HairlineWidth, style]} />
   );
}

let styles = StyleSheet.create({
   HairlineWidth: {
      // borderWidth: 0.2,
      marginTop: 2,
      marginBottom: 2,
      marginLeft: 10,
      marginRight: 10,
      borderBottomColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
   },
});
