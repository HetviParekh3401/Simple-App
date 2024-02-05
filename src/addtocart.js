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

const Addtocart = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/carts');
      const result = await response.json();
      result.carts.forEach((value, index) => {
        setData(value.products);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  console.log("result==>", data)

  const renderProductItem = ({item}) => (
    <View
      style={{
        padding: 10,
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 10,
      }}>
        <Image
          source={{uri: item.thumbnail}}
          style={{width: 100, height: 100}}
        />
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text>Price: ${item.price}</Text>
        <Text>Rating: {item.rating}</Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={renderProductItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default Addtocart;
