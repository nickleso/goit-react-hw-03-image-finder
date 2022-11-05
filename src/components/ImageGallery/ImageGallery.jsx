import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import style from './ImageGallery.module.css';

export const ImageGallery = ({
  images,
  handleModalImage,
  handleModalAlt,
  showModal,
}) => {
  return (
    <section>
      <h2 className="visually-hidden">gallery section</h2>
      <ul className={style.ImageGallery}>
        <ImageGalleryItem
          images={images}
          handleModalImage={handleModalImage}
          handleModalAlt={handleModalAlt}
          showModal={showModal}
        />
      </ul>
    </section>
  );
};
