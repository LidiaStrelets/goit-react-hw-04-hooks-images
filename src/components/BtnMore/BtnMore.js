import React from 'react';
import PropTypes from 'prop-types';

const BtnMore = ({ onBtn }) => (
  <button className="Button" type="button" onClick={onBtn}>
    Load more
  </button>
);

BtnMore.propTypes = {
  onBtn: PropTypes.func.isRequired,
};

export default BtnMore;
