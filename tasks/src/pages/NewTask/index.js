import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"

import { FontAwesome } from "@expo/vector-icons"
import firebase from "../../config/firebaseconfig"
import styles from "./style"

export default function NewTask({ navigation, route }){
    const [description, setDescription] = useState(null)
    const database = firebase.firestore()
    
    function addTask(){
        database.collection(route.params.idUser).add({
            description: description,
            status: false
        })
        navigation.navigate("Tasks", { idUser: route.params.idUser })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                placeholder="Type a text about your task..."
                onChangeText={setDescription}
                value={description}
            />
            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => {
                    addTask()
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