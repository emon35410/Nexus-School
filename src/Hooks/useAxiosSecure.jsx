import axios from 'axios';
import useAuth from './useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    // baseURL: 'http://localhost:5000'
    baseURL: 'https://nexus-school-server.vercel.app'
})

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate=useNavigate()
    
    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(async(config) => {
            if (user) {
                // console.log(user.accessToken)
                const token = await user.getIdToken(); 
                config.headers.Authorization = `Bearer ${token}`;
            }
        
        return config;
        })


        // Response Interceptors
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => {
                return response;
            },

            async(error) => {
                let responseStatus= error?.response?.status;
                console.log(error)
                
                if (responseStatus === 401 || responseStatus === 403) {
                   await logOut().then(() => {
                         navigate('/login');
                    })
                   
                    
                }

                return Promise.reject(error);
            }
        )
        

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        }
        

    },[user,logOut,navigate])

    return axiosSecure;
}

export default useAxiosSecure;

