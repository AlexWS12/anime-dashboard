import { Link } from 'react-router-dom';

function AnimeCard({ anime }) {
  return (
    <Link to={`/anime/${anime.mal_id}`} className="anime-card-link">
      <div className="anime-card">
        <img 
          src={anime.images?.jpg?.image_url || "https://placehold.co/250x140?text=No+Image"} 
          alt={anime.title} 
        />
        <h3>{anime.title || 'Unknown'}</h3>
        <p><strong>Score:</strong> {anime.score || 'N/A'}</p>
        <p><strong>Type:</strong> {anime.type || 'Unknown'}</p>
      </div>
    </Link>
  );
}

export default AnimeCard;