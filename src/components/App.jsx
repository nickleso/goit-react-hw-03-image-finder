import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {
  state = {
    imageName: '',
    imagePage: 1,
    showModal: false,
  };

  handleFormSubmit = (imageName, imagePage) => {
    this.setState({ imageName, imagePage });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    // const { imageName, imagePage } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          imageName={this.state.imageName}
          imagePage={this.state.imagePage}
        />

        {this.state.showModal && <Modal onClose={this.toggleModal}></Modal>}
      </>
    );
  }
}
