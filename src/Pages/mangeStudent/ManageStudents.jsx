import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

import StudentCard from './StudentCard';
import NexusLoader from '../../components/Nexusloader/Nexusloader';

const ManageStudents = () => {
  const axiosSecure = useAxiosSecure();
  const [isDepartment, setIsDepartment] = useState('');
  console.log(isDepartment)
  
  const { data: studentData =[], isLoading, refetch } = useQuery({
    queryKey: ['all-students',isDepartment],
    queryFn: async () => {
      const res = await axiosSecure.get(`/student?department=${isDepartment}`);
      
      return res.data;
    }
  });
  
  if (isLoading) {
   return <NexusLoader></NexusLoader>
 }
  return (
    <div>
      <div >
        {/* title and subtitle */}
        <div className=" text-center mb-8 space-y-2 ">
          <h1 className=" text-2xl font-bold">Today’s Feedback</h1>
          <p>Teachers can provide one feedback per subject each day</p>
        </div>
        {/* select with class */}
        <div className='md:max-w-[350px] w-full mb-3'>
          <select
            name="department"
            value={isDepartment}
            onChange={(e)=> setIsDepartment(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:border-blue-500 outline-none text-sm transition-all"
          >
            <option value="">Not Set</option>
            <option value="class-6">Class 6</option>
            <option value="class-7">Class 7</option>
            <option value="class-8">Class 8</option>
            <option value="class-9">Class 9</option>
            <option value="class-10">Class 10</option>
          </select>
        </div>
        {/* select with subject */}
      </div>
      <div className=" grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {studentData.map(student => (
          <StudentCard
            key={student?._id}
            student={student}
            studentData={studentData}
          ></StudentCard>
        ))}
      </div>
    </div>
  );
};

export default ManageStudents;