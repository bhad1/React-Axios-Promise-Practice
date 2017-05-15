import React, { Component } from 'react';
import axios from 'axios';

class Photo extends Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <div className="App">
        <ul>
        {console.log(this.props.posts)}
          {this.props.posts.map(post =>
            <img src={post.url} key={post.id}></img>
          )}
        </ul>
      </div>
    );
  }
}

export default Photo;
