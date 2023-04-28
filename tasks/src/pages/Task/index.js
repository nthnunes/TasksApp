import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"

import firebase from "../../config/firebaseconfig"
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import styles from "./style"

export default function Task({ navigation, route }){
    const [task, setTask] = useState([])
    const database = firebase.firestore()

    function logout(){
        firebase.auth().signOut().then(() => {
            navigation.navigate("Login")
        })
    }

    function deleteTask(id){
        database.collection(route.params.idUser).doc(id).update({
            status: true
        })
    }

    useEffect(() => {
        database.collection(route.params.idUser).where("status", "==", false).onSnapshot((query) => {
            const list = []
            query.forEach((doc) => {
                list.push({...doc.data(), id: doc.id})
            })
            setTask(list)
        })
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <TouchableOpacity
                    style={styles.buttonLogout}
                    onPress={logout}
                >
                    <MaterialCommunityIcons
                    name="location-exit"
                    size={23}
                    color="#f92e6a"
                    />
                </TouchableOpacity>
            </View>
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
                                    name="square-o"
                                    size={26}
                                    color="#f92e6a"
                                />
                            </TouchableOpacity>
                            <Text
                                style={styles.DescriptionTask}
                                onPress={() => {
                                    navigation.navigate("Details", {
                                        id: item.id,
                                        description: item.description,
                                        idUser: route.params.idUser
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
                style={styles.buttonCompleted}
                onPress={() => navigation.navigate("Completed", { idUser: route.params.idUser })}
            >
                <FontAwesome
                    name="check"
                    size={26}
                    color="#fff"
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => navigation.navigate("New Task", { idUser: route.params.idUser })}
            >
                <FontAwesome
                    name="plus"
                    size={26}
                    color="#fff"
                />
            </TouchableOpacity>
        </View>
    )
}