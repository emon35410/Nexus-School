import React, { useEffect, useRef, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import NexusLoader from '../../components/Nexusloader/Nexusloader';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { MdDeleteForever } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import {
  HiOutlineCalendarDays,
  HiOutlineAdjustmentsHorizontal,
} from 'react-icons/hi2';
import Swal from 'sweetalert2';

const UpdateRoutine = () => {
  const [isRoutine, setIsRoutine] = useState('');
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const [isUpdate, setIsUpdate] = useState({});
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (isUpdate) {
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
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!',
      background: '#0f172a',
      color: '#fff',
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
    const item = routine.find(r => r.day === day && r.period == period);

    if (!item)
      return (
        <div className="h-12 flex items-center justify-center opacity-10">
          —
        </div>
      );

    return (
      <div>
        <div className="bg-slate-800/40 border border-slate-700/50 p-2 md:p-3 rounded-xl group min-w-[140px]">
          <div className="flex justify-between items-start gap-2">
            <div className="overflow-hidden">
              <p className="font-bold text-blue-400 text-[11px] md:text-xs uppercase truncate">
                {item.subject}
              </p>
              <p className="text-[10px] md:text-xs text-slate-400 mt-0.5 truncate">
                {item.teacherName}
              </p>
              <div className="mt-1 text-[9px] md:text-[10px] text-blue-300/80">
                {item.time}
              </div>
            </div>
            <div className="flex flex-col gap-1 shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleUpdate(item._id)}
                className="p-1 bg-slate-700 hover:bg-blue-600 rounded text-white"
              >
                <CiEdit size={14} />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="p-1 bg-slate-700 hover:bg-red-600 rounded text-white"
              >
                <MdDeleteForever size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading)
    return (
      <div className="h-96 flex items-center justify-center">
        <NexusLoader />
      </div>
    );

  return (
    <div className="  p-3 md:p-8 text-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Responsive Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 bg-slate-900/40 p-5 rounded-3xl border border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-500">
              <HiOutlineCalendarDays className="text-xl" />
              <span className="uppercase tracking-widest text-[10px] font-bold">
                Scheduler Pro
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              Class Routine
            </h1>
            <p className="text-slate-500 text-xs md:text-sm">
              Manage and update school schedules across all grades.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <HiOutlineAdjustmentsHorizontal className="text-slate-400 hidden sm:block" />
            <select
              value={isRoutine}
              onChange={e => setIsRoutine(e.target.value)}
              className="select select-bordered w-full lg:w-56 bg-slate-800 border-slate-700 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose Class</option>
              {['class-6', 'class-7', 'class-8', 'class-9', 'class-10'].map(
                cls => (
                  <option key={cls} value={cls}>
                    {cls.replace('-', ' ')}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>

        {/* Table Container with Horizontal Scroll on Mobile */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700">
            <table className="table w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80">
                  <th className="py-4 px-6 text-slate-500 text-[10px] uppercase tracking-tighter">
                    Day
                  </th>
                  {periods.map(p => (
                    <th
                      key={p}
                      className="py-4 px-6 text-slate-500 text-[10px] uppercase tracking-tighter text-center"
                    >
                      Period {p}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {days.map(day => (
                  <tr
                    key={day}
                    className="hover:bg-slate-800/20 transition-colors"
                  >
                    <td className="font-bold text-slate-400 px-6 py-4 text-xs italic">
                      {day.substring(0, 3)}
                    </td>
                    {periods.map(period => (
                      <td key={period} className="p-2 md:p-4 min-w-[160px]">
                        {getClass(day, period)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Responsive Modal */}
        <dialog
          ref={modalRef}
          className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
        >
          <div className="modal-box bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-t-3xl sm:rounded-3xl max-w-lg">
            <h3 className="text-xl font-black mb-6 text-white border-b border-slate-800 pb-4">
              Edit Schedule
            </h3>

            <form
              onSubmit={handleSubmit(handleUpdateRoutine)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control md:col-span-2">
                  <label className="label text-[10px] uppercase font-bold text-slate-500">
                    Subject
                  </label>
                  <input
                    type="text"
                    {...register('subject')}
                    className="input input-sm md:input-md bg-slate-800 border-slate-700"
                  />
                </div>

                <div className="form-control">
                  <label className="label text-[10px] uppercase font-bold text-slate-500">
                    Department
                  </label>
                  <input
                    type="text"
                    {...register('department')}
                    className="input input-sm md:input-md bg-slate-800 border-slate-700"
                  />
                </div>

                <div className="form-control">
                  <label className="label text-[10px] uppercase font-bold text-slate-500">
                    Teacher
                  </label>
                  <input
                    type="text"
                    {...register('teacherName')}
                    className="input input-sm md:input-md bg-slate-800 border-slate-700"
                  />
                </div>

                <div className="form-control">
                  <label className="label text-[10px] uppercase font-bold text-slate-500">
                    Day
                  </label>
                  <input
                    type="text"
                    {...register('day')}
                    className="input input-sm md:input-md bg-slate-800 border-slate-700"
                  />
                </div>

                <div className="form-control">
                  <label className="label text-[10px] uppercase font-bold text-slate-500">
                    Period (1-3)
                  </label>
                  <input
                    type="number"
                    {...register('period')}
                    max={3}
                    min={1}
                    className="input input-sm md:input-md bg-slate-800 border-slate-700"
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label text-[10px] uppercase font-bold text-slate-500">
                    Time
                  </label>
                  <input
                    type="time"
                    {...register('time')}
                    className="input input-sm md:input-md bg-slate-800 border-slate-700 w-full"
                  />
                </div>
              </div>

              <div className="modal-action flex flex-col sm:flex-row gap-2 mt-8">
                <button
                  type="button"
                  onClick={handleColse}
                  className="btn btn-ghost order-2 sm:order-1 flex-1"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary order-1 sm:order-2 flex-[2] bg-blue-600 hover:bg-blue-700 border-none"
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