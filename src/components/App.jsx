import { Component } from 'react';
import fetchPictures from 'components/API/pixabayImages-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import style from './Searchbar/Searchbar.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {
  state = {
    imageName: '',
    images: [],
    page: 1,
    showButton: false,
    showModal: false,
    status: Status.IDLE,
    modalImage: '',
    imageAlt: '',
  };

  componentDidUpdate(_, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });

      fetchPictures(nextName, this.state.page)
        .then(images => {
          if (images.hits.length < 1) {
            this.setState({
              showButton: false,
              status: Status.IDLE,
            });
            return alert('No images on your query');
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
          }));

          this.setState({
            status: Status.RESOLVED,
            showButton:
              this.state.page < Math.ceil(images.total / 12) ? true : false,
          });
        })

        .then(console.log(this.state.images))
        .catch(error => console.log(error));
    }
  }

  handleFormSubmit = imageName => {
    if (imageName === this.state.imageName) {
      return;
    }

    this.setState({
      imageName,
      page: 1,
      images: [],
      showButton: false,
      showModal: false,
      status: Status.IDLE,
    });
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleModalImage = event => {
    this.setState({ modalImage: event });
  };

  handleModalAlt = event => {
    this.setState({ imageAlt: event });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { images, status, showModal, modalImage, imageAlt, showButton } =
      this.state;

    const {
      handleFormSubmit,
      toggleModal,
      handleModalImage,
      handleModalAlt,
      loadMoreImages,
    } = this;

    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />

        {status === 'idle' && (
          <h2 className={style.EmptySearch}>Search something!</h2>
        )}

        {status === 'pending' && <Loader />}

        {images.length > 0 && (
          <ImageGallery
            showModal={toggleModal}
            images={images}
            handleModalImage={handleModalImage}
            handleModalAlt={handleModalAlt}
          />
        )}

        {showButton && <Button onClick={loadMoreImages} />}

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={modalImage} alt={imageAlt} />
          </Modal>
        )}
      </>
    );
  }
}
