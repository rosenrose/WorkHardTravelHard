import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
} from "react-native";
import { theme } from "./colors";

export default function App() {
  const [isWork, setIsWork] = useState(true);
  const work = () => {
    setIsWork(true);
  };
  const travel = () => {
    setIsWork(false);
  };

  const [text, setText] = useState("");
  const onChangeText = (input) => {
    setText(input);
  };

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
        // keyboardType="visible-password"
        // returnKeyType="go"
        // returnKeyLabel="zz"
        // secureTextEntry
        // multiline
      />
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
    marginTop: 20,
    fontSize: 18,
  },
});
