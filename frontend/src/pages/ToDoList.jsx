import React, { useState } from "react";
import ToDoItem from "../components/ToDoItem";
import Header from "../components/Header";
import Footer from "../components/Footer";
import List from "../components/List";
import "./ToDolist.css"
import API from "./Api";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function ToDoList() {
 const Navigate = useNavigate();
 const [list, setList] = useState([]);


 useEffect(()=>{
  fetchList();
 })

async function fetchList() {
  try {
  const result = await API.get(`/api/todo/`);
setList(result.data);

  
}
 catch (err) {
  if (err.response?.status === 401) {
    window.location.href = "/login"; // 🔥 FORCE LOGOUT
  } else {
  console.log(err);
} 
}
}

  async function addItem(newItem) {

    const result = await API.post("/api/todo", {
     item : newItem,
    })
    setList(prev => [...prev, result.data]);
  }



  async function deleteItem(id) {
    await API.delete(`/api/todo/${id}`);
    setList(prev => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="todo-page">
      <Header />
      <div className="todo-container">
        <div className="todo-card">

          <h1 className="todo-title">My Task</h1>
      <ToDoItem  additem={addItem} />

      <div className="todo-list">
      {list.map((item) => (
        <List
          key={item.id}
          id={item.id}
          list={item.item}
          delete={deleteItem}
        />
      ))}
      </div>
      </div>
</div>
      <Footer />
    </div>
  );
}

export default ToDoList;