import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput
} from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Feed from "./src/pages/feed/feed.js";
import Profile from "./src/pages/profile/profile.js";
import Upload from "./src/pages/upload/upload.js";
import MainStyles from "./src/styles/styles";
const MainStack = createBottomTabNavigator(
  {
    Feed: { screen: Feed },
    Upload: { screen: Upload },
    Profile: { screen: Profile }
  },
  { tabBarOptions: { style: MainStyles.navigation } }
);

const NavBar = createAppContainer(MainStack);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <NavBar />;
  }
}
