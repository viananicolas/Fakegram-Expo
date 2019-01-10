import { StyleSheet, Dimensions } from "react-native";

module.exports = StyleSheet.create({
  commentsList: {
    flex: 1,
    backgroundColor: "#eee"
  },
  commentsListItem: {
    width: "100%",
    overflow: "hidden",
    marginBottom: 5,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "grey"
  },
  commentContainer: {
    padding: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  comment: {
    padding: 5
  },
  commentInputContainer: {
    borderTopWidth: 1,
    borderTopColor: "grey",
    padding: 10,
    marginBottom: 15
  },
  commentInputHeaderText: {
    fontWeight: "bold"
  },
  commentTextInput: {
    marginVertical: 10,
    height: 50,
    padding: 5,
    borderRadius: 3,
    borderColor: "grey",
    backgroundColor: "white",
    color: "black"
  },
  postCommentButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "blue",
    borderRadius: 5
  },
  postCommentButtonText: {
    color: "white"
  }
});
