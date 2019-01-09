import { StyleSheet, Dimensions } from "react-native";

module.exports = StyleSheet.create({
  uploadText: {
    fontSize: 28,
    paddingBottom: 15
  },
  photoSelectionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "blue",
    borderRadius: 5
  },
  photoSelectionText: {
    color: "white"
  },
  captionContainer: {
    padding: 5
  },
  captionText: {
    marginTop: 5
  },
  captionTextInput: {
    marginVertical: 10,
    height: 100,
    padding: 5,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "white",
    color: "black"
  },
  uploadButton: {
    alignSelf: "center",
    width: 170,
    marginHorizontal: "auto",
    backgroundColor: "purple",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  uploadButtonText: {
    textAlign: "center",
    color: "white"
  },
  image: {
    marginTop: 10,
    resizeMode: "cover",
    width: "100%",
    height: 275
  }
});
