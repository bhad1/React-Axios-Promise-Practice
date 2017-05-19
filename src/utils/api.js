import axios from 'axios';

module.exports = {
  fetchPictures: (numOfPictures) => {
    return axios.get('https://jsonplaceholder.typicode.com/photos').then((res) => {
      return res.data.slice(1,numOfPictures + 1);
    })
  }
}
