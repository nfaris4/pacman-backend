document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const nom = document.getElementById("name").value;
    const cognoms = document.getElementById("surname").value;
    const mail = document.getElementById("email").value;
    const birthdate = document.getElementById("birthdate").value;
    const password = document.getElementById("password").value;

    // Calcular edat a partir de la data de naixement
    const today = new Date();
    const birth = new Date(birthdate);
    const edat = today.getFullYear() - birth.getFullYear();

    const newUser = {
      nom_usuari: nom.toLowerCase(),
      password_usuari: password,
      mail: mail,
      edat: edat,
      pais: "Catalunya",
    };

    const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/create_user `, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const json = await res.json();

    if (json.status === "ok") {
      alert("Usuari registrat correctament!");
      window.location.href = "/src/login.html";
    } else {
      alert("Error: " + (json.message || "no s'ha pogut registrar"));
    }
  });
