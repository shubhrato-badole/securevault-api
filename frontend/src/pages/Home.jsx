import React, {useState}from "react"
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Home.css"
import { useNavigate } from "react-router-dom";
import API from "./Api"

function Home (){
const navigate = useNavigate();

  async function handleCahnge (path){
   
    try{
      const result = await API.get("/api/auth/me")
   if(result === 401){
    navigate("/login")
   }else {
    navigate(path)
   }
  } catch (err){
    console.log(err)

  }

  }
  console.log(handleCahnge)

return(
      <div className="app-container">
 <Header /> 
<div className="home-page">
            <div className= "home-container">
               <div className="badge"><span className="bdot"></span>Your personal workspace</div>
               <h1 className="home-heading"> keep your <span className="yl">notes</span> & <span className="pu">todos</span> in one place </h1>

               <p className="home-sub"> Capture ideas instantly and stay on top of your tasks — simple, fast, and always within reach.
               </p>

               <div className="cards" > 
                <div className="card notes" onClick={ ()=> handleCahnge("/keeper")}>
                    <div className="card-top"></div> 
                <div className="ci">📝</div>
                  <h3>notes</h3>
                  <p>Capture thoughts and ideas worth remembering.</p>
                   <span className="card-btn">Open Notes →</span>
                   </div>
               
                

                
                 <div className="card todo" onClick={ ()=> handleCahnge("/todo")}>
                    <div className="card-top"></div> 
                <div className="ci">✅</div>
                  <h3>todo</h3>
                  <p>Stay focused with a clean, satisfying task list.</p>
                   <span className="card-btn">Open todo →</span>
                   </div>
               </div>
                 
               <div className="extras">
               <span className="tag">✦ Free forever</span>
               <span className="tag">✦ No clutter</span>
              <span className="tag">✦ Always synced</span> 
               </div>

</div>
     
</div>
 <Footer />
 </div>
);
    
}

export default Home;