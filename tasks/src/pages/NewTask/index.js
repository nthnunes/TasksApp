import React, { useState, useEffect } from "react";
import { Keyboard, View, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "../../config/firebaseconfig";
import styles from "./style";

export default function NewTask({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [insertError, setInsertError] = useState("");
  const [height, setHeight] = useState(50); // altura inicial

  const database = firebase.firestore();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
     const keyboardWillShowListener = Keyboard.addListener(
       'keyboardWillShow',
       () => {
         setKeyboardVisible(true); // or some other action
       }
     );
     const keyboardWillHideListener = Keyboard.addListener(
       'keyboardWillHide',
       () => {
         setKeyboardVisible(false); // or some other action
       }
     );
 
     return () => {
       keyboardWillHideListener.remove();
       keyboardWillShowListener.remove();
     };
   }, []);

  function addTask() {
    if(title == ""){
      setInsertError(true)
    }else{
      database.collection(route.params.idUser).add({
        title: title,
        description: description,
        status: false,
        create: new Date(Date.now()).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })
      });
      navigation.navigate("Tasks", { idUser: route.params.idUser });
    }
  }

  function handleContentSizeChange(event) {
    // atualiza a altura da entrada com base no tamanho do conteúdo
    if(Platform.OS != "ios"){
      setHeight(event.nativeEvent.contentSize.height)
    }else{
      setHeight(event.nativeEvent.contentSize.height + 15)
    }
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
          placeholder="Type a description... (Optional)"
          onChangeText={setDescription}
          value={description}
          multiline={true} // permite várias linhas de texto
          onContentSizeChange={handleContentSizeChange} // atualiza a altura
          scrollEnabled={false}
        />
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
            style={[styles.buttonNewTask, { transform: [{ translateY: isKeyboardVisible ? -50 : 0 }] }]}
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
