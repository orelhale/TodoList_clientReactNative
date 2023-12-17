import { StyleSheet, Text, View, TouchableHighlight, Pressable } from "react-native";
import globalSize from "../globalStyle/globalSize";
import { CheckBox } from "@rneui/themed";
import { useEffect, useState } from "react";
import globalColor from "../globalStyle/globalColor";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons"

MIcon.loadFont();

export default function Task({
   taskData,
   style,
   indexTask,
   handleDoubleClick,
   handleCheckbox,
   // handleDelete,
   handleLongPress
}) {
   let { description, priority, is_done, id } = taskData

   return (
      <Pressable
         onPress={() => console.log("Small press")}
         // onLongPress={()=>console.log("Long press")}
         onLongPress={() => handleLongPress(taskData)}
         style={({ pressed }) => [{ backgroundColor: pressed ? globalColor.gray : 'white' }, styles.taskContainer]}
      >

         {handleCheckbox &&
            <View>
               <CheckBox
                  containerStyle={styles.checkBox}
                  checked={is_done}
                  onPress={() => handleCheckbox(id, { is_done: !is_done })}
                  size={globalSize.element}
               />

            </View>
         }
         <View style={styles.descriptionContaier}>
            <Text style={[globalSize.text2, styles.description, (is_done && styles.textAndStrikeThrough)]}>{description}</Text>
         </View>

         {/* {handleDelete && <View style={styles.icon}>
            <MIcon name="delete" color={globalColor.error} size={globalSize.element} onPress={() => { handleDelete(id) }} />
         </View>} */}

      </Pressable>
   );
}

let styles = StyleSheet.create({
   taskContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 8,
      paddingBottom: 8,
      marginTop: 2,
      marginBottom: 2,
      // flexWrap: "wrap",
      // flexDirection: 'row',
   },
   textAndStrikeThrough: {
      textDecorationLine: 'line-through'
   },
   checkBox: {
      padding: 0,
      margin: 0,
      marginLeft: 0,
      marginRight: 10,
   },
   descriptionContaier: {
      // flexWrap: "wrap",
      // flexDirection: "row",

      flexGrow: 1,
      // flexWrap: "wrap"
   },
   description: {
      // flexGrow: 1,
      // maxWidth:"100%",
      // flexWrap: "wrap"
   },

});
