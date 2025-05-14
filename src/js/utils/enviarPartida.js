import { getToken } from '../utils.js';

export function enviarPartida(punts, durada, guanyat) {
  const partida = {
    data: new Date().toISOString(),
    punts,
    durada,
    guanyat
  };

  return fetch("http://localhost:8080/v1/add_game", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(partida)
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "ok") {
        console.log("Partida enviada correctament");
      } else {
        console.error("Error de l'API:", data);
      }
    })
    .catch((err) => {
      console.error("Error enviant la partida:", err);
    });
}
