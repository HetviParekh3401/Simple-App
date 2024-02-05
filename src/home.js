import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Button,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Home = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const result = await response.json();
      setData(result.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLoading(true);
      getProducts(); // Fetch data again after refreshing
    }, 2000);
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  const addToCart = async productId => {
    try {
      const response = await fetch('https://dummyjson.com/carts/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          userId: 1,
          products: [
            {
              id: productId,
              quantity: 1,
            },
          ],
        }),
      })
        .then(res => res.json())
        console.log(response)
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const renderProductItem = ({item}) => (
    <View
      style={{
        padding: 10,
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 10,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProductDetails', {productId: item.id});
        }}>
        <Image
          source={{uri: item.thumbnail}}
          style={{width: 100, height: 100}}
        />
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text>Price: ${item.price}</Text>
        <Text>Rating: {item.rating}</Text>
      </TouchableOpacity>

      <View style={{backgroundColor: 'red', marginTop: 35, marginBottom: -20}}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 20,
            marginTop: 20,
            right: 20,
            backgroundColor: 'royalblue',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
          }}
          onPress={() => addToCart(item.id)}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
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
                setLoading(true);
                getProducts();
              }}>
              <Text>Refresh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddToCart")
              }}>
               <Icon name="shopping-cart" size={20} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={renderProductItem}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#007AFF', '#5AC8FA']} // Blue shades
                tintColor="#007AFF" // Primary blue color
                title="Pull to refresh..."
                titleColor="#007AFF" // Primary blue color
                progressBackgroundColor="#fff"
              />
            }
          />
        </View>
      )}
    </View>
  );
};

export default Home;
