import style from '../ImageGallery/ImageGallery.module.css';

export const ImageGalleryItem = ({ images }) => {
  return (
    <>
      {images.map(image => (
        <li key={image.id} className={style.ImageGalleryItem}>
          <img
            src={image.webformatURL}
            alt={image.tags}
            className={style.ImageGalleryItem__image}
          />
        </li>
      ))}
    </>
  );
};
