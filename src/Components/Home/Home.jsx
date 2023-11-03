import React, { useContext, useEffect } from "react";
import { NoteContext } from "../NoteContextProvider/NoteContextProvider";
import { AuthContext } from "../AuthContext/AuthContextProvider";

export default function Home() {

  let { Notes, getAllNotes,getDeletNoteModel ,showUpdatedNoteModel } = useContext(NoteContext);
  const {token} =useContext(AuthContext)
 

  useEffect(()=>{
    getAllNotes(token)
  },[])
  return (
    <>
    <div className="container my-5">
      <div className="row g-5 ">

      {Notes?.map((note) => (
        <div key={note._id} className="col-md-4">
          <div className="card ">
            <div className="card-body">
              <h5 className="card-title text-center ">{note.title}</h5>
              <p className="card-text">{note.content}</p>
              <div className="card-footer ">

           <span onClick={()=> showUpdatedNoteModel({prevTitle:note.title,prevContent:note.content ,NoteID:note._id ,token})}>
           <i className="fa-solid fa-pen-to-square me-2  main-text" style={{cursor:"pointer"}}></i>
           </span>

              <span onClick={()=> getDeletNoteModel({NoteID:note._id ,token})}>
                
              <i className="fa-solid fa-trash main-text" style={{cursor:"pointer"}} ></i>
              </span>

              </div>

      
            </div>
          </div>
        </div>
      ))}

      </div>
    </div>
    
    </>
  );
}
