import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

//Screens
import {DrawerContent} from './CustomDrawer';
import BottomTab from '../BottomTab/BottomTab';
import LikedItems from '../../screens/Drawer/LikedItems';
import SavedItems from '../../screens/Drawer/SavedItems';
import AboutUs from '../../screens/Drawer/AboutUs';
import TermsCondition from '../../screens/Drawer/Terms&Conditions';
import ChatList from '../../screens/Drawer/ChatList/ChatList';

const Drawer = createDrawerNavigator();

export default function Drawerroute() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="BottomTab"
        component={BottomTab}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="LikedItems"
        component={LikedItems}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="SavedItems"
        component={SavedItems}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="AboutUs"
        component={AboutUs}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="TermsCondition"
        component={TermsCondition}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="ChatList"
        component={ChatList}
      />
    </Drawer.Navigator>
  );
}
