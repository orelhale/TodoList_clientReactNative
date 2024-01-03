

import Modal from "react-native-modal";
import { View, StyleSheet } from "react-native";

export default function Popup({ isPopupVisible, setIsPopupVisible, children }) {
    return (
        <Modal
            isVisible={!!isPopupVisible}
            style={styles.wrapPopup}
            backdropColor={"#ddd"}
            backdropOpacity={0.1}
            deviceHeight={"100%"}
            onBackdropPress={() => setIsPopupVisible(false)}
        >
            <View style={styles.popup}>
                {children}
            </View>
        </Modal>
    );
}




let styles = StyleSheet.create({
    wrapPopup: {
        flex: 1,
        alignItems: "center",
    },
    popup: {
        backgroundColor: "red",
        borderColor: "#1890FF",
        width: 200,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: "#FFF",
        padding: 20,
        alignItems: "center",
        gap: 20,
    },
});




