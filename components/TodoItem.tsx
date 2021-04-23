import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TodosContext } from "../context/todosContext";

export default function TodoItem({ item }) {
  const { changed, setChanged } = useContext(TodosContext);
  const [checked, setChecked] = useState(false);
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState(item.todo);

  const deleteTodo = async () => {
    const response = await fetch(`http://localhost:5001/todos/${item._id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    setChanged(!changed);
    await console.log(data);
  };

  const changeTodo = async () => {
    setEdit(!edit);
    const settings = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo }),
    };
    const response = await fetch(
      `http://localhost:5001/todos/${item._id}`,
      settings
    );
    const data = await response.json();
    setChanged(!changed);
    await console.log(data);
  };

  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.todoLeft}>
        <TouchableOpacity
          onPress={() => setChecked(!checked)}
          style={checked ? styles.colorLeft : styles.colorleft}
        ></TouchableOpacity>
        {edit ? (
          <TextInput
            style={styles.itemText}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        ) : (
          <Text style={styles.itemText}>{item.todo}</Text>
        )}
      </View>
      <View style={styles.edit}>
        {edit ? (
          <TouchableOpacity style={styles.editIcon} onPress={changeTodo}>
            <Entypo name="check" size={24} color="green" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => setEdit(!edit)}
          >
            <Entypo name="edit" size={24} color="blue" />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={deleteTodo}>
          <Entypo name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  colorLeft: {
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "yellow",
    width: 20,
    marginRight: 15,
    backgroundColor: "rgba(123, 239, 178, 0)",
  },
  colorleft: {
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "yellow",
    width: 20,
    marginRight: 15,
    backgroundColor: "rgba(123, 239, 178, 1)",
  },
  edit: {
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: "row",
  },
  editIcon: {
    marginRight: 15,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
    marginTop: 16,
    backgroundColor: "#191930",
    borderRadius: 10,
  },
  itemText: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "bold",
  },
  todoLeft: {
    display: "flex",
    flexDirection: "row",
  },
});
