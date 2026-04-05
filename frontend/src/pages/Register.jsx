import React, {useState}from "react"
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./Register.css"
import API from "./Api";

function Register(){
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    const result = await API.post("/api/auth/register", user);
    alert("Successfully Registered");
    navigate("/login");

  } catch (err) {
    if (err.response){
      const errorMessage = err.response.data?.message;
      alert(errorMessage)
    } else {
      alert ("somthing went wrong")
    }

 
  }
}

  function handleGoogle() {
    window.location.href = "/auth/google";
  }


    return(
<div className="register-page">

<Header />

<div className="register-container" >
<form className="register-form" onSubmit={handleSubmit} >
  <h2 className="register-title">Register</h2>
    <div className="register-input">
            <label htmlFor="email">Email</label> 
            <input  onChange={handleChange}type="email" 
            id="email" name="email" placeholder="entere name" required />
    </div>
    <div className="register-input">
           <label htmlFor="password">Password</label>
            <input 
            onChange={handleChange} type="password" name="password" 
            placeholder="entere password" required />
            
    </div>
  
           <button className="register-button" type="submit">register</button>
 


      <button className="register-google"  onClick={handleGoogle}>
      Sign in with Google
      </button>
      </form>
</div>
<Footer />


    </div>
    );
}


export default  Register;