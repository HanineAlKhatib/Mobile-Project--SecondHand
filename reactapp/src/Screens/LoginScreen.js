import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegistration = () => {
    console.log("User registered successfully!");
    navigation.navigate("Register");
  };
  const handleLogin = () => {
    const isValid = email !== "" && password !== "";

    if (!emailVerification(email)) {
      // If the email is not valid, show an alert
      alert("Invalid Email", "Please enter a valid email address");
      return;
    } else if (!isValid) {
      alert("Missing input!");
    } else {
      console.log("User registered successfully!");
      navigation.navigate("Home");
    }
  };

  const emailVerification = (email) => {
    // Regular expression for email validation
    const emailPattern = /^[A-Z0-9.]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    // Test if the provided email matches the pattern
    const isValidEmail = emailPattern.test(email);

    // Return true if the email is valid, false otherwise
    return isValidEmail;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "80%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 16,
    paddingLeft: 12,
  },
  button: {
    width: "80%",
    height: 48,
    backgroundColor: "turquoise",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default LoginScreen;
