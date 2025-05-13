import sketch from '../game/sketch.js';
import User from '../game/classes/User.js';

document.addEventListener('DOMContentLoaded', () => {
  const userData = JSON.parse(localStorage.getItem('loggedUser'));
  if (!userData) {
    alert('Has d’iniciar sessió per jugar.');
    window.location.href = '/src/login.html';
    return;
  }

  // Crea una instància de User amb les dades de localStorage
  const user = new User(userData);
  window.currentUser = user; // opcional: exposar globalment si cal

  // Llança p5
  new p5(sketch, document.getElementById('game-container'));
});
