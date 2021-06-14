import axios from 'axios'

const url = "http://localhost:5000"

export const fetchCategories = (cat) => axios.get(`${url}/template9/categories/${cat}`)
export const fetchContents = (cat, subcat) => axios.get(`${url}/template9/contents/${cat}/${subcat}`)