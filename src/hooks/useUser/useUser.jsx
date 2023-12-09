import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Provider/AuthProvider';


const useUser = () => {
    const {user,loading} = useContext(AuthContext)
    const {data: isUser = [],refetch,isUserLoading} = useQuery({
        queryKey:["isUser",user?.email],
        queryFn: async ()=>{
            const response = await fetch(`http://localhost:5000/user/${user?.email}`);
            return response.json()
        }
    })

    return [isUser,refetch,isUserLoading];
};

export default useUser;