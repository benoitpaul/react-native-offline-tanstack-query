import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";
import { REACT_APP_API_URL, REACT_APP_API_KEY } from "@env";
import {
  AddToDoInput,
  AddTodoWithIdInput,
  PagedToDos,
  ToDo,
} from "./types/ToDo";
import uuid from "react-native-uuid";

console.log({
  url: REACT_APP_API_URL,
  key: REACT_APP_API_KEY,
});

export const graphQLClient = new GraphQLClient(REACT_APP_API_URL!, {
  headers: {
    "x-api-key": REACT_APP_API_KEY,
  },
});

type TTodosQuery = {
  todos: PagedToDos;
};

export const useTodosQuery = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { todos } = await graphQLClient.request<TTodosQuery>(gql`
        query {
          todos {
            items {
              id
              name
              description
              completed
            }
          }
        }
      `);
      return todos;
    },
  });
};

type TCompleteTodoMutation = {
  completeTodo: ToDo;
};

export const useCompleteTodo = (queryClient: QueryClient) => {
  return useMutation({
    mutationKey: ["completeTodo"],
    mutationFn: completeTodoMutationFn,
    onMutate: async (toDoId) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousToDos = queryClient.getQueryData<PagedToDos>(["todos"]);

      queryClient.setQueryData<PagedToDos>(["todos"], (old) => {
        return {
          items:
            old?.items.map((item) => {
              if (item.id === toDoId) {
                return {
                  ...item,
                  completed: true,
                };
              } else {
                return item;
              }
            }) || [],
        };
      });

      return { previousToDos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context?.previousToDos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const completeTodoMutationFn = async (toDoId: string) => {
  const { completeTodo } = await graphQLClient.request<TCompleteTodoMutation>(
    gql`
      mutation CompleteTodo($toDoId: String!) {
        completeTodo(id: $toDoId) {
          completed
          description
          id
          name
        }
      }
    `,
    { toDoId }
  );
  return completeTodo;
};

type TAddTodoMutation = {
  addTodo: ToDo;
};

export const useAddTodo = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async ({ name, description }: AddToDoInput) => {
      const { addTodo } = await graphQLClient.request<TAddTodoMutation>(
        gql`
          mutation AddTodo($name: String!, $description: String!) {
            addTodo(newToDo: { name: $name, description: $description }) {
              completed
              description
              id
              name
            }
          }
        `,
        { name, description }
      );
      return addTodo;
    },
    onMutate: async (addedToDo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousToDos = queryClient.getQueryData<PagedToDos>(["todos"]);

      queryClient.setQueryData<PagedToDos>(["todos"], (old) => {
        return {
          items:
            (old && [
              ...old!.items,
              {
                ...addedToDo,
                completed: false,
                // random ID that will be overwritten when invalidating
                id: uuid.v4().toString(),
              },
            ]) ||
            [],
        };
      });
      return { previousToDos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context?.previousToDos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

type TAddTodoWithIdMutation = {
  addTodoWithId: ToDo;
};

export const useAddTodoWithId = (queryClient: QueryClient) => {
  return useMutation({
    mutationKey: ["addTodoWithId"],
    mutationFn: addTodoWithIdMutationFn,
    onMutate: async (addedToDo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousToDos = queryClient.getQueryData<PagedToDos>(["todos"]);

      queryClient.setQueryData<PagedToDos>(["todos"], (old) => {
        return {
          items:
            (old && [
              ...old!.items,
              {
                ...addedToDo,
                completed: false,
              },
            ]) ||
            [],
        };
      });

      return { previousToDos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context?.previousToDos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const addTodoWithIdMutationFn = async ({
  id,
  name,
  description,
}: AddTodoWithIdInput) => {
  const { addTodoWithId } = await graphQLClient.request<TAddTodoWithIdMutation>(
    gql`
      mutation AddToDo($id: ID!, $name: String!, $description: String!) {
        addTodoWithId(
          id: $id
          newToDo: { name: $name, description: $description }
        ) {
          completed
          description
          id
          name
        }
      }
    `,
    { id, name, description }
  );
  return addTodoWithId;
};
