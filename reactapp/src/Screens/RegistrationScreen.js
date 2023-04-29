import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconfig.js";

const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = () => {
    const isValid =
      email !== "" && password !== "" && number !== "" && Name !== "";

    if (!emailVerification(email) ) {
      // If the email is not valid, show an alert
      alert("Invalid Email", "Please enter a valid email address");
      return;
    } else if(!isValid) {
      alert("Missing input!");

    }
    else {
      console.log("User registered successfully!");
      navigation.navigate("Home");
    }
  };

  const emailVerification = (email) => {
    // Regular expression for email validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    // Test if the provided email matches the pattern
    const isValidEmail = emailPattern.test(email);

    // Return true if the email is valid, false otherwise
    return isValidEmail;
  };
  const handlePhoneNumber = (text) => {
    const formattedText = text.replace(/[^0-9]/g, "").slice(0, 8);
    setNumber(formattedText);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={number}
        keyboardType="number-pad"
        onChangeText={handlePhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={Name}
        onChangeText={setName}
      />
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
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#2e64e5",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default RegistrationScreen;
