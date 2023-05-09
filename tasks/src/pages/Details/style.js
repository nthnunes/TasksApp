import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    label: {
        width: "90%",
        marginTop: 20,
        fontSize: 16,
        marginLeft: 20,
        color: "#f92e6a"
    },
    input: {
        width: "90%",
        marginTop: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#f92e6a",
        marginLeft: "auto",
        marginRight: "auto",
        overflow: "hidden"
    },
    create: {
        width: "100%",
        marginTop: 35,
        fontSize: 14,
        textAlign: "center",
        color: "#c9c9c9"
    },
    concluded: {
        width: "100%",
        marginTop: 10,
        fontSize: 14,
        textAlign: "center",
        color: "#c9c9c9"
    },
    contentAlert: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    warningAlert: {
        paddingLeft: 10,
        color: "#bdbdbd",
        fontSize: 16
    },
    buttonNewTask:{
        width: 60,
        height: 60,
        position: "absolute",
        bottom: 60,
        left: 35,
        backgroundColor: "#f92e6a",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonDeleteTask:{
        width: 60,
        height: 60,
        position: "absolute",
        bottom: 60,
        right: 35,
        backgroundColor: "#f92e6a",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    iconButton:{
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold"
    }
})

export default styles