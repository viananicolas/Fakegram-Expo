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
import profileStyle from "./styles";
import PhotoList from "../../components/photoList";
import { f, auth, storage, database } from "../../config/config";

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  checkParams = () => {
    let params = this.props.navigation.state.params;
    if (params && params.userId) {
      this.setState({
        userId: params.userId
      });
      this.fetchUserInfo(params.userId);
    }
  };

  fetchUserInfo = userId => {
    database
      .ref("users")
      .child(userId)
      .child("username")
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          this.setState({ username: snapshot.val() });
        }
      })
      .catch(error => {
        console.log(error);
      });
    database
      .ref("users")
      .child(userId)
      .child("name")
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          this.setState({ name: snapshot.val() });
        }
      })
      .catch(error => {
        console.log(error);
      });
    database
      .ref("users")
      .child(userId)
      .child("avatar")
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          this.setState({ avatar: snapshot.val(), loaded: true });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  componentDidMount = () => {
    this.checkParams();
  };

  render() {
    return (
      <View style={style.body}>
        {this.state.loaded ? (
          <View style={style.body}>
            <View style={style.topBarUserProfile}>
              <TouchableOpacity
                style={{ width: 100 }}
                onPress={() => this.props.navigation.goBack()}
              >
                <Text style={style.goBackButtonText}>Go Back</Text>
              </TouchableOpacity>
              <Text>Profile</Text>
              <Text style={{ width: 100 }} />
            </View>
            <View style={profileStyle.container}>
              <Image
                source={{
                  uri: this.state.avatar
                }}
                style={profileStyle.profileImage}
              />
              <View style={{ marginRight: 10 }}>
                <Text>{this.state.name}</Text>
                <Text>@{this.state.username}</Text>
              </View>
            </View>
            <View style={profileStyle.profileButtonsContainer}>
              <TouchableOpacity style={profileStyle.profileButton}>
                <Text style={profileStyle.profileButtonText}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={profileStyle.profileButton}>
                <Text style={profileStyle.profileButtonText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Upload")}
                style={profileStyle.profileButtonUpload}
              >
                <Text style={profileStyle.profileButtonTextUpload}>
                  Upload New +
                </Text>
              </TouchableOpacity>
            </View>
            <PhotoList isUser={true} userId={this.state.userId} navigation={this.props.navigation} />
          </View>
        ) : (
          <View style={profileStyle.loggedOutText}>
            <Text>Loading</Text>
          </View>
        )}
      </View>
    );
  }
}
