export function getToken() {
  return localStorage.getItem('token');
}

export function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + getToken()
  };
}
