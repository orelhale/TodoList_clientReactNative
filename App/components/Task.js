import { StyleSheet, Text, View, Pressable } from "react-native";
import globalSize from "../globalStyle/globalSize";
import { CheckBox } from "@rneui/themed";
import globalColor from "../globalStyle/globalColor";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons"
import globalElement from "../globalStyle/globalElement";

MIcon.loadFont();

export default function Task({
   taskData,
   handleCheckbox,
   handleLongPress,
   isLast,
}) {
   let { description, priority, is_done, id } = taskData

   return (
      <Pressable
         onLongPress={() => handleLongPress(taskData)}
         style={({ pressed }) => [
            globalElement.allListItemWrap,
            globalElement.allListItemText,
            styles.taskContainer,
            (isLast && styles.lastItem),
            ({ backgroundColor: pressed ? globalColor.gray : 'white' })
         ]}
      >

         {handleCheckbox && <View>
            <CheckBox
               containerStyle={styles.checkBox}
               checked={is_done}
               onPress={() => {
                  handleCheckbox(taskData)
               }}
               size={globalSize.element}
            />
         </View>}

         <View style={[styles.descriptionContaier]}>
            <Text style={[globalElement.allListItemText, styles.description, (is_done && styles.textAndStrikeThrough)]}>{description}</Text>
         </View>

      </Pressable>
   );
}

let styles = StyleSheet.create({
   taskContainer: {
      // flexDirection: "row",
      // alignItems: "center",
      // paddingTop: 8,
      // paddingBottom: 8,
      // marginTop: 2,
      // marginBottom: 2,

      // flexWrap:"wrap",
      // flexDirection: 'row',
   },
   textAndStrikeThrough: {
      textDecorationLine: 'line-through'
   },
   checkBox: {
      padding: 0,
      margin: 0,
      marginLeft: 0,
      paddingRight: 1,
      paddingTop: 4,
      paddingLeft: 5,
      paddingBottom: 2,
      borderRadius: 20,
   },
   descriptionContaier: {
      // flexWrap: "wrap",
      // flexDirection: "row",

      flexGrow: 1,
      flex: 1,
      // flexWrap: "wrap"
   },
   description: {
      // flexGrow: 1,
      // maxWidth:"100%",
      // flexWrap: "wrap"
   },
   lastItem: {
      paddingBottom: 10,
   },

});


