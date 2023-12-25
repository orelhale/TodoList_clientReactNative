
import AsyncStorage from '@react-native-async-storage/async-storage';


function getData() {
   return AsyncStorage.getItem("data")
}

function setData(dataToSave = {}) {
   return AsyncStorage.setItem("data", dataToSave)
}

async function getAllData() {   
   let data = await getData()
   return data ? JSON.parse(data) : {}
}

async function saveAllData(dataToSave) {
   let data = await setData(JSON.stringify(dataToSave))
   return data || {}
}


export default {
   getAllData,
   saveAllData,
}
