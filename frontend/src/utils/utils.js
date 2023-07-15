export const apiOptions = {
  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
  // baseUrl: "http://localhost:3000",
  baseUrl: "https://api.akhtool.mesto.nomoredomains.work",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
};
