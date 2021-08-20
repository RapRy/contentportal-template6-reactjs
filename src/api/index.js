import axios from "axios";

// const url = "http://localhost:5000";
// const url = "https://port-template-1.herokuapp.com"
const url = "https://downloadstoreportal.herokuapp.com";

export const fetchCategories = () => axios.get(`${url}/categories`);
export const fetchContents = (cat) =>
  axios.get(`${url}/contents/${cat}?group=sub`);
export const fetchContentsSubcat = (cat, sub) =>
  axios.get(`${url}/contents/${cat}/${sub}`);
