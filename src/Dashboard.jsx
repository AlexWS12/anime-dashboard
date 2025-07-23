import { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import AnimeCard from './AnimeCard';

ChartJS.register(...registerables);

function Dashboard({ animeList }) {
  const [activeChart, setActiveChart] = useState('type');
  const [chartsVisible, setChartsVisible] = useState(true);

  // Calculate stats
  const avgScore = animeList.length
    ? (animeList.reduce((acc, anime) => acc + (anime.score || 0), 0) / animeList.length).toFixed(2)
    : 'N/A';

  const totalEpisodes = animeList.reduce((sum, anime) => sum + (anime.episodes || 0), 0);

  // Chart data
  const chartData = {
    type: {
      labels: ['TV', 'Movie', 'OVA', 'Other'],
      datasets: [{
        data: [
          animeList.filter(a => a.type === 'TV').length,
          animeList.filter(a => a.type === 'Movie').length,
          animeList.filter(a => a.type === 'OVA').length,
          animeList.filter(a => !['TV','Movie','OVA'].includes(a.type)).length
        ],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#64748B']
      }]
    },
    score: {
      labels: ['0-4', '4-6', '6-8', '8-10'],
      datasets: [{
        label: 'Anime Count',
        data: [
          animeList.filter(a => a.score >= 0 && a.score < 4).length,
          animeList.filter(a => a.score >= 4 && a.score < 6).length,
          animeList.filter(a => a.score >= 6 && a.score < 8).length,
          animeList.filter(a => a.score >= 8).length
        ],
        backgroundColor: '#3B82F6'
      }]
    }
  };

  return (
    <div className="dashboard-container">
      <div className="stats-section">
        <h2>📊 Summary Stats</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Anime</h3>
            <p>{animeList.length}</p>
          </div>
          <div className="stat-card">
            <h3>Avg Score</h3>
            <p>{avgScore}</p>
          </div>
          <div className="stat-card">
            <h3>Total Episodes</h3>
            <p>{totalEpisodes}</p>
          </div>
        </div>
      </div>

      <button 
        className="toggle-charts-btn"
        onClick={() => setChartsVisible(!chartsVisible)}
      >
        {chartsVisible ? 'Hide Charts' : 'Show Charts'}
      </button>

      {chartsVisible && (
        <div className="charts-section">
          <div className="chart-selector">
            <button
              className={`chart-btn ${activeChart === 'type' ? 'active' : ''}`}
              onClick={() => setActiveChart('type')}
            >
              Type Distribution
            </button>
            <button
              className={`chart-btn ${activeChart === 'score' ? 'active' : ''}`}
              onClick={() => setActiveChart('score')}
            >
              Score Distribution
            </button>
          </div>

          <div className="chart-container">
            {activeChart === 'type' ? (
              <Pie data={chartData.type} />
            ) : (
              <Bar 
                data={chartData.score} 
                options={{
                  scales: {
                    y: { beginAtZero: true }
                  }
                }}
              />
            )}
          </div>
        </div>
      )}

      <div className="anime-grid">
        {animeList.length === 0 ? (
          <p className="no-results">No anime found. Try another search.</p>
        ) : (
          animeList.map(anime => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;