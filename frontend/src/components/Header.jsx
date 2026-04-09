import React ,{useEffect ,useState} from "react";
import { Link } from "react-router-dom";
import "./Header.css"
import { useNavigate } from "react-router-dom";
import API from "../pages/Api";
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HowToRegTwoToneIcon from '@mui/icons-material/HowToRegTwoTone';

function Header() {
const navigate = useNavigate();

const [isAuthenticated , setisAuthenticated]=useState(null)

 useEffect (() => {
    async function checkAuth() {
      try {
        await API.get("/api/auth/me"); // cookie sent automatically
        setisAuthenticated(true);
      } catch (err) {
        setisAuthenticated(false);
      }
    }

  checkAuth(); } ,

    [] ) ;

async function handleClick(){
  try{
    const res = await API.post("/api/auth/logout")
    setisAuthenticated(false);
    navigate("/")
  } catch (err){
    console.log(err);
  }

}

    
return (
    <header>
      <h1>Keeper</h1>

      <nav className="nav-Links">
        <Link className="nav-links" to="/"> Home</Link>

     { isAuthenticated ? (    <>

        <Link className="nav-links" to="/keeper">Notes</Link>
        <Link className="nav-links" to="/todo">Todo</Link>
        <button onClick={handleClick} className="logout-btn"> Logout</button>
         
        </>
    ) : (
         <>
       
        <Link className="nav-links" to="/login">Login </Link>
        <Link className="nav-links" to="/register">register</Link>
        </>
 ) }
      </nav>
    </header>
  );
}

export default Header;
