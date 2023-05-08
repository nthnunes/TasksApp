import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "../../config/firebaseconfig";
import styles from "./style";

export default function NewTask({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [height, setHeight] = useState(50); // altura inicial

  const database = firebase.firestore();

  function addTask() {
    database.collection(route.params.idUser).add({
      title: title,
      description: description,
      status: false,
      create: new Date(Date.now()).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })
    });
    navigation.navigate("Tasks", { idUser: route.params.idUser });
  }

  function handleContentSizeChange(event) {
    // atualiza a altura da entrada com base no tamanho do conteúdo
    setHeight(event.nativeEvent.contentSize.height + 15);
  }

  return (
    <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Task Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Type a title..."
          onChangeText={setTitle}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height }]} // aplica a altura dinamicamente
          placeholder="Type a description..."
          onChangeText={setDescription}
          value={description}
          multiline={true} // permite várias linhas de texto
          onContentSizeChange={handleContentSizeChange} // atualiza a altura
          scrollEnabled={false}
        />
        <TouchableOpacity
          style={styles.buttonNewTask}
          onPress={() => {
            addTask();
          }}
        >
          <FontAwesome name="check" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
