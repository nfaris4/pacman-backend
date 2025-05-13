import sketch from '../game/sketch.js';
import User from '../game/classes/User.js';

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("No estàs loguejat!");
    window.location.href = "/src/login.html";
    return;
  }

  // Crea una instància de User amb les dades de localStorage
  const user = new User(token);
  window.currentUser = user; // opcional: exposar globalment si cal

  // Llança p5
  new p5(sketch, document.getElementById('game-container'));
});
