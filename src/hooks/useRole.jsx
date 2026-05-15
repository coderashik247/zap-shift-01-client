import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role = 'user' , isLoading:roleLoading} = useQuery ({
        queryKey: ['user-role', user?.email],
         enabled: !!user?.email, 
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/${user?.email}/role`);
            console.log("Role fetched from server:", res.data.role);
            console.log("Role fetched from server:", typeof(res.data.role));
            return res.data?.role || 'user';

        }
    })
    return [role, roleLoading];
};

export default useRole;