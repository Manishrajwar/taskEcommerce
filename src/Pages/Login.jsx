import { useState } from "react";
import { login } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Login(){

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [formData , setFormData] = useState({
        username:"",
        password:""
    })

    const changeHandler =  (e)=>{
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
          }))
     }

     const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(formData , navigate))
      }

    return (
        
   <div className="w-full min-h-[100vh] bg-[#111827] flex flex-col justify-center gap-10 ">

<h2 className="text-white font-[600] text-[24px] text-center ">Login Form</h2>
   
<form onSubmit={submitHandler} class="max-w-md loginForm mx-auto w-full flex flex-col gap-4 ">
  <div class="relative z-0 w-full mb-5 overflow-hidden  group">
      <input type="text" name="username" value={formData.username} onChange={changeHandler} id="username" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="username" class="peer-focus:font-medium absolute h-[100px] overflow-hidden text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">UserName*</label>
  </div>

  <div class="relative z-0 w-full mb-5 group overflow-hidden">
      <input type="password" name="password" id="password" onChange={changeHandler}  value={formData.password} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
      <label for="password" class="peer-focus:font-medium absolute text-sm h-[100px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
</div>
    )
}

export default Login;