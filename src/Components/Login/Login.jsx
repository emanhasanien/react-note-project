import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import noteImg from "../../Assets/images/cathryn-lavery-fMD_Cru6OTk-unsplash.jpg";
import * as Yup from 'yup'
import AuthContextProvider, { AuthContext } from '../AuthContext/AuthContextProvider';
export default function Login() {


  
  const [errorMessage ,setErrorMessage] = useState(null)
  const [isLoading ,setIsLoading] = useState(false)
  const navigate= useNavigate()

  const { setToken } = useContext(AuthContext)

async function handelLogin(values){
 setIsLoading(true)
 let {data}=await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn', values)
 .catch((err) =>  setErrorMessage(err.response.data.msg))

 if(data.msg === "done"){
  setErrorMessage('')
  setIsLoading(false)
  setToken(`3b8ny__${data.token}`)
  localStorage.setItem('token',`3b8ny__${data.token}`)
  navigate('/')
  console.log(data);

 }


}


let validationSchema=Yup.object({

  email:Yup.string().required('email is required').email('email is invalid'),
  password:Yup.string().required('password is required').matches(/^[A-z][a-z0-9]{5,10}$/,'password is invalid'),

})

let formik= useFormik({
  initialValues:{
    
  email:"",
  password:"",
  
  },
  onSubmit:handelLogin,
  validationSchema
})

  return (
    <>
      

      <div className="container pt-5 mt-5">
        <div className="row ">
          <div className="col-md-6">
            <img className=" noteImage w-100 rounded-2" src={noteImg} alt="" />
          </div>
          <div className="col-md-6 p-3 bg-white rounded-2">
            <div>
              <h2 className="text-center main-text mb-5">Create My Account!</h2>

             {errorMessage? <p className="alert alert-danger text-center">{errorMessage}</p> :null}
             
              <form  onSubmit={formik.handleSubmit}>
          

                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="form-control mb-3"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

{formik.errors.email && formik.touched.email ? <p className="alert alert-danger">{formik.errors.email}</p>:null}

                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="form-control mb-3"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

{formik.errors.password && formik.touched.password ? <p className="alert alert-danger">{formik.errors.password}</p>:null}

              {isLoading ? <p><i className='fas fa-spinner fa-spin main-text mx-auto'></i></p>
              
              :  <button className="btn w-100 text-white main-bg mb-4">Login</button>
              
              }
               
               <p className="text-center main-text">Not A member?
                    <Link to='/register' className="text-decoration-none ms-2">Create Account</Link>
                </p>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
