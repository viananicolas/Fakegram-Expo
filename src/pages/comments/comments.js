import React from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import Styles from "../../styles/styles";
import { f, auth, storage, database } from "../../config/config";

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      emailLoginView: false,
      email: "",
      password: ""
    };
  }
  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
        console.log("Logged", user);
      } else {
        this.setState({ loggedIn: false });
        console.log("Not logged");
      }
    });
  };

  render() {
    return (
      <View style={Styles.body}>
        {this.state.loggedIn ? (
          <Text>Comments</Text>
        ) : (
          <View>
            <Text>Not logged in</Text>
          </View>
        )}
      </View>
    );
  }
}
