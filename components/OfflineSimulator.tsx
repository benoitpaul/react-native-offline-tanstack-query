import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { onlineManager } from "@tanstack/react-query";

const OfflineSimulator = () => {
  const [isOnline, setIsOnline] = useState(onlineManager.isOnline());

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
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
      </View>
      <Text>
        Status is:{" "}
        <Text style={styles.status}>{isOnline ? "ONLINE" : "OFFLINE"}</Text>
      </Text>
    </View>
  );
};

export default OfflineSimulator;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    padding: 20,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    paddingBottom: 20,
  },
  status: {
    color: "red",
  },
});
