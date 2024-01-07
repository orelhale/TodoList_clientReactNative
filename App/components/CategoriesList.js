import { useEffect } from "react";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import globalElement from "../globalStyle/globalElement";


export default function CategoriesList({ categories, setSelectedCategory, setOpenMnueData }) {

   let [list, setList] = useState([])

   useEffect(() => {
      if (categories && categories instanceof Array) {
         setList(categories)
      }
   }, [categories])

   return (
      <View style={styles.container}>
         {(!list || !list.length) && <Text style={globalElement.noItems}>No items</Text>}
         
         {list.map((cat, index) =>
            <>
               <Pressable
                  style={({ pressed }) => [
                     globalElement.allListItemWrap,
                     (index >= list.length - 1 && styles.lastItem),
                     ({ backgroundColor: pressed ? globalColor.gray : 'white' })
                  ]}
                  onLongPress={() => setOpenMnueData(cat)}
                  onPress={() => setSelectedCategory(cat)}
               >
                  <Text style={[globalElement.allListItemText, styles.taskContainer]}>{cat || ""}</Text>
               </Pressable>
               {index < list.length - 1 && <View style={globalElement.bottomBorder} />}
            </>
         )}
      </View>
   )
}


let styles = StyleSheet.create({
   taskContainer: {
      // display:"flex",
      // flexDirection: "row",
      // alignItems: "center",
      // paddingTop: 8,
      // paddingBottom: 8,
      // marginTop: 2,
      // marginBottom: 2,
   },
   lastItem: {
      paddingBottom: 10,
   },
   container: {
      marginTop:10
   },
})