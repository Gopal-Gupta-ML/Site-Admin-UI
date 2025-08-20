import { apiGet, apiPost } from "./api";
import ENDPOINTS from "../constant/endpoint";


export const login = async (data) => {
 const response =  await apiPost(ENDPOINTS.LOGIN, data);
 return response ;

 
 };


 export const fetchGroups = async()=>{
    const response =  await apiGet(ENDPOINTS.GROUPS);
 return response ;
 }
 export const fetchRoles = async()=>{
    const response =  await apiGet(ENDPOINTS.ROLES);
 return response ;
 }
 export const fetchUsers = async()=>{
    const response =  await apiGet(ENDPOINTS.USERS);
 return response ;
 }

