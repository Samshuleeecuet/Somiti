import React from 'react';
import Breadcrumb from '../../../Component/Breadcrumb/Breadcrumb';
import useUser from '../../../hooks/useUser/useUser';

const Notice = () => {
    const [isUser] = useUser()
    console.log(isUser)

    const handleNotice = () => {
        const description = document.getElementsByClassName('description')[0].value;
        const categoryitem = document.getElementsByClassName('categoryitem')[0].value;
        console.log(categoryitem, description)
    }

    return (
        <div className='mx-10'>
        <Breadcrumb pageName={'Notice Board'}/>
            <div className='mb-12'>
                   <p className='text-center font-bold text-lg'>No Notice Publish Yet!!</p>
            </div>

            <div className='flex justify-center mb-10'>
                <div className="join">
                <div>
                    <div>
                    <input className="input input-bordered join-item description" placeholder="Description"/>
                    </div>
                </div>
                <select className="select select-bordered join-item categoryitem">
                    <option disabled selected>Category</option>
                    <option>News & Events</option>
                    <option>Important Notice</option>
                </select>
                <div className="indicator">
                    <button className="btn join-item" onClick={handleNotice}>Publish</button>
                </div>
                </div>
            </div>

            <div className='w-3/4 mx-auto'>
            <div className="overflow-x-auto">
  <table className="table table-xs table-pin-rows table-pin-cols">
    <thead>
      <tr> 
        <td></td>
        <td>Description</td> 
        <td>Category</td> 
        <td>time</td> 
        <td>delete</td> 
      </tr>
    </thead> 
    <tbody>
      <tr>
        <td>1</td>
        <td>Cy Ganderton</td> 
        <td>Cy Ganderton</td> 
        <td>Cy Ganderton</td> 
        <td>Quality Control Specialist</td> 
        
      </tr>
    </tbody>
  </table>
</div>
            </div>

        </div>
    );
};

export default Notice;