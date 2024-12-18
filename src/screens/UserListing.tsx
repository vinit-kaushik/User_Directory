import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Platform,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const UserListing = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    console.log('Fetching users...');
    setIsRefreshing(true);
    setLoading(true);
    try {
      const userData = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      console.log('Fetched users:', userData.data);
      setLoading(false)
      setUsers(userData?.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false)
      setIsRefreshing(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (isRefreshing) {
      console.log('Retrying to fetch users...');
      fetchUsers();
    }
  }, [isRefreshing]);

  const onPressUserItem = item => {
    navigation.navigate('UserDetails', {item});
  };

  const userItem = ({item}) => {
    return (
      <Pressable
        onPress={() => onPressUserItem(item)}
        style={styles.userItemPressableContainer}>
        <Text style={styles.itemText}>Name: {item?.name}</Text>
        <Text style={styles.itemText}>Email: {item?.email}</Text>
      </Pressable>
    );
  };

  if(loading) return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator /></View>
  return (
    <SafeAreaView>
      <View style={styles.parentContainer}>
        <Text style={styles.userListHeadingText}>User List</Text>
        {/* <Text>{user}</Text> */}
        {/* <Text>{JSON.stringify(user, null, 2)}</Text> */}
        <View>
          <FlatList
            data={users}
            renderItem={item => userItem(item)}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{marginTop: 220}}></View>}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserListing;

const styles = StyleSheet.create({
  parentContainer: {
    alignItems: 'center',
  },
  userListHeadingText: {
    textAlign: 'center',
    fontSize: 40,
    marginTop: 15,
  },
  userItemPressableContainer: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 20,
    borderRadius: 15,
    width: Platform.OS === 'android' ? '94%' : '100%',
    alignSelf: 'center',
    marginTop: 20,
    paddingHorizontal: Platform.OS === 'ios' ? 70 : 0
  },
  itemText: {
    textAlign: 'center',
  },
});
