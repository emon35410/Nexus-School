import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import NexusLoader from '../../components/Nexusloader/Nexusloader';
import useAuth from '../../Hooks/useAuth';

const ClassRoutine = () => {
  const axiosSecure = useAxiosSecure();
  const {user}=useAuth()
  const { data: studentData = [], } = useQuery({
      queryKey: ['students'],
      queryFn: async () => {
        const res = await axiosSecure.get(`/student`);
        return res.data.result;
      }
  });

  const findSingleStudent = studentData.find(s => s?.email === user?.email);
 
  
  const { data=[], isLoading } = useQuery({
    queryKey: ['routine',findSingleStudent?.department],
    queryFn: async () => {
      const res = await axiosSecure.get(`/routine?className=${findSingleStudent?.department}`,
      );
      return res.data;
    },
  });
  

 if (isLoading) {
    return <NexusLoader></NexusLoader>;
  }
  return (
    <div>
      <div className=' space-x-3'>
        <button className=" btn btn-xs">Saturday</button>
        <button className=" btn btn-xs">Sunday</button>
        <button className=" btn btn-xs">Monday</button>
        <button className=" btn btn-xs">Tuesday</button>
        <button className=" btn btn-xs">Wednesday</button>
        <button className=" btn btn-xs">Thursday</button>
        <button className=" btn btn-xs">Friday</button>
      </div>

      <table>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </table>
    </div>
  );
};

export default ClassRoutine;