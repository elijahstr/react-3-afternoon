import React, { Component } from 'react';
import axios from 'axios';
import Post from "./Post/Post"

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts").then(getPost => {this.setState({posts: getPost.data});
    });
  }

  updatePost(postId, newText) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${postId}`, {newText}).then(update=>{this.setState({posts: update.data})});
  }

  deletePost(postId) {
    axios.delete(`https:////practiceapi.devmountain.com/api/posts?id=${postId}`).then(update => {this.setState({posts: update.data})});
  }

  createPost(newText) {
    axios.post("https:////practiceapi.devmountain.com/api/posts", newText).then(update => {this.setState({posts: update.data})});
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />

          {posts.map(post => (
            <Post 
            key={post.id} 
            text={post.text}
            date={post.date}
            updatePostFn={this.updatePost}
            id={post.id}
            deletePostFn={this.deletePost} />
          ))}
          
        </section>
      </div>
    );
  }
}

export default App;
