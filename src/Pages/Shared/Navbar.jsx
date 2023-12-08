import React, { useCallback, useContext, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai'
import { AuthContext } from '../../Provider/AuthProvider';
import useUser from '../../hooks/useUser/useUser';

const Navbar = () => {
  const {userDetails,logOut} = useContext(AuthContext)
  const [isUser,refetch,] = useUser()
  
    const navlist = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/upload'>Upload</NavLink></li>
    </>
    const location= useLocation().pathname.split('/')[1]

    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = useCallback(() => {
      setIsOpen(value => !value)
    }, [])

    return (
        <div>
            <div className="navbar px-10 bg-gray-400 border-[1px] border-neutral-200 font-NovaSquare">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {navlist}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Somiti</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
        {navlist}
    </ul>
  </div>
  <div className="navbar-end relative">
  
  {
    location === 'login' || location === 'register' ? <NavLink
      to='/login'
       className={`mr-4 px-4 rounded py-2 bg-rose-600 text-white  transition font-semibold`}>Login
  </NavLink>:
  <NavLink
      to='/login'
       className={`mr-4 px-4 rounded py-2 hover:bg-neutral-100 transition font-semibold`}>Login
  </NavLink>
  }
  
  <div
          onClick={toggleOpen}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div>
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" className='rounded-full' alt='profile' height='30' width='30' />
            </div>
  </div>
    {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] lg:w-[10vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            <Link
                 to='/dashboard'
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  DashBoard
            </Link>
              <p
              onClick={()=> logOut()}
                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
              >
                Logout
              </p>

        
          </div>
        </div>
        )}
   </div>
</div>
</div>

    );
};

export default Navbar;