import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import AppButton from "./AppButton";
import { useEffect, useState } from "react";
import storeFunction from "../functions/storeFunction";
import { Text } from "react-native";
import globalColor from "../globalStyle/globalColor";


export function OpenMnue({ 
    openMnueData, 
    setOpenMnueData, 
    setAllTask,
    setEditTask,
}) {

    function clossMnue() {
        console.log("clossMnue ======");
        setOpenMnueData(null)
    }

    // To delete task
    async function handleDelete() {
        try {
            // console.log("openMnueData = ", openMnueData);
            let newTaskList = await storeFunction.deleteTask(openMnueData.id)
            setAllTask(newTaskList)
            clossMnue()
            // console.log("newTaskList = ", newTaskList);

        } catch (error) {
            console.log("Error handleDelete = ", error);
        }
    }
    
    function handleEdit() {
        setEditTask(openMnueData)
        clossMnue()
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={clossMnue}>
                <View style={styles.muneTaskBackground}>
                    <TouchableWithoutFeedback>
                        <View style={styles.muneTaskContainer} >
                            <AppButton
                                style={{backgroundColor:"red"}}
                                onPress={() => {
                                    handleDelete()
                                    console.log("Delete");
                                }}
                                title="Delete" 
                            />
                            <AppButton
                                style={{backgroundColor:"green"}}
                                onPress={() => {
                                    handleEdit()
                                    console.log("Edit");
                                }}
                                title="Edit" 
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}


let styles = StyleSheet.create({
    muneTaskContainer: {
        flex: 1,
        backgroundColor: 'white',
        // backgroundColor: 'blue',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: "gray",
        paddingBottom: 7,
    },
    muneTaskBackground: {
        // backgroundColor: 'red',
        // backgroundColor: '#d2d2d270',
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        flex: 1,
        flexWrap: "wrap",
        flexDirection: 'row',
    },
}) 