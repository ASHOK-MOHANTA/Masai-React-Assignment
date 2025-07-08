import React, { useEffect, useState, useRef } from 'react';
import './App.css'; // Optional: For styling

const App = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [paginatedCharacters, setPaginatedCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const currentPageRef = useRef(1); // current page stored in ref
  const itemsPerPage = 10;

  // Fetch all characters (multiple pages from the API)
  useEffect(() => {
    const fetchAllCharacters = async () => {
      let characters = [];
      let nextUrl = 'https://rickandmortyapi.com/api/character';

      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        characters = [...characters, ...data.results];
        nextUrl = data.info.next;
      }

      setAllCharacters(characters);
      setTotalPages(Math.ceil(characters.length / itemsPerPage));
    };

    fetchAllCharacters();
  }, []);

  // Update paginated characters when page or data changes
  useEffect(() => {
    const startIndex = (currentPageRef.current - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedCharacters(allCharacters.slice(startIndex, endIndex));
  }, [allCharacters]);

  const handlePageChange = (page) => {
    currentPageRef.current = page;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedCharacters(allCharacters.slice(startIndex, endIndex));
  };

  return (
    <div className="container">
      <h1>Rick and Morty Characters</h1>
      <div className="grid">
        {paginatedCharacters.map((character) => (
          <div key={character.id} className="card">
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <p>{character.species} - {character.status}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                backgroundColor: currentPageRef.current === page ? '#61dafb' : '#f0f0f0',
                margin: '5px',
              }}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default App;
