import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TbFidgetSpinner } from 'react-icons/tb';
import { FaEye,FaEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthProvider';
const img_hosting_token = "d3353ef1c772b719128d8b9004b1d8c2";
const SignUp = () => {
  const {
    loading,
    setLoading,
    verifyEmail,
    userDetails,
    setuserDetails,
    createUser,
    updateUserProfile,
    updateUserProfile1,
    DeleteUser
  } = useContext(AuthContext)


    const navigate = useNavigate()
      const location = useLocation()
      const from = location.state?.from?.pathname || '/'
      const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = ()=>{
        setShowPassword(!showPassword)
    }
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const handleSubmit = event => {
        event.preventDefault()
        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        const nationalid = event.target.nationalid.value 
        const phonenumber = event.target.phone.value 
        if(name.length<1){
          toast.error('Name Must be Required')
          return
        }
       
        if(password.length<8){
          toast.error('Password Must be 8 Character')
          return
        }

        const image = event.target.image.files[0]
        const formData = new FormData()
        formData.append('image', image)
          fetch(img_hosting_url, {
            method: 'POST',
            body: formData
          })
          .then(res=> res.json())
          .then(imageData=>{
            const imageUrl = imageData.data.display_url
            createUser(email,password)
            .then(result=>{
              const user = result.user
              console.log('Create Successfully')
              updateUserProfile(user,name,imageUrl,phonenumber)
              .then(()=>{
                const userData ={
                  Name : name,
                  Image : imageUrl,
                  Phonenumber : phonenumber,
                  Nationalid : nationalid,
                  Email : email,
                  Password : password,
                  Role: 'user',
                  Approved : 'pending'}

                console.log('Updated Successfully')
                fetch('http://localhost:5000/user',{
                  method: 'POST',
                  headers:{
                    'content-type': 'application/json'
                  },
                  body: JSON.stringify(userData)
                })
                .then(res=> res.json())
                .then(result=>{
                  console.log(result)
                  if(result.message){
                    toast.error(result.message)
                    DeleteUser()
                  }
                  if(result.insertedId){
                    setuserDetails([result])
                    navigate(from, { replace: true })
                  }
                })
                
                
                
                
              })
              .catch(err => {
                setLoading(false)
                toast.error(err.message)
              })
            })
            .catch(err => {
              setLoading(false)
              toast.error(err.message)
            })
          })
          .catch(err => {
            setLoading(false)
            toast.error(err.message)
          })
        const userData ={name:name,email:email,image:imageUrl,nationalId:nationalid,phone:phonenumber,approved:'pending'}
        console.log(userData)
    }
    return (
        <div className='flex justify-center items-center mt-[5%] min-h-screen font-NovaSquare'>
          <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
            <div className='mb-8 text-center'>
              <h1 className='my-3 text-4xl font-bold'>Register</h1>
              <p className='text-sm text-gray-400'>Welcome to Somiti</p>
            </div>
            <form
              onSubmit={handleSubmit}
              noValidate=''
              action=''
              className='space-y-6 ng-untouched ng-pristine ng-valid'
            >
              <div className='space-y-4'>
                <div>
                  <label htmlFor='email' className='block mb-2 text-sm'>
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Enter Your Name Here'
                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                    data-temp-mail-org='0'
                  />
                </div>
                <div>
                  <label htmlFor='image' className='block mb-2 text-sm'>
                     Photo
                  </label>
                  <input
                    type='file'
                    id='image'
                    name='image'
                    accept='image/*'
                    required
                  />
                </div>
                <div>
                  <label htmlFor='email' className='block mb-2 text-sm'>
                    Email address
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    required
                    placeholder='Enter Your Email Here'
                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                    data-temp-mail-org='0'
                  />
                </div>
                <div>
                  <label htmlFor='nationalid' className='block mb-2 text-sm'>
                    National ID
                  </label>
                  <input
                    type='text'
                    name='nationalid'
                    id='nationalid'
                    required
                    placeholder='Enter Your National ID Here'
                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                    data-temp-mail-org='0'
                  />
                </div>
                <div>
                  <label htmlFor='phone' className='block mb-2 text-sm'>
                    Phone Number
                  </label>
                  <input
                    type='text'
                    name='phone'
                    id='phone'
                    required
                    placeholder='Enter Your Phone Number Here'
                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                    data-temp-mail-org='0'
                  />
                </div>
                <div>
                  <div className='flex justify-between'>
                    <label htmlFor='password' className='text-sm mb-2'>
                      Password
                    </label>
                  </div>
                  <div className='flex'>
               <input
                    name='password'
                    id='password'
                    required
                    placeholder='*******'
                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900' type={showPassword ? 'text' : 'password'}   />
               <span className='relative right-10 top-3 text-rose-500 text-2xl' onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}</span>
               </div>
        
                </div>
              </div>
    
              <div>
                <button
                  type='submit'
                  className='bg-rose-500 w-full rounded-md py-3 text-white'
                >
                Register
                  {/* {loading ? (
                    <TbFidgetSpinner className='m-auto animate-spin' size={24} />
                  ) : (
                    'Continue'
                  )} */}
                </button>
              </div>
            </form>
            
            <p className='px-6 text-sm text-center text-gray-400'>
              Already have an account?{' '}
              <Link
                to='/login'
                className='hover:underline hover:text-rose-500 text-gray-600'
              >
                Login
              </Link>
              .
            </p>
          </div>
        </div>
    );
};

export default SignUp;