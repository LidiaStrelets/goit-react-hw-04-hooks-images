import React, { useEffect, useState } from 'react';
import './App.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import BtnMore from './components/BtnMore';
import Modal from './components/Modal';
import imagesApi from './services/image-service';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const App = () => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bigImage, setBigImage] = useState(null);

  useEffect(() => {
    populateImages();
  }, [currentQuery, currentPage]);

  const onFormSubmit = query => {
    setCurrentQuery(query);
    setCurrentPage(1);
    setImages([]);
  };

  function populateImages() {
    setIsLoading(true);
    imagesApi
      .fetchImages({ currentQuery, currentPage })
      .then(imagesResponse => {
        // setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
        setImages(prevImages => [
          ...prevImages,
          ...imagesResponse.map(({ id, webformatURL, largeImageURL }) => ({
            id,
            webformatURL,
            largeImageURL,
          })),
        ]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleMoreClick = () => {
    // populateImages();
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  const handleImgClick = src => {
    setBigImage(src);
    setShowModal(true);
  };
  const toggleModal = event => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <div>
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <img src={bigImage} alt="" />
        </Modal>
      )}
      <Searchbar onFormSubmit={onFormSubmit} />
      {images.length > 0 && (
        <>
          <ImageGallery handleImgClick={handleImgClick} images={images} />
          {isLoading ? (
            <Loader
              type="Circles"
              color="#bd2745"
              height={70}
              width={70}
              timeout={3000}
              className="Spinner"
            />
          ) : (
            <BtnMore onBtn={handleMoreClick} />
          )}
        </>
      )}
      {isLoading && images.length === 0 && (
        <Loader
          type="Circles"
          color="#bd2745"
          height={70}
          width={70}
          timeout={3000}
          className="Spinner"
        />
      )}
    </div>
  );
};

export default App;
