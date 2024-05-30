export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  console.log("token removed from the local storage");
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  console.log("Token retrieved from the localstorage: ", token);
  return token;
};
