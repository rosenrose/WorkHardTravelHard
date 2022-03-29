import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./colors";
import { Fontisto } from "@expo/vector-icons";

const STORAGE_KEY = "todos";

export default function App() {
  const [isWork, setIsWork] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const work = () => {
    setIsWork(true);
  };
  const travel = () => {
    setIsWork(false);
  };

  const onChangeText = (input) => {
    setText(input);
  };
  const loadTodos = async () => {
    try {
      const savedTodos = await AsyncStorage.getItem(STORAGE_KEY);
      // empty: null
      // console.log(savedTodos);

      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
      setIsLoading(false);
    } catch (e) {}
  };
  const saveTodos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {}
  };
  const addTodo = async () => {
    if (!text.length) {
      return;
    }

    const newTodos = { ...todos, [Date.now()]: { text, isWork } };
    setTodos(newTodos);
    await saveTodos(newTodos);
    setText("");
  };
  const deleteTodo = async (id) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      {
        text: "OK",
        onPress: () => {
          const newTodos = { ...todos };
          delete newTodos[id];
          setTodos(newTodos);
          saveTodos(newTodos);
        },
      },
      { text: "Cancel" },
    ]);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work} activeOpacity={0.5}>
          <Text style={{ ...styles.btnText, color: isWork ? "white" : theme.gray }}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{ ...styles.btnText, color: isWork ? theme.gray : "white" }}>Travel</Text>
        </TouchableOpacity>
        {/* <TouchableHighlight onPress={() => {}} underlayColor="red" activeOpacity={0.3}>
          <Text style={styles.btnText}>Travel</Text>
        </TouchableHighlight>
        <TouchableWithoutFeedback>
          <Text style={{ color: "white", fontSize: 25 }}>Touch</Text>
        </TouchableWithoutFeedback>
        <Pressable>
          <Text style={{ color: "white", fontSize: 25 }}>Press</Text>
        </Pressable> */}
      </View>
      <TextInput
        style={styles.input}
        placeholder={isWork ? "Add a Todo" : "Where do you want to go?"}
        onChangeText={onChangeText}
        value={text}
        onSubmitEditing={addTodo}
        // keyboardType="visible-password"
        // returnKeyType="go"
        // returnKeyLabel="zz"
        // secureTextEntry
        // multiline
      />
      {isLoading ? (
        <Text style={styles.todoText}>Loading...</Text>
      ) : (
        <ScrollView>
          {Object.entries(todos)
            .filter(([id, todo]) => todo.isWork === isWork)
            .map(([id, todo]) => (
              <View key={id} style={styles.todo}>
                <Text style={styles.todoText}>{todo.text}</Text>
                <TouchableOpacity
                  onPress={() => {
                    deleteTodo(id);
                  }}
                >
                  <Fontisto name="trash" size={18} color={theme.gray} />
                </TouchableOpacity>
              </View>
            ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  btnText: {
    fontSize: 40,
    // fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  todo: {
    backgroundColor: theme.todoBackground,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  todoText: {
    color: "white",
    fontSize: 16,
  },
});
