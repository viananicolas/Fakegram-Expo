import { StyleSheet, Dimensions } from "react-native";

module.exports = StyleSheet.create({
  body: {
    flex: 1
  },
  navigation: {
    paddingBottom: 15
  },
  topBar: {
    height: 70,
    paddingTop: 30,
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderBottomWidth: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  topBarUserProfile: {
    height: 70,
    paddingTop: 30,
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderBottomWidth: 0.5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  goBackButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    paddingLeft: 10
  },
  info: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loggedOutText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loginContainer: {
    marginVertical: 20,
    flexDirection: "row"
  },
  loginContainer2: {
    marginVertical: 20
  },
  loginButtonText: {
    fontWeight: "bold",
    color: "green"
  },
  signUpButtonText: {
    fontWeight: "bold",
    color: "blue"
  },
  separatorAuthButtons: {
    marginHorizontal: 10
  },
  cancelContainer: {
    borderBottomWidth: 1,
    paddingVertical: 5,
    marginBottom: 10,
    borderBottomColor: "black"
  },
  cancelText: {
    fontWeight: "bold"
  },
  loginStepText: {
    fontWeight: "bold",
    marginBottom: 20
  },
  loginInput: {
    width: 250,
    marginVertical: 10,
    padding: 5,
    borderColor: "grey",
    borderRadius: 10,
    borderWidth: 1
  },
  loginButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  loginSubmitText: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  }
});
