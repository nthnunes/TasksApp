import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20
    },
    Tasks:{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5
    },
    contentAlert: {
        marginTop: 150,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
      },
      warningAlert: {
          paddingLeft: 10,
          color: "#bdbdbd",
          fontSize: 16
      },
    deleteTask:{
        justifyContent: "center",
        paddingLeft: 15,
        left: 20
    },
    DescriptionTask:{
        width: "75%",
        alignContent: "flex-start",
        backgroundColor: "#f5f5f5cf",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 5,
        marginRight: 15,
        color: "#282b2db5",
        overflow: "hidden"
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
    iconButton:{
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold"
    }
})

export default styles