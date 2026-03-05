import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import NexusLoader from '../../components/Nexusloader/Nexusloader';

const ClassRoutine = () => {
  const axiosSecure = useAxiosSecure();
  const { data=[], isLoading } = useQuery({
    queryKey: ['routine'],
    queryFn: async () => {
      const res = await axiosSecure.get('/routine');
      return res.data;
    },
  });
 
console.log(data)
 
  if (isLoading) {
    return <NexusLoader></NexusLoader>;
  }
  return (
   <div></div>
  );
};

export default ClassRoutine;