import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"

import { FontAwesome } from "@expo/vector-icons"
import firebase from "../../config/firebaseconfig"
import styles from "./style"

export default function Details({ navigation, route }){
    const [descriptionEdit, setDescriptionEdit] = useState(route.params.description)
    const idTask = route.params.id
    const database = firebase.firestore()

    function editTask(description, id){
        database.collection(route.params.idUser).doc(id).update({
            description: description
        })
        navigation.navigate("Tasks", { idUser: route.params.idUser })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                placeholder="Descrição da tarefa..."
                onChangeText={setDescriptionEdit}
                value={descriptionEdit}
            />
            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => {
                    editTask(descriptionEdit, idTask)
                }}
            >
                <FontAwesome
                    name="check"
                    size={26}
                    color="#fff"
                />
            </TouchableOpacity>
        </View>
    )
}