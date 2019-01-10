import React from "react";
import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";
import { f, auth, database } from "../config/config";
import style from "../styles/styles";
import feedStyle from "../pages/feed/styles";
export default class PhotoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo_feed: [],
      refresh: false,
      loading: true
    };
  }

  componentDidMount = () => {
    const { isUser, userId } = this.props;
    if (isUser) {
      this.loadFeed(userId);
    } else {
      this.loadFeed();
    }
  };

  
  addToFlatList = (photo_feed, data, photo) => {
    const photoObj = data[photo];
    console.log("valor banco");
    console.log(photoObj);
    database
      .ref("users")
      .child(photoObj.author)
      .child("username")
      .once("value")
      .then(users => {
        if (users.val()) {
          let user = users.val();
          console.log(user);
          photo_feed.push({
            id: photo,
            url: photoObj.url,
            caption: photoObj.caption,
            posted: this.timeConverter(photoObj.posted),
            author: user,
            authorId: photoObj.author
          });
          this.setState({
            refresh: false,
            loading: false
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

  loadFeed = userId => {
    this.setState({
      refresh: true,
      photo_feed: []
    });
    let loadRef = database.ref("photos");
    if (userId) {
      loadRef = database
        .ref("users")
        .child(userId)
        .child("photos");
    }
    loadRef
      .orderByChild("posted")
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          let photo_feed = this.state.photo_feed;
          let data = snapshot.val();
          for (let photo in data) {
            this.addToFlatList(photo_feed, data, photo);
          }
        } else {
          console.log("não chamou");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  fetchData = () => {
    this.loadFeed();
  };

  render() {
    return (
      <View style={style.body}>
        {this.state.loading ? (
          <View>
            <Text
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              Loading
            </Text>
          </View>
        ) : (
          <FlatList
            refreshing={this.state.refresh}
            onRefresh={this.fetchData}
            data={this.state.photo_feed}
            keyExtractor={(item, index) => index.toString()}
            style={feedStyle.feedImageContainer}
            renderItem={({ item, index }) => (
              <View key={index} style={feedStyle.feedImageSubContainer}>
                <View style={feedStyle.feedImageHeaderText}>
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
                <View>
                  <Image
                    style={feedStyle.feedImage}
                    source={{
                      uri: item.url
                    }}
                  />
                </View>
                <View style={feedStyle.feedImageFooterText}>
                  <Text>{item.caption}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("Comments", {
                        photoId: item.id
                      })
                    }
                  >
                    <Text style={feedStyle.feedImageCommentText}>
                      [ View Comments ]
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}
