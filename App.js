import React from 'react'
import { Image, ListView, View, Text } from 'react-native'


const API_KEY = 'xxx'; //write here your own api key
const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';
const FULL_REQUEST_URL = 'https://api.themoviedb.org/3/discover/movie?api_key='+API_KEY

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(FULL_REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results),
          movies: responseData.results,
        });
      });
    }

  render () {
    return (


          <ListView style={{ flex: 0 }} 
          dataSource={this.state.dataSource}
          renderRow={this.renderSingleMovie.bind(this)}/>

    )
  }
  renderSingleMovie(movie) {
    return (
      <View>

        <Image
          style={{esizeMode: 'cover', height: 200,flex:1 } }
          source={{uri: POSTER_PATH + movie.poster_path}} />

          <View>
            <Text>{movie.title}</Text>
            <Text>{movie.release_date}</Text>
          </View>

        </View>
      )
  }

}


export default App
