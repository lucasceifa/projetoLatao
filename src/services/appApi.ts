import axios from 'axios'

export const urlLocal = 'http://127.0.0.1:5173'
export const urlApi = 'https://rpgceifador.azurewebsites.net/'
// export const urlApi = 'https://localhost:7159'

export const appApi = axios.create({
  baseURL: urlApi
})
