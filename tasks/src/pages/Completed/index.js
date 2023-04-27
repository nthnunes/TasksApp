import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"

import database from "../../config/firebaseconfig"
import { FontAwesome } from "@expo/vector-icons"
import styles from "./style"

export default function Task({ navigation }){
    const [task, setTask] = useState([])

    function clearAll() {
        database.collection("Tasks")
            .where("status", "==", true)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete()
                })
            })
    }

    function deleteTask(id){
        database.collection("Tasks").doc(id).update({
            status: false
        })
    }

    useEffect(() => {
        database.collection("Tasks").where("status", "==", true).onSnapshot((query) => {
            const list = []
            query.forEach((doc) => {
                list.push({...doc.data(), id: doc.id})
            })
            setTask(list)
        })
    }, [])

    return(
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={task}
                renderItem={({ item }) => {
                    return(
                        <View style={styles.Tasks}>
                            <TouchableOpacity
                                style={styles.deleteTask}
                                onPress={() => {
                                    deleteTask(item.id)
                                }}
                            >
                                <FontAwesome
                                    name="check-square"
                                    size={23}
                                    color="#f92e6a"
                                />
                            </TouchableOpacity>
                            <Text
                                style={styles.DescriptionTask}
                                onPress={() => {
                                    navigation.navigate("Details", {
                                        id: item.id,
                                        description: item.description
                                    })
                                }}
                            >
                                {item.description}
                            </Text>
                        </View>
                    )
                }}
            />
            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => clearAll()}
            >
                <Text style={styles.iconButton}>🗑</Text>
            </TouchableOpacity>
        </View>
    )
}