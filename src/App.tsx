import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [firstLoadComplete, setFirstLoadComplete] = useState(false);

  useEffect(() => {
    fetchDogImage();
  }, []);

  useEffect(() => {
    if (imageUrl) {
      localStorage.setItem('lastDogImageUrl', imageUrl);

      const breed = imageUrl.split('/')[4];
      alert(`${breed}`);
    }
  }, [imageUrl]);

  const fetchDogImage = () => {
    setIsLoading(true);
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.message);
        setIsLoading(false);
        if (!firstLoadComplete) {
          setFirstLoadComplete(true);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar imagem de doguinho:', error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h1>Doguinhos</h1>
      {firstLoadComplete && !isLoading ? (
        <>
          <img src={ imageUrl } alt="Doguinho aleatório" />
          <br />
          <button onClick={ fetchDogImage }>Novo doguinho!</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
