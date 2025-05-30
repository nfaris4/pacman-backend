import { enviarPartida } from "../../js/utils/enviarPartida.js";
export default class User {
  #name;
  #surname;
  #email;
  #birthdate;
  #stats;
  #settings;

  constructor({ name, surname, email, birthdate, password }) {
    this.#name = name;
    this.#surname = surname;
    this.#email = email;
    this.#birthdate = birthdate;

    // Dades inventades per ara
    this.#stats = {
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      points: 0,
    };

    this.#settings = {
      theme: "dark",
      difficulty: "normal",
      music: true,
    };
  }

  getName() {
    return this.#name;
  }

  getFullName() {
    return `${this.#name} ${this.#surname}`;
  }

  getStats() {
    return this.#stats;
  }

  updateStats({ win = false, points = 0 }) {
    this.#stats.gamesPlayed++;
    this.#stats.points += points;
    if (win) this.#stats.gamesWon++;
    else this.#stats.gamesLost++;
  }

  getSettings() {
    return this.#settings;
  }

  setDifficulty(level) {
    this.#settings.difficulty = level;
  }

  toggleMusic(on) {
    this.#settings.music = on;
  }
  finalDePartida(punts, guanyat) {
    const durada = 60;
    console.log(`[📤] Enviant partida | punts: ${punts}, guanyat: ${guanyat}`);

    enviarPartida(punts, durada, guanyat);

    setTimeout(() => {
      alert(guanyat ? "Has guanyat! 🎉" : "Has perdut 😢");
      alert("Enviant partida...");
      window.location.href = "/src/dashboard.html";
    }, 1000);
  }
}
