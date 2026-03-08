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
 
  
  const { data:routine=[], isLoading } = useQuery({
    queryKey: ['routine',findSingleStudent?.department],
    queryFn: async () => {
      const res = await axiosSecure.get(`/routine?className=${findSingleStudent?.department}`,
      );
      return res.data;
    },
  });
  
  const days = [
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];
  const periods = [1, 2, 3];
    const getClass = (day, period) => {
      const item = routine.find(r => r.day == day && r.period == period);
      
      if (!item) {
        return ''
      }
      if (item) {
        return (
          <div>
            <div>
              <p className="font-semibold">{item.subject}</p>
              <p className="text-xs text-gray-500">{item.teacherName}</p>
            </div>
            <div>
              <span>
                Time : 
                {new Date(item.time).toLocaleString()}
              </span>
            </div>
          </div>
        );
      }
  };
  

 
    const handleDownload = () => {
      window.print();
    };
 
 
 if (isLoading) {
    return <NexusLoader></NexusLoader>;
  }
  return (
    <div className=" w-full bg-black  p-2 rounded-2xl">
      <div className="p-2 w-full   rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Class Routine</h2>

          <button
            onClick={handleDownload}
            className=" text-white btn btn-info hover:bg-blue-700"
          >
            Download
          </button>
        </div>

        <div className="overflow-x-auto  rounded-box border ">
          <table className="  text-center table ">
            <thead className="">
              <tr>
                <th className="border p-2 text-white">Day</th>
                {periods.map(p => (
                  <th key={p} className="border p-2 text-white">
                    Period {p}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {days.map(day => (
                <tr key={day} className="hover:bg-blue-400">
                  <td className="border p-2 font-semibold">{day}</td>

                  {periods.map(period => (
                    <td key={period} className="border p-3">
                      {getClass(day, period)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClassRoutine;