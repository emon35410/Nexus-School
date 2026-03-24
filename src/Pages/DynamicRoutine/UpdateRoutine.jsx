

import React, { useEffect, useRef, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import NexusLoader from '../../components/Nexusloader/Nexusloader';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { MdDeleteForever, MdOutlineClass } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import {
  HiOutlineCalendarDays,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineClock,
  HiOutlineUser,
} from 'react-icons/hi2';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const UpdateRoutine = () => {
  const [isRoutine, setIsRoutine] = useState('');
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const [isUpdate, setIsUpdate] = useState({});
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
   if (isUpdate && Object.keys(isUpdate).length > 0) {
     reset(isUpdate);
   }
  }, [isUpdate, reset]);

  
  const {
    data: routine = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['routine', isRoutine],
    queryFn: async () => {
      const res = await axiosSecure.get(`/routine?className=${isRoutine}`);
      return res.data;
    },
  });

  const handleUpdate = id => {
    const getRoutine = routine.find(r => r._id === id);
    setIsUpdate(getRoutine);
    modalRef.current.showModal();
  };

  const handleColse = e => {
    e.preventDefault();
    modalRef.current.close();
  };

  const handleUpdateRoutine = updatedData => {
    const updateData = {
      day: updatedData?.day,
      subject: updatedData?.subject,
      time: updatedData?.time,
      period: updatedData?.period,
      department: updatedData?.department,
      teacherName: updatedData?.teacherName,
    };
    axiosSecure
      .patch(`routine/${isUpdate?._id}`, updateData)
      .then(res => {
        toast.success('Routine updated!');
        modalRef.current.close();
        refetch();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb', // Blue-600
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/routine/${id}`)
          .then(res => {
            Swal.fire('Deleted!', 'Entry removed.', 'success');
            refetch();
          })
          .catch(err => console.log(err));
      }
    });
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
    const item = routine.filter(
      r => r.day === day && Number(r.period) === Number(period),
    );

    if (item.length === 0)
      return (
        <div className="h-20 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-lg text-gray-300">
          <span className="text-xs font-medium">No Class</span>
        </div>
      );

    return item.map(r => (
      <div key={r._id} className="group relative bg-white border border-blue-100 p-3 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300  my-1">
        <div className="flex flex-col gap-1 ">
          <p className="font-bold text-blue-900 text-sm truncate uppercase tracking-wide">
            {r.subject}
          </p>
          <div className="flex items-center gap-1 text-gray-500 text-[11px]">
            <HiOutlineUser className="text-blue-500" />
            <span className="truncate">{r.teacherName}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-[10px] mt-1 font-semibold">
            <HiOutlineClock className="text-blue-400" />
            {r.time}
          </div>
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleUpdate(r._id)}
            className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
          >
            <CiEdit size={16} />
          </button>
          <button
            onClick={() => handleDelete(r._id)}
            className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
          >
            <MdDeleteForever size={16} />
          </button>
        </div>
      </div>
    ));
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <NexusLoader />
      </div>
    );

  return (
    <div className=" bg-gray-50 rounded-xl py-8 px-2 sm:px-2 lg:px-4 ">
      <div className="">
        {/* Header Section */}
        <div className="bg-blue-600 rounded-3xl py-6 px-3  md:p-10 text-white shadow-xl mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                <HiOutlineCalendarDays className="text-2xl text-white" />
              </div>
              <span className="text-blue-100 font-semibold tracking-widest text-xs uppercase">
                Scheduler Pro
              </span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black mb-2">
                Manage Routine
              </h1>
              <p className="text-blue-100/80 text-sm md:text-base max-w-md">
                Dynamic schedule management. Select a class to start editing the
                weekly routine.
              </p>

              <Link to={'/dashboard/create-routine'} className=' btn mt-2 btn-info btn-outline text-white'>Create Routine</Link>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
            <HiOutlineAdjustmentsHorizontal className="text-white text-xl hidden sm:block" />
            <select
              value={isRoutine}
              onChange={e => setIsRoutine(e.target.value)}
              className="select select-ghost w-full lg:w-64 bg-white text-gray-800 focus:ring-4 focus:ring-blue-300 font-bold"
            >
              <option value="" className="text-gray-400">
                Choose Class Grade
              </option>
              {['class-6', 'class-7', 'class-8', 'class-9', 'class-10'].map(
                cls => (
                  <option key={cls} value={cls} className="text-gray-800">
                    {cls.toUpperCase().replace('-', ' ')}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="py-3 px-4 text-blue-600 font-black text-xs uppercase tracking-widest">
                    Day
                  </th>
                  {periods.map(p => (
                    <th
                      key={p}
                      className="py-5 px-6 text-gray-500 font-bold text-xs uppercase tracking-widest text-center"
                    >
                      Period {p}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {days.map(day => (
                  <tr
                    key={day}
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="font-black text-gray-700 px-3 py-2 md:px-6 md:py-4 text-sm">
                      <div className="flex flex-col">
                        <span className="text-blue-600">
                          {day.substring(0, 3)}
                        </span>
                        <span className="text-[10px] text-gray-400 font-normal hidden md:block">
                          {day}
                        </span>
                      </div>
                    </td>
                    {periods.map(period => (
                      <td key={period} className="p-3 ">
                        {getClass(day, period)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/*  Modal */}
        <dialog
          ref={modalRef}
          className="modal modal-bottom sm:modal-middle backdrop-blur-md"
        >
          <div className="modal-box bg-white p-0 rounded-3xl overflow-hidden max-w-xl border-none">
            <div className="bg-blue-600 p-6 text-white">
              <h3 className="text-2xl font-black">Edit Schedule</h3>
              <p className="text-blue-100 text-xs mt-1">
                Update class details for the selected period
              </p>
            </div>

            <form
              onSubmit={handleSubmit(handleUpdateRoutine)}
              className="p-8 space-y-5 text-black"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-control md:col-span-2">
                  <label className="label font-bold text-gray-600 text-xs uppercase">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    {...register('subject')}
                    className="input input-bordered bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-bold text-gray-600 text-xs uppercase">
                    Department
                  </label>
                  <input
                    type="text"
                    {...register('department')}
                    className="input input-bordered bg-gray-50 border-gray-200"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-bold text-gray-600 text-xs uppercase">
                    Teacher
                  </label>
                  <input
                    type="text"
                    {...register('teacherName')}
                    className="input input-bordered bg-gray-50 border-gray-200"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-bold text-gray-600 text-xs uppercase">
                    Day
                  </label>
                  <input
                    type="text"
                    {...register('day')}
                    className="input input-bordered bg-gray-50 border-gray-200"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-bold text-gray-600 text-xs uppercase">
                    Period
                  </label>
                  <input
                    type="number"
                    {...register('period')}
                    max={3}
                    min={1}
                    className="input input-bordered bg-gray-50 border-gray-200"
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label font-bold text-gray-600 text-xs uppercase">
                    Class Time
                  </label>
                  <input
                    type="time"
                    {...register('time')}
                    className="input input-bordered bg-gray-50 border-gray-200 w-full"
                  />
                </div>
              </div>

              <div className="modal-action gap-3 mt-10">
                <button
                  type="button"
                  onClick={handleColse}
                  className="btn btn-ghost text-gray-500 font-bold border-none flex-1"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="btn bg-blue-600 hover:bg-blue-700 text-white border-none flex-[2] rounded-xl shadow-lg shadow-blue-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default UpdateRoutine;