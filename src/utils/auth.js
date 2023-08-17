const my_token = "HR_TOKEN";


export function setToken(token) {
  localStorage.setItem(my_token, token);
}

export function getToken() {
  return localStorage.getItem(my_token);
}

export function removeToken() {
  return localStorage.removeItem(my_token);
}
