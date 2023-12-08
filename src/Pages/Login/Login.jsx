import React, { useContext, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TbFidgetSpinner } from 'react-icons/tb'
import { AuthContext } from '../../Provider/AuthProvider';
import useUser from '../../hooks/useUser/useUser';
import toast from 'react-hot-toast';

const Login = () => {
    const emailRef = useRef()
    const { loading,setuserDetails, setLoading, signIn, resetPassword } =
    useContext(AuthContext)
    const [isUser,refetch,] = useUser()
    const location = useLocation()
    const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'
  // Handle submit
  const handleSubmit = event => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    signIn(email,password)
    .then(result=>{
      refetch()
      if(isUser){
        fetch(`http://localhost:5000/user/${email}`)
                .then(res=> res.json())
                .then(result=>{
                  setuserDetails(result)
      })
        toast.success('Login Successfully')
          navigate(from, { replace: true })
      }
    })
    .catch(err => {
      setLoading(false)
      toast.error((err.message.split('/')[1]).slice(0,length-2))
    })
  }

  //   handle password reset
  const handleReset = () => {
    const email = emailRef.current.value

    resetPassword(email)
      .then(() => {
        toast.success('Please check your email for reset link')
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        toast.error(err.message)
      })
  }


    return (
        <div className='flex justify-center font-NovaSquare mt-[5%] items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
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
                Email address
              </label>
              <input
                ref={emailRef}
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
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <TbFidgetSpinner className='m-auto animate-spin' size={24} />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button
            onClick={handleReset}
            className='text-xs hover:underline hover:text-rose-500 text-gray-400'
          >
            Forgot password?
          </button>
        </div>
        <p className='px-6 text-sm text-center space-y-3 text-gray-400'>
          Don't have an account yet?{' '}
          <Link
            to='/register'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Register
          </Link>
          .
        </p>
      </div>
    </div>
    );
};

export default Login;