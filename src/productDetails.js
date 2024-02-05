import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProductDetails = ({ route, navigation }) => {
  const itemId = route.params?.productId;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null); // Change initial state to null to differentiate between loading and error states
  const [error, setError] = useState(null); // New state to hold error information

  const getProducts = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${itemId}`);
      if (!response.ok) { // Check if response is not successful
        throw new Error('Failed to fetch product details'); // Throw an error if response is not successful
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error); // Set error state if an error occurs
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (itemId) {
      getProducts();
    }
  }, [itemId]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>No data available</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View
            style={{
              backgroundColor: 'lightgray',
              padding: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home")
              }}>
               <Icon name="arrow-back" size={20} />
            </TouchableOpacity>
          </View>
      <Image source={{ uri: data.thumbnail }} style={styles.thumbnail} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <Text style={styles.price}>Price: ${data.price}</Text>
        <Text style={styles.rating}>{data.discountPercentage}</Text>
        <Text style={styles.rating}>Rating: {data.rating}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    height: '60%',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default ProductDetails;