import axios from "axios";
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const PrivateRoute = () => {
    const { isAuthenticated, token } = useSelector((state) => state.user);

    useEffect(()=> {
      if(isAuthenticated && token){
        axios.interceptors.request.use(
          async (config) => {    
            // const auth = localStorage.getItem("auth")
            if(token){
              config.baseURL = process.env.REACT_APP_BACKEND_DOMAIN;
              config.headers.common["Authorization"] = `Bearer ${token}`;
            }    
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
      }else{
        axios.interceptors.request.use(
          async (config) => {    
            config.baseURL = process.env.REACT_APP_BACKEND_DOMAIN;   
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
      }
    },[isAuthenticated, token])

  return (
    isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
  )
}
