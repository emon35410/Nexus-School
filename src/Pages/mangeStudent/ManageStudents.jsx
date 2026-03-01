import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ManageStudents = () => {
  const axiosSecure=useAxiosSecure()
  const { data: studentData =[], isLoading, refetch } = useQuery({
    queryKey: ['all-students'],
    queryFn: async () => {
      const res = await axiosSecure.get('/student');
      
      return res.data;
    }
  });
   
  console.log(studentData)

  return (
    <div>
      
    </div>
  );
};

export default ManageStudents;