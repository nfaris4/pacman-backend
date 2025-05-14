import { getToken, authHeaders } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("No estàs loguejat!");
    window.location.href = "/src/login.html";
    return;
  }

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    alert("Sessió tancada!");
    window.location.href = "/src/login.html";
  });

  // Obtenir estadístiques reals
  fetch("http://localhost:8080/v1/get_user_stats", {
    method: "GET",
    headers: authHeaders(),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "ok") {
        document.getElementById("games-total").textContent = data.total;
        document.getElementById("games-won").textContent = data.guanyades;
        document.getElementById("games-lost").textContent = data.perdudes;
        document.getElementById("points-total").textContent =
          data.mitjana_punts * data.total;
      } else {
        alert("Error carregant estadístiques");
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Error connectant amb el servidor");
    });

  const select = document.getElementById("top-count");
  const table = document.getElementById("ranking-table");

  // Obtenir rànquing real
  fetch("http://localhost:8080/v1/get_top_users")
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "ok") {
        const users = data.jugadors;

        const select = document.getElementById("top-count");
        const table = document.getElementById("ranking-table");

        const renderRanking = (count) => {
          table.innerHTML = `<tr><th>Posició</th><th>Nom</th><th>Punts</th></tr>`;
          users.slice(0, count).forEach((u, i) => {
            table.innerHTML += `<tr><td>${i + 1}</td><td>${
              u.nom_usuari
            }</td><td>${u.punts_totals}</td></tr>`;
          });
        };

        select.addEventListener("change", () =>
          renderRanking(Number(select.value))
        );
        renderRanking(Number(select.value));
      } else {
        alert("No s'ha pogut carregar el rànquing");
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Error connectant amb l’API");
    });
});
