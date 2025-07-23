import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import './App.css';

// Register ChartJS
ChartJS.register(...registerables);

function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [activeChart, setActiveChart] = useState('score');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await response.json();
        setAnime(data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!anime) return <div className="loading">Loading...</div>;

  // Chart Data Config
  const chartData = {
    score: {
      labels: ['Score', 'Remaining'],
      datasets: [{
        label: 'Rating (out of 10)',
        data: [anime.score || 0, 10 - (anime.score || 0)],
        backgroundColor: ['#3B82F6', '#E5E7EB']
      }]
    },
    episodes: {
      labels: ['Episodes'],
      datasets: [{
        data: [anime.episodes || 0],
        backgroundColor: ['#10B981']
      }]
    }
  };

  return (
    <div className="anime-detail-container">
      {/* Back Button */}
      <Link to="/" className="back-button">← Back to List</Link>

      {/* Anime Details Section */}
      <div className="anime-info-section">
        <div className="anime-poster">
          <img 
            src={anime.images?.jpg?.large_image_url || "https://placehold.co/300x450?text=No+Image"} 
            alt={anime.title} 
          />
        </div>
        <div className="anime-meta">
          <h1>{anime.title}</h1>
          <div className="meta-grid">
            <div className="meta-item">
              <span className="meta-label">Type:</span>
              <span className="meta-value">{anime.type || 'Unknown'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Score:</span>
              <span className="meta-value">{anime.score || 'N/A'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Episodes:</span>
              <span className="meta-value">{anime.episodes || 'N/A'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Status:</span>
              <span className="meta-value">{anime.status || 'Unknown'}</span>
            </div>
          </div>
          <div className="synopsis">
            <h3>Synopsis</h3>
            <p>{anime.synopsis || 'No synopsis available.'}</p>
          </div>
        </div>
      </div>

      {/* Charts Dashboard Section */}
      <div className="charts-dashboard">
        <h2>Data Analysis</h2>
        
        {/* Chart Selector */}
        <div className="chart-selector">
          <button 
            className={activeChart === 'score' ? 'active' : ''}
            onClick={() => setActiveChart('score')}
          >
            Score Analysis
          </button>
          <button 
            className={activeChart === 'episodes' ? 'active' : ''}
            onClick={() => setActiveChart('episodes')}
          >
            Episode Analysis
          </button>
        </div>

        {/* Chart Display */}
        <div className="chart-display-area">
          {activeChart === 'score' ? (
            <div className="chart-container">
              <Bar 
                data={chartData.score} 
                options={{
                  responsive: true,
                  scales: { y: { beginAtZero: true, max: 10 } }
                }} 
              />
              <p className="chart-caption">How this anime's score compares to a perfect 10</p>
            </div>
          ) : (
            <div className="chart-container">
              <Pie 
                data={chartData.episodes} 
                options={{ responsive: true }}
              />
              <p className="chart-caption">Episode count visualization</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnimeDetail;