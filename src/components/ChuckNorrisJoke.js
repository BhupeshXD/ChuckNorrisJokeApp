import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './ChuckNorrisJokes.css';

Modal.setAppElement('#root');

const ChuckNorrisJokes = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [joke, setJoke] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    axios
      .get(`https://api.chucknorris.io/jokes/random?category=${category}`)
      .then((response) => {
        setJoke(response.data.value);
        openModal();
      })
      .catch((error) => {
        console.error('Error fetching joke by category:', error);
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

  return (
    <div>
    
      <h1>Chuck Norris Jokes</h1>
   
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`category ${
              selectedCategory === category ? 'active' : ''
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
        <p>{joke}</p>
        <button onClick={handleNextJoke}>Next Joke</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default ChuckNorrisJokes;
