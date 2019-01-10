import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  Image
} from "react-native";
import { f, auth, database } from "../config/config";
import style from "../styles/styles";
import feedStyle from "../pages/feed/styles";
import { TextInput } from "react-native-gesture-handler";
export default class UserAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authStep: 0,
      email: "",
      password: "",
      moveScreen: false
    };
  }

  componentDidMount = () => {
    // this.loginUser("nicolas.viana@am4.com.br", "123@mudar");
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
  signUp = async (email, password) => {
    if (email && password) {
      try {
        let user = await auth
          .createUserWithEmailAndPassword(email, password)
          .then(user => {
            this.createUserObject(user.user, email);
          });
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Email and/or password is invalid");
    }
  };
  createUserObject = (user, email) => {
    let userObj = {
      email: email,
      username: "@temp",
      avatar: "http://www.gravatar.com/avatar",
      name: "Un nombre cualquier"
    };

    database
      .ref("users")
      .child(user.uid)
      .set(userObj);
  };
  render() {
    return (
      <View style={style.body}>
        <View style={style.loggedOutText}>
          <Text>Not logged in</Text>
          <Text>{this.props.message}</Text>
          {this.state.authStep === 0 ? (
            <View style={style.loginContainer}>
              <TouchableOpacity onPress={() => this.setState({ authStep: 1 })}>
                <Text style={style.loginButtonText}>Login</Text>
              </TouchableOpacity>
              <Text style={style.separatorAuthButtons}>or</Text>
              <TouchableOpacity onPress={() => this.setState({ authStep: 2 })}>
                <Text style={style.signUpButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={style.loginContainer2}>
              {this.state.authStep === 1 ? (
                <View>
                  <TouchableOpacity
                    onPress={() => this.setState({ authStep: 0 })}
                    style={style.cancelContainer}
                  >
                    <Text style={style.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <Text style={style.loginStepText}>Login</Text>
                  <Text>Email address:</Text>
                  <TextInput
                    editable={true}
                    keyboardType={"email-address"}
                    placeholder={"Enter your email"}
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                    style={style.loginInput}
                  />
                  <Text>Password:</Text>
                  <TextInput
                    editable={true}
                    textContentType={"password"}
                    secureTextEntry={true}
                    placeholder={"Enter your email"}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                    style={style.loginInput}
                  />
                  <TouchableOpacity
                    style={style.loginButton}
                    onPress={() =>
                      this.loginUser(this.state.email, this.state.password)
                    }
                  >
                    <Text style={style.loginSubmitText}>Login</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    onPress={() => this.setState({ authStep: 0 })}
                    style={style.cancelContainer}
                  >
                    <Text style={style.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <Text style={style.loginStepText}>SignUp</Text>
                  <Text>Email address:</Text>
                  <TextInput
                    editable={true}
                    keyboardType={"email-address"}
                    placeholder={"Enter your email"}
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                    style={style.loginInput}
                  />
                  <Text>Password:</Text>
                  <TextInput
                    editable={true}
                    textContentType={"password"}
                    secureTextEntry={true}
                    placeholder={"Enter your email"}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                    style={style.loginInput}
                  />
                  <TouchableOpacity
                    style={style.loginButton}
                    onPress={() =>
                      this.signUp(this.state.email, this.state.password)
                    }
                  >
                    <Text style={style.loginSubmitText}>SignUp</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    );
  }
}
