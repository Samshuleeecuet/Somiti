import React, { useState } from 'react';
import usePayment from '../../../hooks/usePayment/usePayment';
import PdfViewer from '../Profile/PdfViewer';
import moment from 'moment/moment';
import axios from 'axios';
import { BsFileEarmarkPdf } from "react-icons/bs";
import { LuSendHorizonal } from "react-icons/lu";
import { pdfjs } from 'react-pdf';
import Breadcrumb from '../../../Component/Breadcrumb/Breadcrumb';
import useUser from '../../../hooks/useUser/useUser';
import toast from 'react-hot-toast';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const PaymentHistory = () => {
    const [isUser] = useUser()
    const [isPayment,refetch,isPaymentLoading]= usePayment()
    const [Path,Setpath]= useState(null)
    const [Comment,Setcomment]= useState('')
    const handlepdf= (path)=>{
        Setpath(path)
    }
    console.log(isPayment)
    const handlestatus = (value,email,id)=>{
            axios.put(`http://localhost:5000/file/${id}`,{
                status : value,
                file_id : id,
                email: email,
                admin_email:isUser?.Email,
                date: moment(Date.now())
            })
            .then(function(response){
                toast.success(`Payment of ${email} is ${value}`)
            })
            .catch(function(error){
                toast.error('Updated Failed')  
            })
    }

    const handleComment = (e)=>{
        Setcomment(e.target.value)
    }
    const handleSubmit = (id)=>{
         if(Comment.length>0){
            console.log(Comment,id)
            axios.put(`http://localhost:5000/comment/${id}`,{
                comment : Comment
            })
            .then((response)=>{
                console.log(response)
                refetch()
                Setcomment("")
                toast.success('comment added successfully')
            })
         }else{
            toast.error("Please type a comment")
         }
    }
    return (
        <div className='mx-10'>
        <Breadcrumb pageName={'Payment History'}/>
            {
                isPayment.length<1 && <div className='mb-12'>
                   <p className='text-center font-bold text-lg'>No Payment History Yet!!</p>
                </div>
            }
            {
                isPayment.length>0 &&  
            <div className="overflow-x-auto flex my-10">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>National Id</th>
                        <th>Amount</th>
                        <th>Month</th>
                        <th>PaymentDate</th>
                        <th>Status</th>
                        <th>Preview</th>
                        <th>Update</th>
                        <th>Comment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {
                        isPayment?.map((x,index)=> <tr key={x._id}>
                        <th>{index+1}</th>
                        <td>{x.name}</td>
                        <td>{x.nationalid}</td>
                        <td>{x.amount}</td>
                        <td>{x.slipmonth}</td>
                        <td>{moment(x.date).format('DD-MM-YYYY')}</td>
                        <td>{x.status}</td>
                        <td><BsFileEarmarkPdf onClick={()=>handlepdf(x.path)} className='text-xl text-red-700'/>
                        </td>
                        <td>
                        <button onClick={()=>handlestatus('approved',x.email,x._id)} className="btn bg-gray-500 btn-ghost btn-xs">Approved</button>:<button onClick={()=>handlestatus('disapproved',x.email,x._id)} className="btn bg-gray-500 btn-ghost btn-xs">Disapproved</button>
                        </td>
                        <td>
                        <div className='h-6'>{x.comment}</div>
                        <div className='flex items-center'><input type="text" onChange={handleComment}  placeholder="Comment" className="input input-ghost w-32" /><LuSendHorizonal onClick={()=>handleSubmit(x._id)} className='inline h-5 w-5 ml-2'/></div></td>
                    </tr>)
                    }
                    </tbody>
                </table>
            
            </div>
            }
            {
                Path ? <PdfViewer path={Path} />: null
            }
            {/*Modal Box*/}
            <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
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

export default PaymentHistory;