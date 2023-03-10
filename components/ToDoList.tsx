import { FlatList, View } from "react-native";
import React from "react";
import { ToDo } from "../types/ToDo";
import ToDoItem from "./ToDoItem";

interface ToDoListProps {
  toDos: ToDo[];
  onCompleteToDo: (toDoId: string) => void;
}

const ToDoList = ({ toDos, onCompleteToDo }: ToDoListProps) => {
  return (
    <View>
      <FlatList
        data={toDos}
        renderItem={({ item }) => (
          <ToDoItem toDo={item} onComplete={onCompleteToDo} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ToDoList;
