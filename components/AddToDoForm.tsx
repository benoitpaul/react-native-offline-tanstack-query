import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

interface AddToDoFormProps {
  name: string;
  onChangeName: (name: string) => void;
  description: string;
  onChangeDescription: (name: string) => void;
}

const AddToDoForm = ({
  name,
  onChangeName,
  description,
  onChangeDescription,
}: AddToDoFormProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={onChangeName}
        />
      </View>
      <View>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={onChangeDescription}
        />
      </View>
    </View>
  );
};

export default AddToDoForm;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  label: {
    margin: 12,
    marginBottom: 0,
  },
  input: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    margin: 12,
  },
});
