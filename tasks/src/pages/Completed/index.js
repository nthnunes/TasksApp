import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"

import firebase from "../../config/firebaseconfig"
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import styles from "./style"

export default function Task({ navigation, route }){
    const [task, setTask] = useState([])
    const [emptyTasks, setEmptyTasks] = useState("")
    const database = firebase.firestore()

    function clearAll() {
        database.collection(route.params.idUser)
            .where("status", "==", true)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete()
                })
            })
    }

    function deleteTask(id){
        database.collection(route.params.idUser).doc(id).update({
            status: false
        })
    }

    useEffect(() => {
        database.collection(route.params.idUser)
            .where("status", "==", true)
            .onSnapshot((query) => {
                const list = []
                query.forEach((doc) => {
                list.push({...doc.data(), id: doc.id})
                })
                list.sort((a, b) => new Date(a.create) - new Date(b.create))
                setTask(list)
            
            if(list.length == 0){
                setEmptyTasks(true)
            }
            else{
                setEmptyTasks(false)
            }
        })
    }, [emptyTasks])

    return(
        <View style={styles.container}>
            {emptyTasks === true
            ?
                <View style={styles.contentAlert}>
                    <MaterialCommunityIcons
                        name="check-circle"
                        size={16}
                        color="#bdbdbd"
                    />
                    <Text style={styles.warningAlert}>You haven't concluded tasks</Text>
                </View>
            :
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
                                        size={26}
                                        color="#f92e6a"
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={styles.DescriptionTask}
                                    onPress={() => {
                                        navigation.navigate("Details", {
                                            id: item.id,
                                            title: item.title,
                                            description: item.description,
                                            create: "Created in: " + item.create,
                                            concluded: "Concluded in: " + item.concluded,
                                            idUser: route.params.idUser
                                        })
                                    }}
                                >
                                    {item.title}
                                </Text>
                            </View>
                        )
                    }}
                />
            }
            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => clearAll()}
            >
                <FontAwesome
                    name="trash"
                    size={26}
                    color="#fff"
                />
            </TouchableOpacity>
        </View>
    )
}