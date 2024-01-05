import React, { useState } from 'react';
import useUser from '../../../hooks/useUser/useUser';
import usePayment from '../../../hooks/usePayment/usePayment';
import moment from 'moment/moment';
import { BsFileEarmarkPdf } from "react-icons/bs";
import { pdfjs } from 'react-pdf';
import PdfViewer from './PdfViewer';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const PaymentHistory = () => {
    const [isUser,] = useUser()
    const [isPayment,refetch,isPaymentLoading]= usePayment()
    const [Path,Setpath]= useState(null)
    const found = isPayment.filter(x => x.nationalid === isUser.Nationalid)
    
    const handlepdf= (path)=>{
        Setpath(path)
    }
    
    return (
        <div className='mx-10'>
            {
                found.length<1 && <div className='mb-12'>
                   <p className='text-center font-bold text-lg'>No Payment History Yet!!</p>
                </div>
            }
            {
            found.length>0 &&  
            <div className="overflow-x-auto flex my-10">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>National Id</th>
                        <th>Amount</th>
                        <th>Month</th>
                        <th>PaymentDate</th>
                        <th>UpdatedDate</th>
                        <th>Status</th>
                        <th>Preview</th>
                        <th>Comment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {
                        found?.map((x,index)=> <tr key={x._id}>
                        <th>{index+1}</th>
                        <td>{x.nationalid}</td>
                        <td>{x.amount}</td>
                        <td>{x.slipmonth}</td>
                        <td>{moment(x.date).format('DD-MM-YYYY')}</td>
                        <td>{x.updateHistory[0]}</td>
                        <td>{x.status}</td>
                        <td><BsFileEarmarkPdf onClick={()=>handlepdf(x.path)} className='text-xl text-red-700'/>
                        </td>
                        <td>{x.comment}</td>
                    </tr>)
                    }
                    </tbody>
                </table>
                <PdfViewer path={Path} />
            
            </div>
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