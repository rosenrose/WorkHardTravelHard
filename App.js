import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { theme } from "./colors";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.5}>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>
        <TouchableHighlight onPress={() => {}} underlayColor="red" activeOpacity={0.3}>
          <Text style={styles.btnText}>Travel</Text>
        </TouchableHighlight>
        <TouchableWithoutFeedback>
          <Text style={{ color: "white", fontSize: 25 }}>Touch</Text>
        </TouchableWithoutFeedback>
        <Pressable>
          <Text style={{ color: "white", fontSize: 25 }}>Press</Text>
        </Pressable>
      </View>
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
    color: "white",
    // color: theme.gray,
    fontSize: 40,
    // fontWeight: "600",
  },
});
