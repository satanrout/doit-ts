import React, { useState, useEffect, useContext } from "react";
import { FlatList } from "react-native";
import { TodosContext } from "../context/todosContext";
import TodoItem from "./TodoItem";

export default function TaskList() {
  const [todos, setTodo] = useState([]);
  const { changed } = useContext(TodosContext);

  useEffect(() => {
    fetch("http://192.168.40.77:5001/todos")
      .then((res) => res.json())
      .then((datas) => setTodo(datas.data))
      .catch((err) => console.log(err));
  }, [changed]);
  // console.log(todos);

  return (
    <FlatList
      data={todos}
      renderItem={({ item }) => <TodoItem item={item} />}
    />
  );
}
