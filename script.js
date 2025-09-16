const API_KEY = 'a55465cd2cee2fb9362ee4d5f13ba124';
const BASE_URL = 'https://v3.football.api-sports.io';

const LEAGUE_ID = 203;  // Allsvenskan
const SEASON = 2025;    // Ändrat från 2023 till 2025

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
  return data.response[0]; // t.ex. "Regular Season - 5"
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
  const errorDi
