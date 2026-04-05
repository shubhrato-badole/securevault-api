import React from "react"
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import"./Home.css"



function Home (){

return(
      <div className="app-container">
 <Header /> 
<div className="home-page">
    
    <div className= "home-container">
<h1 className="home-heading"> let get start with keeper </h1>

   <h2 className="home-title">Login</h2>

      <Link to="/login">
      <button className="home-button" >login</button>
      </Link>
        
        <h2 className="home-title">Register</h2>

      <Link to="/register">
      <button className="home-button">register</button>
      </Link>
</div>
     
</div>
 <Footer />
 </div>
);
    
}

export default Home;