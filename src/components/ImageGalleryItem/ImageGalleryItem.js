import React from 'react';

const ImageGalleryItem = ({ handleImgClick, webformatURL, largeImageURL }) => {
  const onImageClick = src => {
    handleImgClick(src);
  };
  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt=""
        className="ImageGalleryItem-image"
        onClick={() => onImageClick(largeImageURL)}
      />
    </li>
  );
};

export default ImageGalleryItem;
