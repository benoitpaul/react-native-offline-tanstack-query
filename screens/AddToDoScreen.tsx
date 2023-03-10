import { Button, View } from "react-native";
import React, { useEffect, useState } from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useQueryClient } from "@tanstack/react-query";
import AddToDoForm from "../components/AddToDoForm";
import { useAddTodo } from "../api";

type AddToDoScreenProps = NativeStackScreenProps<RootStackParamList, "AddToDo">;

const AddToDoScreen = ({ navigation }: AddToDoScreenProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const queryClient = useQueryClient();
  const { mutate } = useAddTodo(queryClient);

  useEffect(() => {
    navigation.setOptions({
      title: "ToDo List",
      headerRight: () => (
        <Button
          title="Done"
          onPress={() => {
            mutate({ name, description });
            navigation.navigate("ToDoList");
          }}
        />
      ),
    });
  }, [navigation, name, description]);

  return (
    <View>
      <AddToDoForm
        name={name}
        onChangeName={setName}
        description={description}
        onChangeDescription={setDescription}
      />
    </View>
  );
};

export default AddToDoScreen;
