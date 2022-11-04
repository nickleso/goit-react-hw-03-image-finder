import { Component } from 'react';
import PicturesAPI from 'components/API/pixabayImages-api';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from 'components/Loader/Loader';
import style from './ImageGallery.module.css';

const picturesSearchApi = new PicturesAPI();

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  state = {
    images: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    picturesSearchApi.query = nextName;

    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING });

      picturesSearchApi
        .fetchPictures(picturesSearchApi.query)
        .then(images => this.setState({ images, status: Status.RESOLVED }))
        .then(console.log(this.state.images))
        .catch(error => console.log(error));
    }
  }

  loadMoreImages() {
    console.log('click');
    picturesSearchApi.icrementPage();
    picturesSearchApi.fetchPictures();
  }

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

          <Button onClick={this.loadMoreImages} />
        </>
      );
    }
  }
}
