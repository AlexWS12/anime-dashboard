import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import AnimeDetail from './AnimeDetail';
import './App.css';

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    const fetchAnime = async () => {
      if (search.trim().length < 2) {
        setAnimeList([]);
        return;
      }

      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(search)}${type ? `&type=${type}` : ''}`
        );
        const data = await response.json();
        setAnimeList(data.data || []);
      } catch (error) {
        console.error('Failed to fetch anime:', error);
        setAnimeList([]);
      }
    };

    const delayDebounce = setTimeout(fetchAnime, 300);
    return () => clearTimeout(delayDebounce);
  }, [search, type]);

  const uniqueAnime = animeList.filter(
    (anime, index, self) => index === self.findIndex((a) => a.mal_id === anime.mal_id)
  );

  return (
    <Router>
      <div className="app-container">
        <h1>Anime Dashboard</h1>
        
        <div className="controls">
          <input
            type="text"
            value={search}
            placeholder="Search anime..."
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />
          
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="tv">TV</option>
            <option value="movie">Movie</option>
            <option value="ova">OVA</option>
          </select>
        </div>

        <Routes>
          <Route path="/" element={<Dashboard animeList={uniqueAnime} />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;