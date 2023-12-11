import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from '../axios/axios';



const Dashboard = () => {
  const navigate = useNavigate();

    axios.get("admin/isLogined").then(()=>{
      navigate("/users")
    })
    .catch((err)=>{
        console.log(err);
     navigate("/login");
    })
    console.log(window.location.href.split("http://localhost:3001/")[1]);
    if(window.location.href.split("http://localhost:3001/")[1]=="users"){
      
}else if(window.location.href.split("http://localhost:3001/")[1]=="cars"){
  
}else if(window.location.href.split("http://localhost:3001/")[1]=="complaints"){

}
}

export default Dashboard