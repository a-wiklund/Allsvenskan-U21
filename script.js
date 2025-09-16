const API_KEY = 'a55465cd2cee2fb9362ee4d5f13ba124';
const BASE_URL = 'https://v3.football.api-sports.io';

const LEAGUE_ID = 203;  // Allsvenskan
const SEASON = 2023;

function calculateAge(birthdate) {
  const bd = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - bd.getFullYear();
  const m = today.getMonth() - bd.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < bd.getDate())) {
    age--;
  }
  return age;
}

async function fetchLatestRound() {
  const res = await fetch(`${BASE_URL}/fixtures/rounds?league=${LEAGUE_ID}&season=${SEASON}&current=true`, {
    headers: { 'x-apisports-key': API_KEY }
  });
  const data = await res.json();
  return data.response[0]; // t.ex. "Regular Season - 25"
}

async function fetchFixtures(round) {
  const res = await fetch(`${BASE_URL}/fixtures?league=${LEAGUE_ID}&season=${SEASON}&round=${encodeURIComponent(round)}`, {
    headers: { 'x-apisports-key': API_KEY }
  });
  const data = await res.json();
  return data.response;
}

async function fetchPlayers(fixtureId) {
  const res = await fetch(`${BASE_URL}/fixtures/players?fixture=${fixtureId}`, {
    headers: { 'x-apisports-key': API_KEY }
  });
  const data = await res.json();
  return data.response;
}

async function loadPlayers() {
  const loading = document.getElementById('loading');
  const errorDiv = document.getElementById('error');
  const container = document.getElementById('players');
  container.innerHTML = '';
  errorDiv.classList.add('hidden');
  loading.style.display = 'block';

  try {
    const round = await fetchLatestRound();
    const fixtures = await fetchFixtures(round);
    let allPlayers = [];

    for (const fixture of fixtures) {
      const playerData = await fetchPlayers(fixture.fixture.id);
      for (const team of playerData) {
        for (const playerStat of team.players) {
          const player = playerStat.player;
          const stats = playerStat.statistics[0];
          const age = calculateAge(player.birth.date);
          if (age < 21 && stats.games.minutes > 0) {
            allPlayers.push({
              name: player.name,
              team: team.team.name,
              minutes: stats.games.minutes,
              age
            });
          }
        }
      }
    }

    loading.style.display = 'none';

    if (allPlayers.length === 0) {
      container.innerHTML = '<p>Inga spelare under 21 med speltid hittades.</p>';
      return;
    }

    allPlayers.forEach(p => {
      const div = document.createElement('div');
      div.className = 'player-card';
      div.innerHTML = `
        <div class="player-name">${p.name}</div>
        <div class="player-details">
          <strong>Ålder:</strong> ${p.age} år<br />
          <strong>Lag:</strong> ${p.team}<br />
          <strong>Speltid:</strong> ${p.minutes} minuter
        </div>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    loading.style.display = 'none';
    errorDiv.textContent = 'Fel vid hämtning av data. Kontrollera API-nyckeln och din internetanslutning.';
    errorDiv.classList.remove('hidden');
    console.error(err);
  }
}

loadPlayers();
