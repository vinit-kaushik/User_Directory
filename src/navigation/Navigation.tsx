import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UserListing from '../screens/UserListing';
import UserDetails from '../screens/UserDetails';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UserListing"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="UserListing" component={UserListing} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
