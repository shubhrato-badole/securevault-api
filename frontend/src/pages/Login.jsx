import React,{ useState } from "react"
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import  "./Login.css"
import API from "./Api";

function Login (){
const [login, setLogin] = useState({
email:"",
password:""
})

const [error, setError] = useState("");

  const navigate = useNavigate();

function handleChange (event){
    const {name , value} = event.target;
    
    setLogin( (prev) => {
        return {
           ...prev,
           [name]:value,
          }
    })
}
 async function handleSubmit(e) {
  e.preventDefault();
  setError("");

  try {
    const result = await API.post("/api/auth/login", login);
    navigate("/keeper");


  } catch (err) {
    if (err.response){
      const errorMessage = err.response?.data?.message;
     setError(err.response.data?.message);
    } else {
      alert ("somthing went wrong")
    }
  }
}

function handleGoogle(){
 window.location.href= "/auth/google";
    

}


    return(
    <div className="Login-page" >
        <Header />
    <div className="Login-container">

        <form className="Login-form" onSubmit={handleSubmit} >

          {error && <p className="error">{error}</p>}

       <h2 className="title">Login</h2>

       <div className="Login-input ">
        <label htmlFor="email" >Email</label>
        <input  onChange={handleChange} type="email" 
         name="email" id="email"
         placeholder="enter your email" required />
       </div>

        <div className="Login-input">
            <label htmlFor="password">password</label>
            <input  onChange={handleChange} 
            type="password"
            name="password" id="password" 
            placeholder="enter your password" required />
        </div>
       
            <button className ="Login-button" type="submit">
        Login
            </button>
        
      

      <button  type="button" className="Login-google google-btn"  onClick={handleGoogle}>  
        <img src="https://www.google.com/favicon.ico" alt="" />  Sign in with Google
      </button>
  </form>
    </div>
     <Footer />
    </div>
    );
}

export default Login;