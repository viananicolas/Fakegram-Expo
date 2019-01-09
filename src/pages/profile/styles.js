import { StyleSheet, Dimensions } from "react-native";

module.exports = StyleSheet.create({
  loggedOutText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10
  },
  profileImage: {
    marginLeft: 10,
    width: 100,
    height: 100,
    borderRadius: 50
  }
});
