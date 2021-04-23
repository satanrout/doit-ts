import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>Doit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  header: {
    padding: 15,
    marginTop: 25,
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
});
