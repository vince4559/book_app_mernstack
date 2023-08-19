import axios from "axios";
import { getConfig } from "./config";


export const bookStore = axios.create({
    baseURL: getConfig(),
    withCredentials: true,
    headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' },
})