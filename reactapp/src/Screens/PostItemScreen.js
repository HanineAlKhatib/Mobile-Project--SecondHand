import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { firebase } from "@firebase/app";
import "@firebase/storage";
import { launchImageLibrary } from "react-native-image-picker";

const PostItemScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const handlePostItem = async () => {
    try {
      Alert.alert("Success!", "Item has been successfully posted.");
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChooseImage = () => {
    const options = {
      mediaType: "photo",
      maxWidth: 1024,
      maxHeight: 1024,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setImageUri(response.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post a New Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Item Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Item Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title="Choose Image" onPress={handleChooseImage} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      )}

      <TouchableOpacity style={styles.button} onPress={handlePostItem}>
        <Text style={styles.buttonText}>Post Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    marginVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "gray",
    width: "100%",
    borderRadius: 5,
    height: 40,
  },
  description: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  previewImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginTop: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#4E9FDE",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PostItemScreen;
