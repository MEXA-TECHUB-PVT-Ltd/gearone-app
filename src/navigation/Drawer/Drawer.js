import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';


//Screens
import { DrawerContent } from './CustomDrawer';
import BottomTab from '../BottomTab/BottomTab';


const Drawer = createDrawerNavigator();

export default function Drawerroute() {

    return (
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen 
        options={{
          headerShown: false,
          }}
      name="BottomTab" component={BottomTab}/>
    </Drawer.Navigator>
    
        
    );
  }