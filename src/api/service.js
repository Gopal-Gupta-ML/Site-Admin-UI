import { apiGet, apiPost, apiPut , apiDelete } from "./api";
import ENDPOINTS from "../constant/endpoint";


export const login = async (data) => {
 const response =  await apiPost(ENDPOINTS.LOGIN, data);
 return response ;

 
 };

