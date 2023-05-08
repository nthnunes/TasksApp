import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"

import { FontAwesome } from "@expo/vector-icons"
import firebase from "../../config/firebaseconfig"
import styles from "./style"

export default function Details({ navigation, route }){
    const [descriptionEdit, setDescriptionEdit] = useState(route.params.description)
    const [height, setHeight] = useState(50)
    const idTask = route.params.id
    const database = firebase.firestore()

    function editTask(description, id){
        database.collection(route.params.idUser).doc(id).update({
            description: description
        })
        navigation.navigate("Tasks", { idUser: route.params.idUser })
    }

    function handleContentSizeChange(event) {
        // atualiza a altura da entrada com base no tamanho do conteúdo
        setHeight(event.nativeEvent.contentSize.height);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={[styles.input, { height }]}
                placeholder="Descrição da tarefa..."
                onChangeText={setDescriptionEdit}
                value={descriptionEdit}
                multiline={true} // permite várias linhas de texto
                onContentSizeChange={handleContentSizeChange} // atualiza a altura
                scrollEnabled={false}
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