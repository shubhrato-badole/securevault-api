import React, { useState , useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import axios from "axios";
import API from "./Api";
import { useNavigate } from "react-router-dom";


function Keeper() {

  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  
useEffect(() => {
    getNotes();
}, [])

async function getNotes() {
  try {
    const result = await API.get("/api/notes");
    setNotes(result.data);

  } catch (err) {
    if (err.response?.status === 401) {
      navigate("/login");
    } else {
      console.log(err);
    }
  }
}

  async function deleteNote(id) {

    try{
      await API.delete(`/api/notes/${id}`);
     setNotes(prev =>
  prev.filter(note => note.id !== id)
);
    } catch(err){
      console.log(err);
    }
    
  }


  async function addnotes(newNotes){
 try{
  const result = await API.post("/api/notes" , {
    title: newNotes.title,
    content: newNotes.content,
  })

  setNotes( prev => [...prev , result.data])
 } catch(err){
  console.log(err)
 }
  }

  return (
    <div>
      <Header />
     
      <CreateArea onAdd={addnotes} />
       <div className="container">
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      </div>
      <Footer />
    </div>
  );
}

export default Keeper;
