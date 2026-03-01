import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

import StudentCard from './StudentCard';

const ManageStudents = () => {
  const axiosSecure = useAxiosSecure()
  
  const { data: studentData =[], isLoading, refetch } = useQuery({
    queryKey: ['all-students'],
    queryFn: async () => {
      const res = await axiosSecure.get('/student');
      
      return res.data;
    }
  });
  

  return (
    <div className=" grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
      {studentData.map(student => (
        <StudentCard
          key={student?._id}
        
          student={student}
          studentData={studentData}
        ></StudentCard>
      ))}
    </div>
  );
};

export default ManageStudents;