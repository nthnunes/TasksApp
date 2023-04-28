import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"

import firebase from "../../config/firebaseconfig"
import styles from "./style"

export default function NewTask({ navigation }){
    const [description, setDescription] = useState(null)
    const database = firebase.firestore()
    
    function addTask(){
        database.collection("Tasks").add({
            description: description,
            status: false
        })
        navigation.navigate("Tasks")
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
                <Text style={styles.iconButton}>✓</Text>
            </TouchableOpacity>
        </View>
    )
}