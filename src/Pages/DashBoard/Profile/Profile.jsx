import React from 'react';
import AvatarImg from '../../../assets/placeholder.jpg';
import CoverImg from '../../../assets/cover/cover-01.png';
import useUser from '../../../hooks/useUser/useUser';
import Breadcrumb from '../../../Component/Breadcrumb/Breadcrumb';
import PaymentHistory from './PaymentHistory';

const Profile = () => {
    const [isUser,refetch,] = useUser()
    return (
        <div>
            <div className="relative z-8 lg:h-30 md:h-52">
                <img
                    src={CoverImg}
                    alt="profile cover"
                    className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                />
        
                <div className="w-full px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
                    <div className='relative bg- flex flex-col items-center z-10 rounded-full' >
                        <div className="absolute -top-14 border-8 border-gray-500/0.5 rounded-full">
                            <img className="rounded-full w-28 h-28" src={isUser?.Image || AvatarImg} alt="profile" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex'>
                <Breadcrumb pageName={'Profile Information'}/>
                <button className="btn btn-outline btn-success mt-14 mr-14" onClick={()=>document.getElementById('my_modal_5').showModal()}>Update Profile</button>
            </div>
            <div className='px-12 font-serif gap-4 w-8/12'>
                <p><span className='text-xl font-extrabold'>Name: </span><span className='font-medium'>{isUser?.Name}</span></p>
                <p><span className='text-xl font-extrabold'>Email: </span><span className='font-medium'>{isUser?.Email}</span></p>
                <p><span className='text-xl font-extrabold'>National Id: </span><span className='font-medium'>{isUser?.Nationalid}</span></p>
                <p><span className='text-xl font-extrabold'>Phone Number: </span><span className='font-medium'>{isUser?.Phonenumber}</span></p>
                
            </div>

            <div>
                <Breadcrumb pageName={'Payment Hisory'}/>
                <PaymentHistory/>

            </div>

            {/*Modal Box*/}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                    </div>
                </div>
                </dialog>

        </div>
    );
};

export default Profile;