import React, { Component } from 'react';
import './App.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import BtnMore from './components/BtnMore';
import Modal from './components/Modal';
import imagesApi from './services/image-service';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

class App extends Component {
  state = { currentQuery: '', currentPage: 1, images: [], isLoading: false, showModal: false };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentQuery !== this.state.currentQuery) {
      this.populateImages();
    }
  }

  onFormSubmit = query => {
    this.setState({ currentQuery: query, currentPage: 1, images: [] });
  };

  populateImages = () => {
    this.setState({ isLoading: true });
    const { currentQuery, currentPage } = this.state;
    imagesApi
      .fetchImages({ currentQuery, currentPage })
      .then(images => {
        this.setState(prevState => ({
          currentPage: prevState.currentPage + 1,
          images: [
            ...prevState.images,
            ...images.map(({ id, webformatURL, largeImageURL }) => ({
              id,
              webformatURL,
              largeImageURL,
            })),
          ],
        }));
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleMoreClick = () => {
    this.populateImages();

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  handleImgClick = src => {
    this.setState({ bigImg: src, showModal: true });
  };
  toggleModal = event => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { isLoading, showModal, bigImg } = this.state;
    return (
      <div>
        {showModal && (
          <Modal toggleModal={this.toggleModal}>
            <img src={bigImg} alt="" />
          </Modal>
        )}
        <Searchbar onFormSubmit={this.onFormSubmit} />
        {this.state.images.length > 0 && (
          <>
            <ImageGallery handleImgClick={this.handleImgClick} images={this.state.images} />
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
              <BtnMore onBtn={this.handleMoreClick} />
            )}
          </>
        )}
        {isLoading && this.state.images.length === 0 && (
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
  }
}

export default App;
