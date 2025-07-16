function AnimeCard({ anime }) {
  const imageUrl = anime?.images?.jpg?.image_url || "https://placehold.co/250x140?text=No+Image";
  const title = anime?.title || 'Unknown';

  return (
    <div className="anime-card">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p><strong>Episodes:</strong> {anime.episodes ?? 'N/A'}</p>
      <p><strong>Score:</strong> {anime.score ?? 'N/A'}</p>
      <p><strong>Type:</strong> {anime.type ?? 'Unknown'}</p>
    </div>
  );
}

export default AnimeCard;