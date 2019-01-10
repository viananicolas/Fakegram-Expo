import React from "react";
import { TextInput, Text, View, Image, TouchableOpacity } from "react-native";
import { f, auth, storage, database } from "../../config/config";
import style from "../../styles/styles";
import profileStyle from "./styles";
import PhotoList from "../../components/photoList";
import UserAuth from "../../components/userAuth";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      emailLoginView: false,
      email: "",
      password: "",
      userId: "",
      username: "",
      name: "",
      avatar: "",
      userId: "",
      editingProfile: false
    };
  }

  fetchUserInfo = userId => {
    database
      .ref("users")
      .child(userId)
      .once("value")
      .then(value => {
        if (value.val()) {
          let user = value.val();
          this.setState({
            username: user.username,
            name: user.name,
            avatar: user.avatar,
            loggedIn: true,
            userId: userId
          });
        }
      });
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.fetchUserInfo(user.uid);
        //this.setState({ loggedIn: true, userId: user.uid });
        console.log("Logged", user);
      } else {
        this.setState({ loggedIn: false });
        console.log("Not logged");
      }
    });
    // this.loginUser("nicolas.viana@am4.com.br", "123@mudar");
    //this.registerUser("nicolas.viana@am4.com.br", "123@mudar");
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
  editProfile = () => {
    this.setState({ editingProfile: true });
  };
  saveProfile = () => {
    let name = this.state.name;
    let username = this.state.username;
    if (name) {
      database
        .ref("users")
        .child(this.state.userId)
        .child("name")
        .set(name);
      database
        .ref("users")
        .child(this.state.userId)
        .child("username")
        .set(username);
      this.setState({ editingProfile: false });
    }
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
                  uri: this.state.avatar
                }}
                style={profileStyle.profileImage}
              />
              <View style={{ marginRight: 10 }}>
                <Text>{this.state.name}</Text>
                <Text>@{this.state.username}</Text>
              </View>
            </View>
            {this.state.editingProfile ? (
              <View style={profileStyle.editProfileInputContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({ editingProfile: false })}
                >
                  <Text style={{ fontWeight: "bold" }}>Cancel</Text>
                </TouchableOpacity>
                <Text>Name:</Text>
                <TextInput
                  editable={true}
                  placeholder={"Enter your name"}
                  onChangeText={text => this.setState({ name: text })}
                  value={this.state.name}
                  style={profileStyle.editProfileInput}
                />
                <Text>Username:</Text>
                <TextInput
                  editable={true}
                  placeholder={"Enter your username"}
                  onChangeText={text => this.setState({ username: text })}
                  value={this.state.username}
                  style={profileStyle.editProfileInput}
                />
                <TouchableOpacity
                  onPress={() => this.saveProfile()}
                  style={profileStyle.saveChangesButton}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Save Changes
                  </Text>
                </TouchableOpacity>
                <Text>Edit profile</Text>
              </View>
            ) : (
              <View style={profileStyle.profileButtonsContainer}>
                <TouchableOpacity
                  style={profileStyle.profileButton}
                  onPress={() => this.signOut()}
                >
                  <Text style={profileStyle.profileButtonText}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={profileStyle.profileButton}
                  onPress={() => this.editProfile()}
                >
                  <Text style={profileStyle.profileButtonText}>
                    Edit Profile
                  </Text>
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
            )}
            <PhotoList
              isUser={true}
              userId={this.state.userId}
              navigation={this.props.navigation}
            />
          </View>
        ) : (
          <UserAuth message={"Please, login to view your profile"} />
        )}
      </View>
    );
  }
}
