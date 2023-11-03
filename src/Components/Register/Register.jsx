import React, { useState } from "react";
import noteImg from "../../Assets/images/cathryn-lavery-fMD_Cru6OTk-unsplash.jpg";
import { useFormik } from "formik";
import * as Yup from 'yup'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function Register() {

    const [errorMessage ,setErrorMessage] = useState(null)
    const [isLoading ,setIsLoading] = useState(false)
    const navigate= useNavigate()

 async function handelRegister(values){
   setIsLoading(true)
   let {data}=await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp', values)
   .catch((err) =>  setErrorMessage(err.response.data.msg))

   if(data.msg === "done"){
    setErrorMessage('')
    setIsLoading(false)
    navigate('/login')

   }

  
}


let validationSchema=Yup.object({
    name:Yup.string().required('name is required').min(3,'name min letters is 3').max(10,'name max letters is 10'),
    email:Yup.string().required('email is required').email('email is invalid'),
    password:Yup.string().required('password is required').matches(/^[A-z][a-z0-9]{5,10}$/,'password is invalid'),
    age:Yup.number().required('age is required').min(18,' min age must be 18').max(90,'max age must be 90'),
    phone:Yup.string().required('phone is reqired').matches(/^ 01[0125][0-9]{8}$/,'Invalid Egyption number')
})

let formik= useFormik({
    initialValues:{
        
    name:"",
    email:"",
    password:"",
    age:" ",
    phone:" "
    },
    onSubmit:handelRegister,
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
              <h2 className="text-center main-text mb-3">Create My Account!</h2>

             {errorMessage? <p className="alert alert-danger text-center">{errorMessage}</p> :null}
             
              <form  onSubmit={formik.handleSubmit}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="form-control mb-2"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.name && formik.touched.name ? <p className="alert alert-danger">{formik.errors.name}</p>:null}

                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="form-control mb-2"
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
                  className="form-control mb-2"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

{formik.errors.password && formik.touched.password ? <p className="alert alert-danger">{formik.errors.password}</p>:null}



                <input
                  type="number"
                  name="age"
                  id="age"
                  placeholder="Age"
                  className="form-control mb-2"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />


{formik.errors.age && formik.touched.age ? <p className="alert alert-danger">{formik.errors.age}</p>:null}


                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  className="form-control mb-2"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

{formik.errors.phone && formik.touched.phone ? <p className="alert alert-danger">{formik.errors.phone}</p>:null}


                <button className="btn w-100 text-white main-bg mb-4">Create Account</button>

                <p className="text-center main-text">Already a member?
                    <Link to='/login' className="text-decoration-none ms-2">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
