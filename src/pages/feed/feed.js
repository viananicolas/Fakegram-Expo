import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import style from "../../styles/styles";
import feedStyle from "./styles";
import { f, auth, storage, database } from "../../config/config";

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo_feed: [],
      refresh: false,
      loading: true
    };
  }

  componentDidMount = () => {
    this.loadFeed();
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

  loadFeed = () => {
    this.setState({
      refresh: true,
      photo_feed: []
    });
    database
      .ref("photos")
      .orderByChild("posted")
      .once("value")
      .then(photographs => {
        if (photographs.val()) {
          let data = this.state.photo_feed;
          let photosDb = photographs.val();
          for (let photoDb in photosDb) {
            const element = photosDb[photoDb];
            console.log(element);
            database
              .ref("users")
              .child(element.author)
              .child("username")
              .once("value")
              .then(users => {
                console.log("chamou?");
                //console.log(users.val());
                if (users.val()) {
                  let user = users.val();
                  data.push({
                    id: photoDb,
                    url: element.url,
                    caption: element.caption,
                    posted: this.timeConverter(element.posted),
                    author: user,
                    authorId: element.author
                  });
                  this.setState({
                    refresh: false,
                    loading: false
                  });
                  console.log(this.state.photo_feed[0].url);
                }
              })
              .catch(error => {
                console.log(error);
              });
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
        <View style={style.topBar}>
          <Text>Feed</Text>
        </View>
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
                        userId: item.authorId
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
