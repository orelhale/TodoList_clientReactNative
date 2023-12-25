import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import AppButton from "./AppButton";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons"
import globalColor from "../globalStyle/globalColor";
import globalSize from "../globalStyle/globalSize";

MIcon.loadFont();

export function OpenMnue({
    openMnueData,
    setOpenMnueData,
    setAllTask,
    setEditTask,
    needToSaveChanges,
    allData,
    selectedCategory,
    setAllData,
}) {

    function clossMnue() {
        setOpenMnueData(null)
    }


    function handleEdit() {
        setEditTask(openMnueData)
        clossMnue()
        console.log("Edit");
    }

    function handleDelete() {
        try {
            let copyAllDate = { ...allData }
            if (selectedCategory) {

                let copyCurrentTask = copyAllDate[selectedCategory]
                let indexTask = copyCurrentTask.findIndex(t => t.id == openMnueData.id)

                if (indexTask == -1)
                    throw new Error("indexTask is -1")

                copyCurrentTask.splice(indexTask, 1)
                setAllTask([...copyCurrentTask])
                setAllData(copyAllDate)
                needToSaveChanges()
            } else {
                delete copyAllDate[openMnueData]
                setAllData(copyAllDate)
                needToSaveChanges(copyAllDate)
            }
            clossMnue()
        } catch (error) {
            console.log("error: delete  ===== ", error);
        }
    }
    return (
        <>
            <TouchableWithoutFeedback onPress={clossMnue}>
                <View style={styles.muneTaskBackground}>
                    <TouchableWithoutFeedback>
                        <View style={styles.muneTaskContainer} >

                            <TouchableOpacity onPress={handleDelete}>
                                <MIcon
                                    // onPress={() => { handleDelete() }}
                                    name="delete-circle-outline"
                                    size={globalSize.buttonIcon}
                                    color={globalColor.error}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleEdit}>
                                <MIcon
                                    name="pencil-circle-outline"
                                    color={globalColor.edit}
                                    size={globalSize.buttonIcon}
                                />
                            </TouchableOpacity>

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
        paddingBottom: 6,
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