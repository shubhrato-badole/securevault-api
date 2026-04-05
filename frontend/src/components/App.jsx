import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ToDoList from "../pages/ToDoList";
import Keeper from "../pages/Keeper";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SecureRoutes from "../pages/secureRoutes"; 



function App(){
  return (
  <Router>
     <Routes>
 <Route path="/" element={<Home />} />
 
 <Route path="/login" element={ <Login />}/>
<Route path="/register" element={ <Register />}/>
<Route path="/todo" element= { <SecureRoutes> <ToDoList /> </SecureRoutes>}/>
<Route path="/keeper" element={ <SecureRoutes> <Keeper /> </SecureRoutes>}/>


     </Routes>
  </Router>
  )
}

export default App;