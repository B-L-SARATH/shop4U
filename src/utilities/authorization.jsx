export const saveLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const removeLocalStorage = () => {
  localStorage.clear();
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};

export const logout = () => {
  removeLocalStorage();
  setTimeout(() => {
    window.location.href = "/signin";
  }, 500);
};
