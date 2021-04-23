import React, { useContext, useState } from "react";
import { View, TextInput, StyleSheet, TouchableHighlight } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TodosContext } from "../context/todosContext";

export default function AddTodo(item) {
  const [todo, setTodo] = useState("");
  const { changed, setChanged } = useContext(TodosContext);
  const addTodo = async () => {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo }),
    };

    try {
      setTodo("");
      const fetchResponse = await fetch(
        "http://localhost:5001/todos",
        settings
      );
      const data = await fetchResponse.json();
      await console.log(data);
      setChanged(!changed);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.addtodo}>
      <TextInput
        onChange={(e) => setTodo(e.target.value)}
        placeholder="add todo"
        value={todo}
        style={styles.add}
        label="TextInputWithIcon"
      />
      <TouchableHighlight style={styles.addicon} onPress={addTodo}>
        <Entypo name="add-to-list" size={30} color="green" />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  add: {
    padding: 15,
    backgroundColor: "#ddaf58",
    borderRadius: 10,
    position: "relative",
    color: "#444444",
    fontSize: 15,
  },
  addicon: {
    position: "absolute",
    right: 5,
    marginVertical: "auto",
  },
  addtodo: {
    display: "flex",
    justifyContent: "center",
  },
});
