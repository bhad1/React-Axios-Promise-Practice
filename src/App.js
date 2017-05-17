import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Photo from './components/Photo';
import Loading from './components/Loading';
import axios from 'axios';
import fetchPictures from './utils/api';
var api = require('./utils/api');

function PhotoGallerySizes (props){
  var amounts = ["5", "10", "25", "100", "500"];

  return (
    <ul>
      {amounts.map((amount) => {
        return <li><a onClick={() => props.updateAmountChoice(amount)}>{amount}</a></li>
      })}
    </ul>
  )
}

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

  updateAmountChoice = (amount) =>{
    this.setState({
      numOfPhotos: parseInt(amount)
    })
  }

  componentDidMount() {
    api.fetchPictures(this.state.numOfPhotos).then(response => {
      const posts = response;
      this.setState({posts});
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
          <PhotoGallerySizes updateAmountChoice={this.updateAmountChoice} />
        </div>
        {console.log(this.state.numOfPhotos)}
        {content}
      </div>
    );
  }
}

export default App;
