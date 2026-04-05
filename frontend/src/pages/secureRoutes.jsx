import React, {useState} from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import API from "./Api";
import { useEffect } from "react";



function SecureRoutes({children}){

const [isAuthenticated, setIsAuthenticated] = useState(null);

 useEffect(() => {
  async function checkAuth() {
    try {
      console.log("Checking auth...");
      const res = await API.get("/api/auth/me");

      console.log("AUTH SUCCESS:", res.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.log("AUTH FAILED:", err.response?.status);
      setIsAuthenticated(false);
    }
  }

    checkAuth();
  }, []);


 if (isAuthenticated === null) {
    return (
 <h1>Loading...</h1>

    );
  }

  if (!isAuthenticated) {
  return  <Navigate to="/login" replace />;
}
 
return children;


   }

   export default SecureRoutes;