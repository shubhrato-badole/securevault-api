import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"
import { useNavigate } from "react-router-dom";
import API from "../pages/Api";

function Header() {
const navigate = useNavigate();
async function handleClick(){
  try{
    const res = await API.post("/api/auth/logout")
    navigate("/")
  } catch (err){
    console.log(err);
  }

}

  return (
    <header>
      <h1>Keeper</h1>
      <nav className="nav-Links">
        <Link className="nav-links" to="/">Home</Link>
        <Link className="nav-links" to="/keeper">Notes</Link>
        <Link className="nav-links" to="/todo">Todo</Link>
        <button onClick={handleClick} className="logout-btn" >Logout</button>
      </nav>
    </header>
  );
}

export default Header;
