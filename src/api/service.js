import { apiGet, apiPost, apiPut , apiDelete } from "./api";
import ENDPOINTS from "../constant/endpoint";


export const login = async (data) => {
   await apiPost(ENDPOINTS.LOGIN, data);
 };

