import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";

import { ToDo } from "../types/ToDo";

interface ToDoItemProps {
  toDo: ToDo;
  onComplete(toDoId: string): void;
}

const ToDoItem = ({ toDo, onComplete }: ToDoItemProps) => {
  return (
    <View style={styles.container}>
      <Checkbox
        disabled={toDo.completed}
        value={toDo.completed}
        onValueChange={() => onComplete(toDo.id)}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{toDo.name}</Text>
        <Text style={styles.description}>{toDo.description}</Text>
      </View>
    </View>
  );
};

export default ToDoItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
  },
  name: {
    flex: 1,
    fontWeight: "700",
    marginBottom: 8,
  },
  description: {
    color: "gray",
  },
});
