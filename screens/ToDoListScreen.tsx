import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ToDoList from "../components/ToDoList";
import { StatusBar } from "expo-status-bar";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { PagedToDos } from "../types/ToDo";
import { onlineManager, useQueryClient } from "@tanstack/react-query";
import { useCompleteTodo, useTodosQuery } from "../api";

type ToDoListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ToDoList"
>;

const ToDoListScreen = ({ navigation }: ToDoListScreenProps) => {
  // const data = useMemo<PagedToDos>(
  //   () => ({
  //     items: [
  //       {
  //         id: "1",
  //         name: "ToDo 1",
  //         description:
  //           "ToDo 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at varius diam",
  //         completed: false,
  //       },
  //       {
  //         id: "2",
  //         name: "ToDo 2",
  //         description:
  //           "ToDo 2: Aliquam a mattis sapien. Nullam pretium imperdiet nulla sit amet scelerisque",
  //         completed: false,
  //       },
  //       {
  //         id: "3",
  //         name: "ToDo 3",
  //         description:
  //           "ToDo 3: Proin viverra cursus diam, quis cursus nunc gravida sed.",
  //         completed: false,
  //       },
  //     ],
  //   }),
  //   []
  // );
  //const [isOnline, setIsOnline] = useState(onlineManager.isOnline());
  useEffect(() => {
    navigation.setOptions({
      title: "List",
      headerRight: () => (
        <Button title="Add" onPress={() => navigation.navigate("AddToDo")} />
      ),
    });
  }, [navigation]);

  const queryClient = useQueryClient();
  const { mutate } = useCompleteTodo(queryClient);

  const handleCompleteToDo = (toDoId: string) => mutate(toDoId);

  const { data, isLoading, isError, isSuccess } = useTodosQuery();

  return (
    <View style={styles.container}>
      {/* <View>
        <Button
          title="Online"
          onPress={() => {
            onlineManager.setOnline(true);
            setIsOnline(onlineManager.isOnline());
          }}
        />
        <Button
          title="Offline"
          onPress={() => {
            onlineManager.setOnline(false);
            setIsOnline(onlineManager.isOnline());
          }}
        />
        <Text>{isOnline ? "IS_ONLINE" : "IS_OFFLINE"}</Text>
        <Text>status: {status}</Text>
        <Text>fetchStatus: {fetchStatus}</Text>
      </View> */}
      <View style={styles.list}>
        {isError && <Text>Error</Text>}
        {isLoading && <Text>Loading..</Text>}
        {isSuccess && (
          <ToDoList toDos={data.items} onCompleteToDo={handleCompleteToDo} />
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default ToDoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: "black",
    fontSize: 24,
    fontWeight: "500",
    marginTop: 0,
    marginBottom: 24,
    borderColor: "green",
    borderWidth: 1,
  },
  list: {
    flex: 1,
  },
});
