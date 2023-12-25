import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import globalSize from "../globalStyle/globalSize";
import globalColor from "../globalStyle/globalColor";


export default function CategoriesList({ categories, setSelectedCategory, setOpenMnueData }) {

   let [list, setList] = useState([])

   useEffect(() => {
      if (categories && categories.length) {
         setList(categories)
      }
   }, [categories])

   return (
      <View>
         {list.map((cat, index) =>
            <View style={styles.TaskList}>
               <Text
                  style={[globalSize.text2, (index < list.length - 1) && styles.buttonBorder, styles.taskContainer]}
                  onPress={() => setSelectedCategory(cat)}
                  onLongPress={() => setOpenMnueData(cat)}
               >
                  {cat || ""}
               </Text>
            </View>
         )}
      </View>
   )
}


let styles = StyleSheet.create({
   TaskList: {
      marginLeft: 10,
   },
   buttonBorder: {
      marginTop: 2,
      marginBottom: 2,
      marginRight: 10,
      borderBottomColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
   },
   taskContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 8,
      paddingBottom: 8,
      marginTop: 2,
      marginBottom: 2,
   },

})