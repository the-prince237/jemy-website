import axios from "axios";

const client = axios.create({
  baseURL: 'https://real-pink-armadillo-hat.cyclic.cloud',
  timeout: 20 * 60 * 1000,
  headers: {'X-Custom-Header': 'foobar'}
})

export const  getProducts = async (searchKey: string) => client.get(`/shein/products?product=${searchKey}`)