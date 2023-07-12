export const apiOptions = {
  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
  // baseUrl: "http://localhost:3000",
  baseUrl: "http://api.akhtool.mesto.nomoredomains.work",
  headers: {
    // authorization: "6140e03a-cdf5-4314-8120-d3eda6855951",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
};
