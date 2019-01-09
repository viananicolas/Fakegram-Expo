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
import { f, auth, storage, database } from "../../config/config";

export default class Profile extends React.Component {
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
    this.loginUser("nicolas.viana@am4.com.br", "123@mudar");
  };
  async facebookLogin() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "524474748037636",
      {
        permissions: ["email", "public_profile"]
      }
    );
    if (type === "success") {
      const credentials = f.auth.FacebookAuthProvider.credential(token);
      auth.signInAndRetrieveDataWithCredential(credentials).then(
        success => {
          console.log("funcionou");
          console.log(success);
        },
        error => {
          console.log("deu ruim 1");
          console.log(error);
        }
      );
    } else {
      console.log("deu ruim 2");
      console.log(type);
    }
  }

  registerUser = (email, password) => {
    console.log(email);
    console.log(password);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(success => {
        console.log(success);
      })
      .catch(error => {
        console.log(error);
      });
  };

  loginUser = async (email, password) => {
    if (email && password) {
      try {
        let user = await auth.signInWithEmailAndPassword(email, password);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Email and/or password is invalid");
    }
  };

  signOut = () => {
    auth.signOut().then(
      () => {
        console.log("logged out");
      },
      error => {
        console.log("error when logging out");
      }
    );
  };
  render() {
    return (
      <View style={style.body}>
        {this.state.loggedIn ? (
          <View style={style.body}>
            <View style={style.topBar}>
              <Text>Profile</Text>
            </View>
            <View style={profileStyle.container}>
              <Image
                source={{
                  uri: "https://api.adorable.io/avatars/2/test@user.i.png"
                }}
                style={profileStyle.profileImage}
              />
              <View style={{ marginRight: 10 }}>
                <Text>Name</Text>
                <Text>@username</Text>
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
            <View style={profileStyle.bottomContent}>
              <Text>Loading</Text>
            </View>
          </View>
        ) : (
          <View style={profileStyle.loggedOutText}>
            <Text>Not logged in</Text>
          </View>
        )}
      </View>
    );
  }
}
