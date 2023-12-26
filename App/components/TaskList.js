import { useEffect, useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import AppButton from "./AppButton";
import Task from "./Task";
import globalElement from "../globalStyle/globalElement";

export default function TaskList({
   allTask = [],
   setAllTask,
   setEditTask,
   setOpenMnueData,
   openMnueData,
   needToSaveChanges,
}) {

   let [list, setList] = useState([])
   let [listOfDisplayOptions, setListOfDisplayOptions] = useState(null)
   let [optionSelected, setOptionSelected] = useState("All")

   let [currentPage, setCurrentPage] = useState(1)

   let displayOptions = ["All", "Todo", "Done"]
   const amountToShow = 40;

   let pagesNum = listOfDisplayOptions ? Math.ceil((listOfDisplayOptions[optionSelected].length) / amountToShow) : 0;

   useEffect(() => {
      if (allTask[0]) {
         let todoArr = [], doneArr = [];

         allTask.forEach((task) => {
            if (task.is_done)
               doneArr.push(task)
            else
               todoArr.push(task)
         })
         let arr = [...todoArr, ...doneArr]
         setListOfDisplayOptions({ All: arr, Todo: todoArr, Done: doneArr })

      } else {
         if (listOfDisplayOptions)
            setList([])
      }
   }, [allTask])


   useEffect(() => {
      if (listOfDisplayOptions) {
         if (pagesNum < currentPage)
            setCurrentPage(currentPage - 1)
         else
            setList(sliceTheList())
      }
   }, [listOfDisplayOptions])


   useEffect(() => {
      if (listOfDisplayOptions)
         setList(sliceTheList())
   }, [currentPage])



   useEffect(() => {
      if (listOfDisplayOptions && optionSelected) {

         setList(sliceTheList())
         setCurrentPage(1)
      }
   }, [optionSelected])

   // To delete task
   function handleChangeOption(e) {
      setOptionSelected(e)
   }

   // slice the list by amount
   function sliceTheList() {
      let arr = listOfDisplayOptions[optionSelected] || []
      let start = ((currentPage - 1) * amountToShow);
      let end = (start + amountToShow);

      return arr.slice(start, end)
   }

   // To change the task to execution and vice versa
   async function handleCheckbox(task) {
      task.is_done = !task.is_done
      setAllTask((taskList) => [...taskList])
      needToSaveChanges()
   }

   async function handleLongPress(task) {
      setOpenMnueData(task)
      console.log("task ===== ", task);
   }


   return (
      <Pressable>
         <View style={styles.buttonContainer} >
            {displayOptions.map((option, buttobIndex) =>
               <AppButton key={buttobIndex + "AppButton"} type={optionSelected == option ? 1 : 2} onPress={() => handleChangeOption(option)} title={option} />
            )}
         </View>

         <View style={styles.taskContainer}>
            {list.map((task, index) =>
               <>
                  <Task
                     key={index}
                     taskData={task}
                     handleCheckbox={handleCheckbox}
                     // handleDelete={handleDelete}
                     handleLongPress={handleLongPress}
                  />
                  {index < list.length - 1 && <View style={globalElement.bottomBorder} />}
               </>
            )}
         </View>
      </Pressable>
   );
}

let styles = StyleSheet.create({
   buttonContainer: {
      flexWrap: "wrap",
      flexDirection: "row",
      marginTop: 10,
      marginBottom: 10,
      gap: 10,
   },
   taskContainer: {
      marginTop: 10,
   },

});
