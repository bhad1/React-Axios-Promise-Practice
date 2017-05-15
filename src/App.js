import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Photo from './components/Photo';
import Loading from './components/Loading';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      posts: [],
      rootAPI: 'https://jsonplaceholder.typicode.com',
      numOfPhotos: 100,
      photosReceived: false
    };
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/photos').then(response => {
      const posts = response.data.slice(1,this.state.numOfPhotos);
      this.setState({ posts });
      this.setState({photosReceived: true});
    });
  }

  render() {
    let content = null;
    if (this.state.photosReceived){
      content = <Photo posts={this.state.posts} rootAPI={this.state.rootAPI} numOfPhotos={this.state.numOfPhotos} />
    } else {
      content = <Loading />
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        {content}
      </div>
    );
  }
}

export default App;
