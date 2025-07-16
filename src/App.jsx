import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAnime = async () => {
      if (search.trim().length < 2) {
        setAnimeList([]);
        return;
      }

      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(search)}${type ? `&type=${type}` : ''}&limit=25&page=${page}`
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
  }, [search, type, page]);

  const uniqueAnime = animeList.filter(
    (anime, index, self) =>
      index === self.findIndex((a) => a.mal_id === anime.mal_id)
  );

  const sortedAnime = uniqueAnime.sort((a, b) => {
    const s = search.toLowerCase();
    const aTitle = (a.title_english || a.title || '').toLowerCase();
    const bTitle = (b.title_english || b.title || '').toLowerCase();

    return (
      aTitle.indexOf(s) - bTitle.indexOf(s) ||
      aTitle.localeCompare(bTitle)
    );
  });

  const totalEpisodes = sortedAnime.reduce(
    (acc, anime) => acc + (anime.episodes || 0),
    0
  );
  const avgScore =
    sortedAnime.reduce((acc, anime) => acc + (anime.score || 0), 0) /
      sortedAnime.length || 0;

  return (
    <div style={{ minHeight: '100vh', padding: '1rem', background: 'linear-gradient(to right, #dbeafe, #f8fafc)', fontFamily: 'Segoe UI, sans-serif', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem' }}>
        Anime Dashboard
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '200px' }}
          type="text"
          value={search}
          placeholder="Search anime..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All</option>
          <option value="TV">TV</option>
          <option value="Movie">Movie</option>
          <option value="OVA">OVA</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontWeight: '600', fontSize: '18px' }}>
          Summary Stats
        </h2>
        <p>Total anime: {sortedAnime.length}</p>
        <p>Total episodes: {totalEpisodes}</p>
        <p>Average score: {avgScore.toFixed(2)}</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
        {sortedAnime.length > 0 ? (
          sortedAnime.map((anime) => (
            <div
              key={anime.mal_id}
              style={{ background: 'white', borderRadius: '8px', padding: '12px', width: '180px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
            >
              <img
                src={anime.images?.jpg?.image_url}
                alt={anime.title}
                style={{ borderRadius: '6px', width: '100%', height: '240px', objectFit: 'cover', marginBottom: '8px' }}
              />
              <h3 style={{ fontWeight: '600', fontSize: '14px', marginBottom: '6px' }}>
                {anime.title_english || anime.title || anime.title_japanese}
              </h3>
              <p style={{ fontSize: '12px', textAlign: 'left' }}>
                <strong>Episodes:</strong> {anime.episodes ?? 'N/A'}<br />
                <strong>Score:</strong> {anime.score ?? 'N/A'}<br />
                <strong>Type:</strong> {anime.type}
              </p>
            </div>
          ))
        ) : (
          <p style={{ fontStyle: 'italic' }}>No anime found. Try another search term.</p>
        )}
      </div>
    </div>
  );
}

export default App;