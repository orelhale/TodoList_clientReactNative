import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import globalElement from "../globalStyle/globalElement";


export default function CategoriesList({ categories, setSelectedCategory, setOpenMnueData }) {

   let [list, setList] = useState([])

   useEffect(() => {
      if (categories && categories.length) {
         setList(categories)
      }
   }, [categories])

   return (
      <>
         {list.map((cat, index) =>
            <>
               <View style={globalElement.allListItemWrap}>
                  <Text
                     style={[globalElement.allListItemText, styles.taskContainer]}
                     onPress={() => setSelectedCategory(cat)}
                     onLongPress={() => setOpenMnueData(cat)}
                  >
                     {cat || ""}
                  </Text>
               </View>
               {index < list.length - 1 && <View style={globalElement.bottomBorder} />}
            </>
         )}
      </>
   )
}


let styles = StyleSheet.create({
   taskContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 8,
      paddingBottom: 8,
      marginTop: 2,
      marginBottom: 2,
   },

})