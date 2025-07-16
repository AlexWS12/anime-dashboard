import AnimeCard from './AnimeCard';

function Dashboard({ animeList }) {
  const avgScore = animeList.length
    ? (animeList.reduce((acc, a) => acc + (a.score || 0), 0) / animeList.length).toFixed(2)
    : 'N/A';

  const totalEpisodes = animeList.reduce((sum, a) => sum + (a.episodes || 0), 0);

  return (
    <div>
      <h2>📊 Summary Stats</h2>
      <ul className="stats">
        <li>Total anime: {animeList.length}</li>
        <li>Total episodes: {totalEpisodes}</li>
        <li>Average score: {avgScore}</li>
      </ul>

      {animeList.length === 0 && (
        <p style={{ color: 'gray', fontStyle: 'italic' }}>No anime found. Try another search.</p>
      )}

      <div className="anime-grid">
        {animeList.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
