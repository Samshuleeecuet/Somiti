import React, { useCallback, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai'
import useUser from '../../hooks/useUser/useUser';
import AvatarImg from '../../assets/placeholder.jpg';



const DashBoardNavbar = () => {
  const [isUser,refetch,] = useUser()
    const navlist = <>
        <li><NavLink to='/dashboard/profile'>Profile</NavLink></li>
        <li><NavLink to='/dashboard/users'>Users</NavLink></li>
        <li><NavLink to='/dashboard/history'>Payment History</NavLink></li>
        <li><NavLink to='/dashboard/notice'>Notice</NavLink></li>
    </>
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
  <div
          onClick={toggleOpen}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div>
            <img src={isUser?.Image ||AvatarImg} className='rounded-full' alt='profile' height='30' width='30' />
          </div>
  </div>
    {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] lg:w-[10vw] md:w-3/4 bg-white z-50 overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            <Link
                 to='/'
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  Home
            </Link>
              <Link
                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
              >
                Logout
              </Link>

        
          </div>
        </div>
        )}
   </div>
</div>
</div>

    );
};

export default DashBoardNavbar;