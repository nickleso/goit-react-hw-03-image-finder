import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {
  state = {
    image: '',
  };

  handleFormSubmit = image => {
    this.setState({ image });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
      </>
    );
  }
}
