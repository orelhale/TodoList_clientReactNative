import { StyleSheet } from "react-native";
import globalColor from "./globalColor";

export default globalElement = StyleSheet.create({

    bottomBorder: {
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 8,
        marginRight: 8,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    allListItemText: {
        flexDirection: "row",
        alignItems: "center",
        fontSize: 20,
    },
    allListItemWrap: {
        marginLeft: 2,
        marginRight: 2,
        marginTop: 3,
        marginBottom: 3,
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: "#fff"
    },
    noItems: {
        fontSize: 20,
        color: globalColor.primary,
        textAlign: "center",
        marginTop: 20,
    },
})

