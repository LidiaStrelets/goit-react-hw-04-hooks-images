import axios from 'axios';

// axios.defaults.headers.common['Authorization'] = '7';

const fetchImages = ({ currentQuery, currentPage = '1' }) =>
  axios
    .get(
      `https://pixabay.com/api/?q=${currentQuery}&page=${currentPage}&key=21704664-f3a5361496563a8a6716b3b47&image_type=photo&orientation=horizontal&per_page=12
`,
    )
    .then(({ data }) => data.hits);

const imagesApi = {
  fetchImages,
};

export default imagesApi;
