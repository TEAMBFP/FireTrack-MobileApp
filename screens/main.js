import * as React from 'react'
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Account from "./drawnav/Account";
import AboutUs from "./drawnav/AboutUs";
import Logout from './drawnav/Logout';
import Dashboard from './drawnav/Dashboard';
import DrawerNav from '../componets/DrawerNav';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NativeModules } from "react-native";
import apiService from '../api/config';
import { removeCreds } from '../lib/TokenHandler';
import {Alert} from 'react-native';



const Drawer = createDrawerNavigator();

const MainScreen = (props)=> {
  const handleLogout = async() => {
    try {
      const request = await apiService.get('/logout');
      if(request){
        props.navigation.navigate('Home')
        await removeCreds()
      }
      
    } catch (error) {
      console.log('Error logout',error);
    }
    
  }

  const alertButton = () =>
    Alert.alert('Logout', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Logout', onPress: async() => await handleLogout()},
    ]);
    return (

      <Drawer.Navigator drawerContent={props =>
      <DrawerContentScrollView>
        <DrawerNav {...props} />
        <DrawerItem
          label="Logout"
          onPress={alertButton}
          icon={() => <Icon name="logout" size={22} />} 
        />
        </DrawerContentScrollView>
        }
        screenOptions={{
          drawerActiveBackgroundColor: '#FB9246',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
          drawerLabelStyle: {
            marginLeft: 25,
            fontSize: 15,
          },
          
          headerShown:true
        }}
      >

        <Drawer.Screen name="Dashboard" component={Dashboard}
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="home" size={22} color={color} />
            ),
          }} />

        <Drawer.Screen name="My Account" component={Account}
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="user" size={22} color={color} />
            ),
          }}
        />

        <Drawer.Screen name="About Us" component={AboutUs}
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="heart" size={22} color={color} />
            ),
          }} />

        {/* <Button name="Logout" component={Logout} 
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="logout" size={22} color={color} />
            ),
          }} 
          
          /> */}
      </Drawer.Navigator>


    );
  
}

export default MainScreen;