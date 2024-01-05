import React, { useState } from 'react';
import axios from 'axios'
import Breadcrumb from '../../../Component/Breadcrumb/Breadcrumb';
import toast from 'react-hot-toast';

const Users = () => {
    const [allUser,setallUser]= useState(null);
    axios.get('http://localhost:5000/user')
    .then(function (response) {
        setallUser(response.data)
    })
    const handleRole = (value,email)=>{
        if(value && email){
            axios.put(`http://localhost:5000/user/${email}`,{
                Role : value
            })
            .then(function(response){
                toast.success(`${email} is now a ${value}`)
            })
            .catch(function(error){
                toast.error('Updated Failed')  
            })
        }
    }
    const handleUser = (value,email)=>{
        if(value && email){
            axios.put(`http://localhost:5000/user/${email}`,{
                Approved : value
            })
            .then(function(response){
                console.log(response.data)
                toast.success(`${email} is ${value}`)
            })
            .catch(function(error){
                toast.error('Updated Failed')  
            })
        }
    }
    return (
        <div>
            <Breadcrumb pageName={'User Information'}/>
            <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>
                        </th>
                        <th>Name<br/>National Id</th>
                        <th>Email<br></br>Phone</th>
                        <th>Role</th>
                        <th>Approved</th>
                        <th>Update<br/>Role</th>
                        <th>Update<br/>Approved</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {
                        allUser && <>
                            {
                                allUser?.map((item,index)=><tr key={index}>
                        <th>
                        {index+1}
                        </th>
                        <td>
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={item.Image} />
                            </div>
                            </div>
                            <div>
                            <div className="font-bold">{item.Name}</div>
                            <div className="text-sm opacity-50">{item.Nationalid}</div>
                            </div>
                        </div>
                        </td>
                        <td>
                        {item.Email}
                        <br/>
                        <span className="badge badge-ghost badge-sm">{item.Phonenumber}</span>
                        </td>
                        <td>
                        <span className="badge badge-ghost badge-lg">{item.Role}</span>
                        </td>
                        <td>
                        <span className="badge badge-ghost badge-lg">{item.Approved}</span>
                        </td>
                        <th>
                        {
                        item.Role ==='user'? 
                            <button onClick={()=>handleRole('admin',item.Email)} className="btn bg-gray-500 btn-ghost btn-xs">Admin</button>:<button onClick={()=>handleRole('user',item.Email)} className="btn bg-gray-500 btn-ghost btn-xs">User</button>
                        }   
                        </th>
                        <th>
                        {
                            item.Approved === 'pending'|| item.Approved === 'disapproved' ? <button onClick={()=>handleUser('approved',item.Email)} className="btn bg-gray-500 btn-ghost btn-xs">Approved</button> :
                        <button onClick={()=>handleUser('disapproved',item.Email)} className="btn bg-gray-500 btn-ghost btn-xs">Disapproved</button>
                        }
                        
                        </th>
                    </tr>)
                            }
                        </>
                    }
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
};

export default Users;