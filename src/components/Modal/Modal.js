import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';
import { createPortal } from 'react-dom';

const Modal = ({ toggleModal, children }) => {
  const modalRoot = useRef(document.querySelector('#modal-root'));

  const handleEscape = useCallback(
    event => {
      if (event.code === 'Escape') {
        toggleModal();
      }
    },
    [toggleModal],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);

  const handleBackdrop = event => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdrop}>
      <div className={styles.content}>{children}</div>
    </div>,
    modalRoot.current,
  );
};
Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default Modal;
