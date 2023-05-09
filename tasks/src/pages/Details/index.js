import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native"

import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import firebase from "../../config/firebaseconfig"
import styles from "./style"

export default function Details({ navigation, route }){
    const [descriptionEdit, setDescriptionEdit] = useState(route.params.description)
    const [titleEdit, setTitleEdit] = useState(route.params.title)
    const [insertError, setInsertError] = useState("");
    const [height, setHeight] = useState(50)
    const idTask = route.params.id
    const database = firebase.firestore()

    function editTask(title, description, id){
        if(title == ""){
            setInsertError(true)
        }else{
            database.collection(route.params.idUser).doc(id).update({
                title: title,
                description: description
            })
            navigation.goBack({ idUser: route.params.idUser })
        }
    }

    function deleteTask(id){
        database.collection(route.params.idUser).doc(id).delete()
        navigation.goBack({ idUser: route.params.idUser })
    }

    function handleContentSizeChange(event) {
        // atualiza a altura da entrada com base no tamanho do conteúdo
        if(Platform.OS != "ios"){
            setHeight(event.nativeEvent.contentSize.height)
        }else{
            setHeight(event.nativeEvent.contentSize.height + 15)
        }
    }

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.container}>
                <Text style={styles.label}>Task Title</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Type a title..."
                    onChangeText={setTitleEdit}
                    value={titleEdit}
                />
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, { height }]}
                    placeholder="Type a description..."
                    onChangeText={setDescriptionEdit}
                    value={descriptionEdit}
                    multiline={true} // permite várias linhas de texto
                    onContentSizeChange={handleContentSizeChange} // atualiza a altura
                    scrollEnabled={false}
                />
                <Text style={styles.create}>{route.params.create}</Text>
                <Text style={styles.concluded}>{route.params.concluded}</Text>
                {insertError === true ? (
                    <View style={styles.contentAlert}>
                        <MaterialCommunityIcons
                            name="alert-circle"
                            size={24}
                            color="#bdbdbd"
                        />
                        <Text style={styles.warningAlert}>Title can't be empty</Text>
                    </View>
                ) : (
                    <View />
                )}
                <TouchableOpacity
                    style={styles.buttonNewTask}
                    onPress={() => {
                        editTask(titleEdit, descriptionEdit, idTask)
                    }}
                >
                    <FontAwesome
                        name="check"
                        size={26}
                        color="#fff"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonDeleteTask}
                    onPress={() => {
                        deleteTask(idTask)
                    }}
                >
                    <FontAwesome
                        name="trash"
                        size={26}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}