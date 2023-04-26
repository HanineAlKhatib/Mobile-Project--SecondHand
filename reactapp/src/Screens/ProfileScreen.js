import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    getUserData();
    getUserItems();
  }, []);

  const getUserData = async () => {
    try {
      // Remove this line after integrating actual data
      const dummyUser = {
        name: "John Doe",
        email: "john@example.com",
        phoneNumber: "+1234567890",
        password: "password123",
      };

      const userData = await AsyncStorage.getItem("user");
      if (userData !== null) {
        setUser(JSON.parse(userData));
      } else {
        // Remove this line after integrating actual data
        setUser(dummyUser);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUserItems = async () => {
    try {
      const postedItems = await AsyncStorage.getItem("userItems");
      if (postedItems !== null) {
        setUserItems(JSON.parse(postedItems));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <TouchableOpacity
        style={styles.postItemButton}
        onPress={() => navigation.navigate("PostItem")}
      >
        <Text style={styles.postItemButtonText}>Post an Item</Text>
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
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.itemList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ProfileScreen;
