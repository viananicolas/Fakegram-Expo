import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import style from "../../styles/styles";
import { f, auth, storage, database } from "../../config/config";
import commentStyle from "./styles";
import UserAuth from "../../components/userAuth";

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      comments_list: [],
      photoId: "",
      refresh: false,
      loading: false,
      comment: ""
    };
  }

  checkParams = () => {
    let params = this.props.navigation.state.params;
    if (params && params.photoId) {
      this.setState({
        photoId: params.photoId
      });
      this.fetchComments(params.photoId);
    }
  };

  addCommentToList = (comments_list, data, comment) => {
    let commentObj = data[comment];
    database
      .ref("users")
      .child(commentObj.author)
      .child("username")
      .once("value")
      .then(
        snapshot => {
          if (snapshot.val()) {
            let username = snapshot.val();
            comments_list.push({
              id: comment,
              comment: commentObj.comment,
              posted: this.timeConverter(commentObj.posted),
              author: username,
              authorId: commentObj.author
            });
            this.setState({
              refresh: false,
              loading: false
            });
          }
        },
        error => console.log(error)
      );
  };

  fetchComments = photoId => {
    console.log(photoId);
    database
      .ref("comments")
      .child(photoId)
      .orderByChild("posted")
      .once("value")
      .then(snapshot => {
        console.log(snapshot.val());
        if (snapshot.val()) {
          let data = snapshot.val();
          let comments_list = this.state.comments_list;
          for (let comment in data) {
            this.addCommentToList(comments_list, data, comment);
          }
        } else {
          this.setState({
            comments_list: []
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  pluralCheck = s => {
    if (s === 1) return "ago";
    return "s ago";
  };

  timeConverter = timestamp => {
    let date = new Date(timestamp * 1000);
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} year${this.pluralCheck(interval)}`;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} month${this.pluralCheck(interval)}`;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} day${this.pluralCheck(interval)}`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hour${this.pluralCheck(interval)}`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minute${this.pluralCheck(interval)}`;
    return `${Math.floor(seconds)} second${this.pluralCheck(seconds)}`;
  };

  s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  uniqueId = () => {
    return `${this.s4()}${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}`;
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
    this.checkParams();
  };
  reloadCommentList = () => {
    this.setState({
      comments_list: []
    });
    this.fetchComments(this.state.photoId);
  };
  postComment = () => {
    let comment = this.state.comment;
    if (comment) {
      let imageId = this.state.photoId;
      console.log(imageId);
      let userId = auth.currentUser.uid;
      let commentId = this.uniqueId();
      let dateTime = Date.now();
      let timestamp = Math.floor(dateTime / 1000);

      this.setState({
        comment: ""
      });
      let commentObj = {
        posted: timestamp,
        author: userId,
        comment: comment
      };
      database
        .ref(`/comments/${imageId}/${commentId}`)
        .set(commentObj)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
      this.reloadCommentList();
    }
  };
  render() {
    return (
      <View style={style.body}>
        <View style={style.topBarUserProfile}>
          <TouchableOpacity
            style={{ width: 100 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={style.goBackButtonText}>Go Back</Text>
          </TouchableOpacity>
          <Text>Comments</Text>
          <Text style={{ width: 100 }} />
        </View>
        {this.state.comments_list.length > 0 ? (
          <FlatList
            refreshing={this.state.refresh}
            data={this.state.comments_list}
            keyExtractor={(item, index) => index.toString()}
            style={commentStyle.commentsList}
            renderItem={({ item, index }) => (
              <View key={index} style={commentStyle.commentsListItem}>
                <View style={commentStyle.commentContainer}>
                  <Text>{item.posted}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("User", {
                        userId: item.authorId
                      })
                    }
                  >
                    <Text>@{item.author}</Text>
                  </TouchableOpacity>
                </View>
                <View style={commentStyle.comment}>
                  <Text>{item.comment}</Text>
                </View>
              </View>
            )}
          />
        ) : (
          <Text>No comments</Text>
        )}
        {this.state.loggedIn ? (
          <KeyboardAvoidingView
            behavior="padding"
            enabled
            style={commentStyle.commentInputContainer}
          >
            <Text style={commentStyle.commentInputHeaderText}>
              Post Comment
            </Text>
            <View>
              <TextInput
                editable={true}
                placeholder={"Enter your comment"}
                onChangeText={text => this.setState({ comment: text })}
                style={commentStyle.commentTextInput}
                value={this.state.comment}
              />
              <TouchableOpacity
                style={commentStyle.postCommentButton}
                onPress={() => this.postComment()}
              >
                <Text style={commentStyle.postCommentButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        ) : (
          <UserAuth message={"Please, login to comment a photo"} />
        )}
      </View>
    );
  }
}
