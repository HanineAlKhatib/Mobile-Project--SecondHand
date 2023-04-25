import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { firebase } from "@firebase/app";
import "@firebase/storage";

const PostItemScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const handlePostItem = async () => {
    try {
      const user = firebase.auth().currentUser;
      const storageRef = firebase.storage().ref(`images/${user.uid}/${name}`);
      await storageRef.putFile(imageUri);
      const imageUrl = await storageRef.getDownloadURL();
      const itemRef = firebase.firestore().collection("items").doc();
      await itemRef.set({
        name,
        description,
        price,
        imageUrl,
        sellerId: user.uid,
        sellerPhone: user.phoneNumber,
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChooseImage = async () => {
    // Implement image picker functionality here
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Post a New Item</Text>
      <TextInput
        style={{
          marginVertical: 10,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: "gray",
          width: "90%",
        }}
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={{
          marginVertical: 10,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: "gray",
          width: "90%",
        }}
        placeholder="Item Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={{
          marginVertical: 10,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: "gray",
          width: "90%",
        }}
        placeholder="Item Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title="Choose Image" onPress={handleChooseImage} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Post Item" onPress={handlePostItem} />
    </View>
  );
};

export default PostItemScreen;
