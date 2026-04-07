import React,{ useState } from "react"
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
     <div className="login-page">
      <Header />
      <div className="login-container">
        <div className="split-card">

          <div className="split-left">
            <h1>Keeper</h1>
            <p className="split-tagline">
              Your notes & todos in one beautiful place.
            </p>
            <div className="split-dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>

          <div className="split-right">
            <h2 className="form-title">Welcome back</h2>
            <p className="form-sub">Sign in to continue</p>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="field">
                <label>Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button className="btn-login" type="submit">
                Login
              </button>
            </form>
            <button
              type="button"
              className="btn-google"
              onClick={handleGoogle}
            >
              <svg viewBox="0 0 48 48" width="16" height="16">
                <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.86l6.09-6.09C34.46 3.05 29.5 1 24 1 14.82 1 7.07 6.48 3.64 14.2l7.08 5.5C12.43 13.48 17.73 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.75H24v9.01h12.42c-.54 2.9-2.18 5.36-4.63 7.01l7.19 5.59C42.93 37.1 46.1 31.3 46.1 24.55z"/>
                <path fill="#FBBC05" d="M10.72 28.3A14.6 14.6 0 0 1 9.5 24c0-1.49.26-2.93.72-4.3l-7.08-5.5A23.94 23.94 0 0 0 0 24c0 3.86.92 7.5 2.56 10.72l8.16-6.42z"/>
                <path fill="#34A853" d="M24 47c5.5 0 10.12-1.82 13.5-4.95l-7.19-5.59c-1.81 1.22-4.13 1.94-6.31 1.94-6.27 0-11.57-3.98-13.28-9.5l-8.16 6.42C7.07 41.52 14.82 47 24 47z"/>
              </svg>
              Continue with Google
            </button>
            <p className="bottom-link">
              No account? <Link to="/register">Register here</Link>
            </p>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login