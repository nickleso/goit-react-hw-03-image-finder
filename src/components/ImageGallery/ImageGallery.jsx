import { Component } from 'react';
import fetchPictures from 'components/API/pixabayImages-api';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from 'components/Loader/Loader';
import style from './ImageGallery.module.css';

// const picturesSearchApi = new PicturesAPI();

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  state = {
    images: null,
    page: 1,
    status: Status.IDLE,
  };

  pegeReset() {
    this.setState({ page: this.props.imagePage });
  }

  componentDidMount(prevProps) {}

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    // const prevPage = prevProps.imagePage;
    // const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });

      console.log(prevName);
      console.log(nextName);
      console.log(prevPage);
      console.log(nextPage);

      fetchPictures(nextName, this.state.page)
        .then(images => this.setState({ images, status: Status.RESOLVED }))
        .then()
        .then(console.log(this.state.images))
        .catch(error => console.log(error));
    }
  }

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    console.log('click');
  };

  render() {
    const { images, status } = this.state;

    if (status === 'idle') {
      return;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolved') {
      return (
        <>
          <section>
            <h2 className="visually-hidden">gallery section</h2>
            <ul className={style.ImageGallery}>
              <ImageGalleryItem images={images} />
            </ul>
          </section>

          {images.length < 12 ||
            (images.length > 0 && <Button onClick={this.loadMoreImages} />)}
        </>
      );
    }
  }
}
