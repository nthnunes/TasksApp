import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Task from "./src/pages/Task/"
import NewTask from "./src/pages/NewTask/"
import Details from "./src/pages/Details/"
import Completed from "./src/pages/Completed/"
import Login from "./src/pages/Login/"
import NewUser from "./src/pages/NewUser/"


const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="NewUser"
          component={NewUser}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Tasks"
          component={Task}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="New Task"
          component={NewTask}
          options={{
            headerTintColor:"#f92e6a"
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerTintColor:"#f92e6a"
          }}
        />
        <Stack.Screen
          name="Completed"
          component={Completed}
          options={{
            headerTintColor:"#f92e6a"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}