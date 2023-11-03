import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContextProvider";
import { NoteContext } from "../NoteContextProvider/NoteContextProvider";

export default function Navbar() {
  const { token , setToken}=useContext(AuthContext)
  const navigate =useNavigate()
  const {showModel} =useContext(NoteContext)


  function logout(){
         
    localStorage.removeItem('token')
    setToken(null)
    navigate('/login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand fw-bolder" to={"/"}>
            <i class="fa-solid fa-clipboard fs-3 me-2 main-text"></i>
            My Notes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <li className="nav-item">
               <span className="fs-5 main-text mx-2" style={{cursor:"pointer"}}><i class="fa-solid fa-magnifying-glass"></i>
                Search
               </span>
              </li>


              <li className="nav-item">
               <button className="btn main-bg text-white" onClick={ ()=> showModel(token)}>
               <i class="fa-solid fa-plus"></i>
                Add New Note</button>
              </li>


              <li className="nav-item">
                
                <span className="nav-link fs-5" style={{cursor:"pointer"}} onClick={logout}>
                  
                  Logout</span>
              </li>


            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
