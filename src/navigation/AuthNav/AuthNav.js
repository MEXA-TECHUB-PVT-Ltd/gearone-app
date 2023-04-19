import * as React from 'react';
import {View, Text} from 'react-native';

///////////////////navigation prop///////////////
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import Login from '../../screens/Auth/Login';
import CreateProfile from '../../screens/Auth/CreateProfile';
import Verification from '../../screens/Auth/Verification';

const Stack = createNativeStackNavigator();
function AuthNav() {
  return (
    <Stack.Navigator>
            <Stack.Screen
        name="CreateProfile"
        component={CreateProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthNav;
