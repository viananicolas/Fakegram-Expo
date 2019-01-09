import React from "react";
import {
  ActivityIndicator,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import style from "../../styles/styles";
import { f, auth, storage, database } from "../../config/config";
import uploadStyle from "./styles";
import { Permissions, ImagePicker } from "expo";
export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      imageId: "0",
      imageSelected: false,
      uri: "",
      caption: "",
      uploading: false,
      userId: "",
      progress: 0
    };
  }
  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true, userId: f.auth().currentUser.uid });
        console.log("Logged", user);
      } else {
        this.setState({ loggedIn: false });
        console.log("Not logged");
      }
    });
  };

  _checkPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { statusRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ camera: status, cameraRoll: statusRoll });
  };

  s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  uniqueId = () => {
    return `${this.s4()}${this.s4()}-${this.s4()}-${this.s4()}-
            ${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}`;
  };

  findNewImage = async () => {
    this._checkPermissions();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      quality: 1
    });
    console.log(result);
    if (!result.cancelled) {
      //this.uploadImage(result.uri);
      this.setState({
        imageSelected: true,
        imageId: this.uniqueId(),
        uri: result.uri
      });
      console.log(this.state.uri);
    } else {
      console.log("cancelled");
      this.setState({ imageSelected: false });
    }
  };

  uploadPublish = () => {
    if (this.state.uploading == false) {
      if (this.state.caption != "") {
        //
        this.uploadImage(this.state.uri);
      } else {
        alert("Please enter a caption..");
      }
    } else {
      console.log("Ignore button tap as already uploading");
    }
  };

  uploadImage = async uri => {
    let imageId = this.state.imageId;
    let ext = uri.split(".").pop();
    console.log(ext);
    this.setState({
      currentFileType: ext,
      uploading: true
    });
    let filePath = `${imageId}.${this.state.currentFileType}`;
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", uri, true);
    xmlHttpRequest.responseType = "blob";
    xmlHttpRequest.onload = () => {
      const blob = xmlHttpRequest.response;
      this.completeUploadBlob(blob, filePath);
    };
    xmlHttpRequest.send();
  };

  completeUploadBlob = (blob, filePath) => {
    let userId = this.state.userId;
    let uploadTask = f.storage()
      .ref(`user/${userId}/img`)
      .child(filePath)
      .put(blob);
    uploadTask.on(
      "state_changed",
      snapshot => {
        let progress = (
          (snapshot.bytesTransferred / snapshot.totalBytes) *
          100
        ).toFixed(0);
        console.log(`Porcentagem de conclusão do upload: ${progress}%`);
        this.setState({ progress: progress });
      },
      error => {
        console.log(error);
      },
      () => {
        this.setState({ progress: 100 });
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log(downloadURL);
          this.processUpload(downloadURL);
        });
      }
    );
  };

  processUpload = imageUrl => {
    let imageId = this.state.imageId;
    let userId = this.state.userId;
    let caption = this.state.caption;
    let dateTime = Date.now();
    let timestamp = Math.floor(dateTime / 1000);

    let photoObj = {
      author: userId,
      caption: caption,
      posted: timestamp,
      url: imageUrl
    };

    database.ref(`/photos/${imageId}`).set(photoObj);
    database.ref(`/users/${userId}/photos/${imageId}`).set(photoObj);

    alert("Image uploaded successfully");
    this.setState({
      uploading: false,
      imageSelected: false,
      caption: "",
      uri: "",
      imageId: "0"
    });
  };

  render() {
    return (
      <View style={style.body}>
        {this.state.loggedIn ? (
          <View style={style.info}>
            {this.state.imageSelected ? (
              <View style={style.body}>
                <View style={style.topBar}>
                  <Text style={uploadStyle.uploadText}>Upload</Text>
                </View>
                <View style={uploadStyle.captionContainer}>
                  <Text style={uploadStyle.captionText}>Caption:</Text>
                  <TextInput
                    style={uploadStyle.captionTextInput}
                    editable={true}
                    placeholder={"Enter your caption"}
                    maxLength={150}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={text => this.setState({ caption: text })}
                  />
                  <TouchableOpacity
                    onPress={() => this.uploadPublish()}
                    style={uploadStyle.uploadButton}
                  >
                    <Text style={uploadStyle.uploadButtonText}>
                      Upload and Publish
                    </Text>
                  </TouchableOpacity>
                  {this.state.uploading ? (
                    <View style={{ marginTop: 10 }}>
                      <Text>{this.state.progress}%</Text>
                      {this.state.progress !== 100 ? (
                        <ActivityIndicator size="small" color="blue" />
                      ) : (
                        <Text>Processing</Text>
                      )}
                    </View>
                  ) : (
                    <View />
                  )}
                  <Image
                    source={{ uri: this.state.uri }}
                    style={uploadStyle.image}
                  />
                </View>
              </View>
            ) : (
              <View style={style.info}>
                <Text style={uploadStyle.uploadText}>Upload</Text>
                <TouchableOpacity
                  style={uploadStyle.photoSelectionContainer}
                  onPress={() => this.findNewImage()}
                >
                  <Text style={uploadStyle.photoSelectionText}>
                    Select Photo
                  </Text>
                </TouchableOpacity>
              </View>
              // <View />
            )}
          </View>
        ) : (
          <View style={style.info}>
            <Text>Not logged in</Text>
          </View>
        )}
      </View>
    );
  }
}
