import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Photo from './components/Photo';
import Loading from './components/Loading';
import axios from 'axios';
import fetchPictures from './utils/api';
var api = require('./utils/api');


function PhotoGallerySizes (props){

  return (
    <ul>
      {props.amounts.map((amount) => {
        return (
                <li className="success">
                  <button className="numButton" onClick={() => props.updateAmountChoice(amount)}>{amount}</button>
                  <button className="xButton" onClick={() => props.deleteAmount(amount)}>X</button>
                </li>
              )
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
      photosReceived: false,
      amounts: ["5", "10", "25", "50", "100"]
    };
    // this.updateAmountChoice = this.updateAmountChoice.bind(this);
    // api.fetchPictures = api.fetchPictures.bind(this);
  }

  updateAmountChoice = (amount) =>{
    this.setState({
      numOfPhotos: parseInt(amount),
      photosReceived: false
    })

    api.fetchPictures(parseInt(amount)).then(response => {
      const posts = response;
      this.setState({posts});
      this.setState({photosReceived: true});
    });
    console.log(this.state);
  }

  deleteAmount = (xAmount) => {
    this.setState({
      amounts: this.state.amounts.filter((amount) =>{return amount != xAmount})
    });
  }

  // addNewAmount = (event) =>{
  //   this.setState({
  //     amounts: event.target.value
  //   })
  // }
  handleSubmit = (e) => {
    e.preventDefault();
    var newAmounts = this.state.amounts;
    var newAmount = this.refs.amountInput.value;
    this.refs.amountInput.value ="";
    newAmounts.push(newAmount);
    newAmounts.sort((a,b) => {return a-b});
    this.setState({
      amounts:newAmounts
    })
    console.log(this.state.amounts);
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
          <PhotoGallerySizes amounts={this.state.amounts} deleteAmount={this.deleteAmount} updateAmountChoice={this.updateAmountChoice} />
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input placeholder="New Amount" ref="amountInput"></input>
            <button type="submit"> Add Amount</button>
          </form>
        </div>
        {content}
      </div>
    );
  }
}

export default App;
