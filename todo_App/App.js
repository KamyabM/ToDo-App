import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, FlatList, Pressable, StyleSheet } from "react-native";

export default function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const text = taskText.trim();
    if (!text) return;
    setTasks((prev) => [{ id: Date.now().toString(), text, done: false }, ...prev]);
    setTaskText("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Pressable onPress={() => toggleTask(item.id)} style={styles.checkbox}>
        <Text style={styles.checkboxLabel}>{item.done ? "✓" : ""}</Text>
      </Pressable>
      <Text style={[styles.itemText, item.done && styles.itemDone]}>{item.text}</Text>
      <Pressable onPress={() => deleteTask(item.id)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>React Native To‑Do</Text>
      <View style={styles.inputRow}>
        <TextInput
          value={taskText}
          onChangeText={setTaskText}
          placeholder="What do you need to do?"
          style={styles.input}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <Pressable onPress={addTask} style={styles.addBtn}>
          <Text style={styles.addText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet. Add one!</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#101418",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
    color: "#EAF2F8",
  },
  inputRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "#1C232A",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    color: "#EAF2F8",
  },
  addBtn: {
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2F80ED",
    borderRadius: 10,
  },
  addText: { color: "white", fontWeight: "700" },
  list: { gap: 8 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#1C232A",
    borderRadius: 12,
    padding: 12,
  },
  checkbox: {
    width: 24, height: 24, borderRadius: 6,
    borderWidth: 2, borderColor: "#2F80ED",
    alignItems: "center", justifyContent: "center",
    backgroundColor: "transparent",
  },
  checkboxLabel: {
    color: "#2F80ED",
    fontWeight: "800",
  },
  itemText: {
    flex: 1,
    color: "#EAF2F8",
    fontSize: 16,
  },
  itemDone: { textDecorationLine: "line-through", color: "#96A2AE" },
  deleteBtn: {
    paddingHorizontal: 10, paddingVertical: 6,
    backgroundColor: "#F2994A", borderRadius: 8,
  },
  deleteText: { color: "white", fontWeight: "700" },
  empty: { color: "#96A2AE", textAlign: "center", marginTop: 16 },
});
