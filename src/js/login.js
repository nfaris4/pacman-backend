document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:8080/v1/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nom_usuari: username,
      password_usuari: password
    })
  });

  const json = await res.json();

  if (json.token) {
    localStorage.setItem('token', json.token);
    alert(`Benvingut, ${username}`);
    window.location.href = "/src/config.html";
  } else {
    alert("Credencials incorrectes.");
  }
});
