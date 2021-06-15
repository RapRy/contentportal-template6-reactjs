import axios from 'axios'

const url = "https://port-template-1.herokuapp.com"

export const fetchCategories = (cat) => axios.get(`${url}/template9/categories/${cat}`)
export const fetchContents = (cat, subcat) => axios.get(`${url}/template9/contents/${cat}/${subcat}`)