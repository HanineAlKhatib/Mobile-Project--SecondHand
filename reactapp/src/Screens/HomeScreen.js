import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { items } from "./data";
import { Picker } from "@react-native-picker/picker";

const ItemComponent = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={item.imageUrl} // Use the imageUrl property as the source
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
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  const searchItems = (text) => {
    setSearch(text);
    if (text) {
      const searchedItems = items.filter(
        (item) =>
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.category.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredItems(searchedItems);
    } else {
      setFilteredItems(items);
    }
  };

  const sortByPrice = (order) => {
    const sortedItems = [...filteredItems].sort((a, b) => {
      if (order === "lowToHigh") {
        return a.price - b.price;
      } else if (order === "highToLow") {
        return b.price - a.price;
      }
    });
    setFilteredItems(sortedItems);
  };

  const sortByDate = () => {
    const sortedItems = [...filteredItems].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    setFilteredItems(sortedItems);
  };
  const sortBy = (value) => {
    switch (value) {
      case "lowToHigh":
        sortByPrice("lowToHigh");
        break;
      case "highToLow":
        sortByPrice("highToLow");
        break;
      case "recentlyPosted":
        sortByDate();
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome to My App!</Text>
      <Text style={styles.subHeaderText}>Browse and Post Used Items Here</Text>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.profileButtonText}>Go to Profile</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Search items..."
        onChangeText={searchItems}
        value={search}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={null}
          style={styles.picker}
          onValueChange={sortBy}
        >
          <Picker.Item label="Sort by" value={null} />
          <Picker.Item label="Price: Low to High" value="lowToHigh" />
          <Picker.Item label="Price: High to Low" value="highToLow" />
          <Picker.Item label="Recently Posted" value="recentlyPosted" />
        </Picker>
      </View>
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => <ItemComponent item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.itemList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileButton: {
    backgroundColor: "#4E9FDE",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  profileButtonText: {
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
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4E9FDE",
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4E9FDE",
    marginBottom: 20,
  },
  searchInput: {
    width: "90%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  filterButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#4E9FDE",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  itemContainer: {
    width: "90%",
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
  itemList: {
    paddingBottom: 20,
  },
  pickerContainer: {
    width: "90%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  picker: {
    width: "100%",
    height: 40,
  },
  itemImage: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default HomeScreen;
