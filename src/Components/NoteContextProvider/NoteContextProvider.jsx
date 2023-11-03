import axios from 'axios'
import React, { createContext, useState } from 'react'
import Swal from 'sweetalert2'

export let NoteContext = createContext()

export default function NoteContextProvider({children}) {

  const [Notes ,setNotes] = useState(null)

    function showModel(token){

        Swal.fire({
            title: 'Add New Note',
            html:` <input
            type="text"
            name="title"
            id="title"
            placeholder="Add Title"
            class="form-control mb-2"
          />

          <textarea
          
          type="text"
          name="content"
          id="content"
          placeholder="Add Content"
          class="form-control mb-2"
          >
           
          </textarea>
`,
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Add Note',
            showLoaderOnConfirm: true,
            preConfirm: () => {
             const title = document.getElementById('title')?.value
             const content = document.getElementById('content')?.value
             return {title, content}
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
           
            sendDataToAddNote({title:result.value.title ,content:result.value.content ,token })
          })

    }


   async function sendDataToAddNote({title , content , token}){

    let res= await axios.post('https://note-sigma-black.vercel.app/api/v1/notes',{title,content},{
      headers:{
        token
      }
    }).catch((err) => 
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    })
    
    if(res.data.msg === 'done'){

      getAllNotes(token)

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Note has been added',
        showConfirmButton: false,
        timer: 1500
      })

    }

    }


    async function getAllNotes(token){

      try {

        let {data} = await axios.get('https://note-sigma-black.vercel.app/api/v1/notes',
        {
          headers:{
            token
          }
        })
        setNotes(data.notes)
        console.log(data.notes);
        
      } catch (error) {
        console.log(error);
        
      }

     

    }

    function getDeletNoteModel({NoteID ,token}){
     
       
Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {
    deletNote({NoteID ,token})
    getAllNotes(token)
  }
})
      
    }

    async function deletNote({NoteID ,token}){
      let res = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${NoteID}`,{
        headers:{token}
      }).catch((err) => console.log(err))
      console.log(res);
    }


    function showUpdatedNoteModel({prevTitle,prevContent ,NoteID ,token}){

      Swal.fire({
        title: 'Update Note',
        html:` <input
        type="text"
        name="title"
        id="title"
        value=" ${prevTitle}"
        placeholder="Update Title"
        class="form-control mb-2"
      />

      <textarea
      
      type="text"
      name="content"
      id="content"
      placeholder="Update Content"
      class="form-control mb-2"
      >
      ${prevContent}
       
      </textarea>
`,
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Update Note',
        showLoaderOnConfirm: true,
        preConfirm: () => {
         const title = document.getElementById('title')?.value
         const content = document.getElementById('content')?.value
         return {title, content}
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
       
        updateNote({title:result.value.title ,content:result.value.content ,NoteID,token})
        // sendDataToAddNote({title:result.value.title ,content:result.value.content ,token })
      })

      async function updateNote({title, content,NoteID,token}){

        await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${NoteID}`, {
          title, content
        },{
          headers:{token}
        }).catch((err) =>console.log(err))
          
        getAllNotes(token)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your Note has been updated',
          showConfirmButton: false,
          timer: 1500
        })

      }



    }


  return <NoteContext.Provider value={{showModel , Notes, getAllNotes,getDeletNoteModel ,showUpdatedNoteModel}}>
    {children}
  </NoteContext.Provider>
}
