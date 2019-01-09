import { StyleSheet, Dimensions } from "react-native";

module.exports = StyleSheet.create({
  feedImage: {
    resizeMode: "cover",
    width: "100%",
    height: 275
  },
  feedImageContainer: {
    flex: 1,
    backgroundColor: "#eee"
  },
  feedImageSubContainer: {
    width: "100%",
    overflow: "hidden",
    marginBottom: 5,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "grey"
  },
  feedImageHeaderText: {
    padding: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  feedImageFooterText: {
    padding: 5
  },
  feedImageCommentText: {
    marginTop: 10,
    textAlign: "center",
    color: "blue"
  }
});
