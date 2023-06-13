import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "./AppButton";
import Task from "./Task";
import apiFunction from "../functions/apiFunction";
import HairlineWidth from "./HairlineWidth";
import storeFunction from "../functions/storeFunction";

export default function TaskList({ allTask = [], setAllTask, setEditTask }) {

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

   // To delete task
   async function handleDelete(id) {
      try {
         let newTaskList = await storeFunction.deleteTask(id)
         console.log("newTaskList = ", newTaskList);
         setAllTask(newTaskList)

      } catch (error) {
         console.log("Error handleDelete = ", error);
      }
   }

   // To change the task to execution and vice versa
   async function handleCheckbox(id, value) {
      try {
         let newTaskList = await storeFunction.editTask(id, value)
         setAllTask(newTaskList)
      } catch (error) {

      }
   }


   return (
      <View>

         <View style={styles.buttonContainer}>
            {displayOptions.map((option, buttobIndex) =>
               <AppButton key={buttobIndex + "AppButton"} type={optionSelected == option ? 1 : 2} onPress={() => handleChangeOption(option)} title={option} />
            )}
         </View>

         <View style={styles.taskContainer}>
            {list.map((task, indexTask, all) =>
               <>
                  <Task
                     key={indexTask}
                     taskData={task}
                     handleCheckbox={handleCheckbox}
                     handleDelete={handleDelete}
                  />
                  {indexTask < all.length - 1 && <HairlineWidth />}
               </>
            )}
         </View>

      </View>
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
   }
});
