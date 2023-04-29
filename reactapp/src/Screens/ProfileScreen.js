import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { items } from "./data"; // Import items from data.js

const screenWidth = Dimensions.get("window").width;
const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    getUserData();
    getUserItems();
  }, []);

  const getUserData = () => {
    // Replace this with your actual user data
    const currentUser = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "+1234567890",
      password: "password123",
    };

    setUser(currentUser);
  };

  const getUserItems = () => {
    const currentUserItems = items.filter((item) => item.posterId === user.id);
    setUserItems(currentUserItems);
  };

  const ItemComponent = ({ item }) => {
    const editItem = () => {
      // Handle editing item here
    };

    const deleteItem = () => {
      // Filter out the item to delete from userItems state
      const updatedItems = userItems.filter(
        (userItem) => userItem.id !== item.id
      );
      setUserItems(updatedItems);
    };
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.itemImage}
          resizeMode="cover"
        />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Text style={styles.itemPrice}>
          Poster Number: {item.posterPhoneNumber}
        </Text>
        <Text style={styles.itemPrice}>Poster Name: {item.posterName}</Text>
        <Text style={styles.itemPrice}>Condition: {item.condition}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.editButton} onPress={editItem}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={deleteItem}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <TouchableOpacity
        style={styles.postItemButton}
        onPress={() => navigation.navigate("PostItem")}
      >
        <Text style={styles.postItemButtonText}>Post an Item</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.postItemButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.postItemButtonText}>Log Out</Text>
      </TouchableOpacity>
      <View style={styles.userInfo}>
        <Text>Name: {user.name}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Phone: {user.phoneNumber}</Text>
        <Text>Password: {user.password}</Text>
      </View>
      <Text style={styles.subTitle}>Your Posted Items:</Text>
      <FlatList
        data={userItems}
        renderItem={({ item }) => <ItemComponent item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.itemList}
        numColumns={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#4E9FDE",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  postItemButton: {
    backgroundColor: "#4E9FDE",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  postItemButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
  },
  userInfo: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    width: "90%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4E9FDE",
    marginBottom: 10,
  },
  itemList: {
    paddingBottom: 20,
  },
  itemContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#4E9FDE",
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 8,
    color: "#777",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemImage: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.6,
    borderRadius: 5,
    marginBottom: 8,
  },
});

export default ProfileScreen;
