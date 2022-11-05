import { Component } from 'react';
import fetchPictures from 'components/API/pixabayImages-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

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
    totalImages: 0,
    showModal: false,
    status: Status.IDLE,
    modalImage: '',
    imageAlt: '',
  };

  componentDidUpdate(prevProps, prevState) {
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
              status: Status.IDLE,
            });
            return alert('No images on your query');
          }

          this.setState({
            images:
              this.state.page === 1
                ? images.hits
                : [...prevState.images, ...images.hits],
            totalImages: images.total,
            status: Status.RESOLVED,
          });
        })

        .then(console.log(this.state.images))
        .catch(error => console.log(error));
    }
  }

  handleFormSubmit = imageName => {
    this.setState({
      imageName,
      page: 1,
      images: [],
      totalImages: 0,
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
    const {
      images,
      page,
      status,
      showModal,
      modalImage,
      imageAlt,
      totalImages,
    } = this.state;

    const totalPages = Math.ceil(totalImages / 12);

    const renderIfPending = () => status === 'pending' && <Loader />;

    const renderIfResolved = () =>
      status === 'resolved' && (
        <ImageGallery
          showModal={this.toggleModal}
          images={images}
          handleModalImage={this.handleModalImage}
          handleModalAlt={this.handleModalAlt}
        />
      );

    const showButtonLoadMore = () =>
      page <= totalPages - 1 && <Button onClick={this.loadMoreImages} />;

    const renderModal = () =>
      showModal && (
        <Modal onClose={this.toggleModal}>
          <img src={modalImage} alt={imageAlt} />
        </Modal>
      );

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {renderIfPending()}
        {renderIfResolved()}
        {showButtonLoadMore()}
        {renderModal()}
      </>
    );
  }
}
