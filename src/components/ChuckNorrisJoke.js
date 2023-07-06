import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import './ChuckNorrisJokes.css';

Modal.setAppElement('#root');

const ChuckNorrisJokes = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [joke, setJoke] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get('https://api.chucknorris.io/jokes/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchJokeByCategory(category);
  };

  const fetchJokeByCategory = (category) => {
    setIsLoading(true);
    axios
      .get(`https://api.chucknorris.io/jokes/random?category=${category}`)
      .then((response) => {
        setJoke(response.data.value);
        setIsLoading(false);
        openModal();
      })
      .catch((error) => {
        console.error('Error fetching joke by category:', error);
        setIsLoading(false);
      });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleNextJoke = () => {
    fetchJokeByCategory(selectedCategory);
  };

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <div>
      <div className='heading'>
        <h1>Chuck Norris Jokes</h1>
      </div>
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`category ${selectedCategory === category ? 'active' : ''
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Joke Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>{selectedCategory}</h2>
        {isLoading ? (
          <ClipLoader css={override} size={35} color={'#123abc'} loading={isLoading} />
        ) : (
          <>
            <p>{joke}</p>
            <button onClick={handleNextJoke}>Next Joke</button>
            <button onClick={closeModal}>Close</button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ChuckNorrisJokes;
