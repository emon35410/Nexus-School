import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

import { useQuery } from '@tanstack/react-query';
import NexusLoader from '../../components/Nexusloader/Nexusloader';


const UpdateRoutine = () => {
  const [isRoutine, setIsRoutine] = useState('');
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const [isUpdate,setIsUpdate]=useState({})

 const { data:routine=[], isLoading } = useQuery({
     queryKey: ['routine',isRoutine],
     queryFn: async () => {
       const res = await axiosSecure.get(`/routine?className=${isRoutine}`,
       );
       return res.data;
     },
 });
  // get one update data
  const handleUpdate = id => {
    const getRoutine = routine.find(r => r._id === id);
    setIsUpdate(getRoutine)
    modalRef.current.showModal();
  };

  
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
     if (!Array.isArray(routine)) return null;

    const item = routine.find(r => r.day == day && r.period == period);
    if (!item) {
      return ''
    };
    if (item) {
      return (
        <div className='grid grid-cols-3 gap-2'>
          <div className=' col-span-2'>
            <p>{item.subject}</p>
            <p>{item.teacherName}</p>
            <span>Time : {item.time}</span>
          </div>

          <div className=' col-span-1'>
            <button onClick={()=>handleUpdate(item._id)} className='btn btn-xs'>Edit</button>
          </div>
        </div>
      );
    }
  }

  
  
  if (isLoading) {
    return <NexusLoader></NexusLoader>
  }


  return (
    <div className=" mb-20">
      {/* routine headline */}
      <div className=" text-center mb-3 space-y-2">
        <h1 className=" text-xl font-bold text-blue-400">
          Check if the routine already exists. then only update it
        </h1>
        <div>
          <select
            value={isRoutine}
            onChange={e => setIsRoutine(e.target.value)}
            className="select bg-black"
          >
            <option value={''}>Select-Class</option>
            <option value={'class-6'}>class-6</option>
            <option value={'class-7'}>class-7</option>
            <option value={'class-8'}>class-8</option>
            <option value={'class-9'}>class-9</option>
            <option value={'class-10'}>class-10</option>
          </select>
        </div>
      </div>

      {/* routine table */}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-blue-400">
        <table className="table">
          {/* head */}
          <thead>
            <tr className=" text-white">
              <th>Day</th>
              {periods.map(p => (
                <th>periods {p}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {days.map(day => (
              <tr key={day}>
                <td>{day}</td>
                {periods.map(period => (
                  <td>{getClass(day, period)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* modal */}
      <div className=" ">
        <dialog
          ref={modalRef}
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle text-black"
        >
          <div className="modal-box">
            <form>
              <fieldset className=" fieldset">
                {/* department */}
                <label className="label"> department</label>
                <input
                  type="text"
                  name=""
                  className="input"
                  id=""
                  defaultValue={isUpdate?.department}
                />
                {/* subject */}
                <label className="label"> subject</label>
                <input
                  type="text"
                  name=""
                  className="input"
                  id=""
                  defaultValue={isUpdate?.subject}
                />
                {/* day */}
                <label className="label"> day</label>
                <input
                  type="text"
                  name=""
                  className="input"
                  id=""
                  defaultValue={isUpdate?.day}
                />
                {/* period */}
                <label className="label">period</label>
                <select
                  defaultValue={isUpdate?.period}
                  className="select"
                  name=""
                  id=""
                >
                  <option value={1}>period-1</option>
                  <option value={2}>period-2</option>
                  <option value={3}>period-3</option>
                </select>
                {/* teacherName */}
                <label className="label">teacherName</label>
                <input
                  type="text"
                  name=""
                  className="input"
                  id=""
                  defaultValue={isUpdate?.teacherName}
                />
                {/* time */}
                <label className="label">time</label>
                <input
                  type="time"
                  className="input"
                  name=""
                  id=""
                  defaultValue={isUpdate?.time}
                />
              </fieldset>
            </form>
            <button className="btn">Close</button>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default UpdateRoutine;