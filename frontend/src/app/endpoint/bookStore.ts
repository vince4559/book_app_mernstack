import axios from "axios";
import { getConfig } from "./config";


export const bookStore = axios.create({
    baseURL: getConfig(),
    withCredentials: true,
}) 