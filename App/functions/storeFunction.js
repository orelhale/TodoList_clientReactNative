
import AsyncStorage from '@react-native-async-storage/async-storage';


async function getAllTask() {
   let jsonStore = await getStoreOrCreate()
   return jsonStore
}

async function saveData(data) {
   let toString = JSON.stringify(data)

   await AsyncStorage.setItem("tasks", toString)

   return data
}


async function editTask(id, object) {
   try {

      let { index, jsonStore } = await getIndexTaskById(id)

      jsonStore[index] = { ...jsonStore[index], ...object };

      await AsyncStorage.setItem("tasks", JSON.stringify(jsonStore))

      return jsonStore
   } catch (error) {
      console.log("Error: editTask = ", error);
      return Promise.reject(error)
   }
}


async function addTask(tasks) {
   try {
      // let jsonStore = await getStoreOrCreate()
      // jsonStore.push(tasks)
      let toString = JSON.stringify(tasks)
      await AsyncStorage.setItem("tasks", toString)

      // return jsonStore

   } catch (error) {
      console.log("Error addTask = ", error);
   }
}



async function deleteTask(id) {
   try {
      let { index, jsonStore } = await getIndexTaskById(id)

      jsonStore.splice(index, 1)

      await AsyncStorage.setItem("tasks", JSON.stringify(jsonStore))

      console.log(`Task \"${id}\" deleted successfully`);

      return jsonStore
   } catch (error) {
      console.log("Error: deleteTask = ", error);
      return Promise.reject(error)
   }
}


async function getStoreOrCreate() {
   try {
      let check = await AsyncStorage.getItem("tasks")

      if (!check) {
         AsyncStorage.setItem("tasks", JSON.stringify([]))
         return []
      }
      return JSON.parse(check)

   } catch (error) {
      console.log("Error getStoreOrCreate = ", error);
      return []
   }
}


async function getIndexTaskById(id) {
   if (!id)
      Promise.reject("Id is undefined")

   let jsonStore = JSON.parse(await AsyncStorage.getItem("tasks"))

   if (!jsonStore)
      Promise.reject("Store is empty")

   let index = jsonStore.findIndex(item => item.id == id)

   if (index == -1 || !index)
      Promise.reject("Index not exist")

   return Promise.resolve({ index, jsonStore })
}


export default {
   addTask,
   editTask,
   deleteTask,
   getAllTask,
   saveData,
}
