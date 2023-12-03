import moment from 'moment/moment';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Upload = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = formData =>{
        const uploaded_date = moment(new Date()).format('DD/MM/YYYY');
        const type = formData.file[0].type.split('/')[1]
        if (type !== "pdf") {
            toast.error('File type must be pdf')
        }
        formData.slipmonth = moment(formData.slipmonth).format('MMMM YYYY')
        formData.uploaded_date=uploaded_date
        console.log(formData)
    }
    return (
        <div className='font-Exo2'>
            <form className='border-2 p-5 font-NovaSquare rounded-lg w-full mx-auto mt-[5%] lg:w-4/12' onSubmit={handleSubmit(onSubmit)}>
               <label htmlFor="name">Name</label><br />
               <input className='border rounded-lg h-12 pl-4 mb-4 w-full border-red-400' defaultValue=''  type='text' id='name' placeholder='User Name' {...register("name",{required: true})} required/>
               <br/>
               <label htmlFor="cuetID">National ID</label>
               <input className='border rounded-lg h-12 w-full pl-4 mb-4 border-red-400' defaultValue="" type='text' id='nationalID' placeholder='National ID' {...register("nationalid",{required: true})} required/>
               <br/>
               <label htmlFor="slipmonth">Payment Month</label>
               <input className='border rounded-lg h-12 w-full pl-4 mb-4 border-red-400' defaultValue="" type='month' id='slipmonth'  {...register("slipmonth",{required: true})} required/>
               <br/>
               <label htmlFor="file">Upload Slip</label>
               <input className='border rounded-lg w-full pl-4 mb-4 border-red-400' defaultValue="" type='file' id='file'  {...register("file",{required: true})} required/>
               <br/>
               
              
               <input className='btn btn-accent text-white' type="submit" value="Add Print Info" />
            </form>
        </div>
    );
};

export default Upload;