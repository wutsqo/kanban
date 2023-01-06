import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN

if (!BASE_URL) throw new Error("No base url provided")
if (!AUTH_TOKEN) throw new Error("No auth token provided")

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: AUTH_TOKEN,
  },
})

export default instance
