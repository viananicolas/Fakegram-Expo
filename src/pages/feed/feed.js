import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import style from "../../styles/styles";
import feedStyle from "./styles";
import { f, auth, storage, database } from "../../config/config";
import PhotoList from "../../components/photoList";
import UserAuth from "../../components/userAuth";

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {};

  render() {
    return (
      <View style={style.body}>
        <View style={style.topBar}>
          <Text>Feed</Text>
        </View>
        <PhotoList
          isUser={false}
          userId={null}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}
