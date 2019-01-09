import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput
} from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import Feed from "./src/pages/feed/feed.js";
import Profile from "./src/pages/profile/profile.js";
import Upload from "./src/pages/upload/upload.js";
import Comments from "./src/pages/comments/comments.js";
import UserProfile from "./src/pages/userProfile/userProfile.js";
import MainStyles from "./src/styles/styles";
const TabStack = createBottomTabNavigator(
  {
    Feed: { screen: Feed },
    Upload: { screen: Upload },
    Profile: { screen: Profile }
  },
  { tabBarOptions: { style: MainStyles.navigation } }
);
//const TabNav = createAppContainer(TabStack);

const MainStack = createStackNavigator(
  {
    Home: { screen: TabStack },
    User: { screen: UserProfile },
    Comments: { screen: Comments }
  },
  {
    initialRouteName: "Home",
    mode: "modal",
    headerMode: "none"
  }
);

const MainNav = createAppContainer(MainStack);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <MainNav />;
  }
}
