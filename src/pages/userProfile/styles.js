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
  },
  profileButtonsContainer: {
    paddingBottom: 20,
    borderBottomWidth: 1
  },
  profileButton: {
    marginTop: 10,
    marginHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 20,
    borderColor: "grey",
    borderWidth: 1.5
  },
  profileButtonUpload: {
    marginTop: 10,
    marginHorizontal: 40,
    paddingVertical: 35,
    borderRadius: 20,
    borderColor: "grey",
    borderWidth: 1.5,
    backgroundColor: "grey"
  },
  profileButtonText: {
    textAlign: "center",
    color: "grey"
  },
  profileButtonTextUpload: {
    textAlign: "center",
    color: "white"
  },
  bottomContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green"
  }
});
