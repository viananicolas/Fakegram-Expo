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
  }
});
