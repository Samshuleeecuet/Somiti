import moment from 'moment/moment';
import React from 'react';
import toast from 'react-hot-toast';
import useUser from '../../hooks/useUser/useUser';
import { useLocation, useNavigate } from 'react-router-dom';

const Upload = () => {
   
    const [isUser,refetch] = useUser()
    const navigate = useNavigate()
      const location = useLocation()
      const from = location.state?.from?.pathname || '/'
    const handleSubmit = event =>{
        event.preventDefault()
    const Name = event.target.name.value
    const Nationalid = event.target.nationalid.value
    const Slipmonth = moment(event.target.slipmonth.value).format('MMMM YYYY')
    const file = document.getElementById('file')
    const formData = new FormData();
    formData.append('file',file.files[0])
    formData.append('name',Name)
    formData.append('nationalid',Nationalid)
    formData.append('slipmonth',Slipmonth)
        const type = file.files[0].type.split('/')[1]
        if (type !== "pdf") {
            toast.error('File type must be pdf')
        }
        
        fetch('http://localhost:5000/upload_file',{
                  method: 'POST',
                  body: formData
        })
        .then(res=> res.json())
        .then((result)=> {
            console.log(result)
            if(result._id){
                toast.success('File Uploaded Successfully')
                form.reset()
                navigate(from, { replace: true })
            }else{
                form.reset()
            }
        })
        .catch((err)=> console.log(err))
    }
    return (
        <div className='font-Exo2'>
            <form onSubmit={handleSubmit} className='border-2 p-5 font-NovaSquare rounded-lg w-full mx-auto mt-[5%] lg:w-4/12' id='form'>
               <label htmlFor="name">Name</label><br />
               <input className='border rounded-lg h-12 pl-4 mb-4 w-full border-red-400' defaultValue={isUser?.Name}  type='text' id='name' placeholder='User Name' name="name" required/>
               <br/>
               <label htmlFor="nationalid">National ID</label>
               <input className='border rounded-lg h-12 w-full pl-4 mb-4 border-red-400' defaultValue={isUser?.Nationalid} type='text' id='nationalid' placeholder='National ID' name='nationalid' required/>
               <br/>
               <label htmlFor="slipmonth">Payment Month</label>
               <input className='border rounded-lg h-12 w-full pl-4 mb-4 border-red-400' defaultValue="" type='month' id='slipmonth'  name='slipmonth' required/>
               <br/>
               <label htmlFor="file">Upload Slip</label>
               <input className='border rounded-lg w-full pl-4 mb-4 border-red-400' type='file' id='file' name='file' required/>
               <br/>
               
              
               <input className='btn btn-accent text-white' type="submit" value="Upload" />
            </form>
        </div>
    );
};

export default Upload;