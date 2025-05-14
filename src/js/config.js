import { getToken, authHeaders } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const token = getToken();
  if (!token) {
    alert('No estàs loguejat!');
    window.location.href = '/src/login.html';
    return;
  }

  const form = document.getElementById('configForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const config = {
      tema: document.getElementById('tema').value,
      musica: document.getElementById('musica').value,
      dificultat: document.getElementById('dificultat').value
    };

    fetch(`${import.meta.env.VITE_API_URL}/v1/config_game`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(config)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          alert('Configuració desada correctament!');
          window.location.href = '/src/dashboard.html';
        } else {
          alert('Error desant configuració.');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error connectant amb l’API');
      });
  });
});
