import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Provider/AuthProvider';

const usePayment = () => {
    const {user,loading} = useContext(AuthContext)
    
    const {data: isPayment = [],refetch,isPaymentLoading} = useQuery({
        queryKey:["isPayment",user?.email],
        queryFn: async ()=>{
            const response = await fetch(`http://localhost:5000/allfiles`);
            return response.json()
        }
    })

    return [isPayment,refetch,isPaymentLoading];
};

export default usePayment;