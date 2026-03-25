
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Class6 from './Class6';
import Class7 from './Class7';
import Class8 from './Class8';
import Class910 from './Class910';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const CreateResultSheet = () => {
  const { register, handleSubmit, watch ,reset} = useForm();
  const className = watch('className');
  const studentEmail = watch('studentEmail');
  const axiosSecure = useAxiosSecure();
  

 
  
  const { data } = useQuery({
    queryKey: ['findStudent', studentEmail],
    enabled: !!studentEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/result/one-student?email=${studentEmail}`,
      );
      return res.data;
    },
  });

  

 

  const handleSubmitResult = resultData => {
    if (!resultData?.studentRoll) {
      toast.info('Add Student Roll');
      return;
    }

    const ignoreFields = [
      'className',
      'examOption',
      'studentEmail',
      'studentName',
      'studentRoll',
    ];

    const subjects = Object.entries(resultData)
      .filter(([key]) => !ignoreFields.includes(key))
      .map(([subject, mark]) => ({
        name: subject,
        mark: Number(mark),
      }));

    const newResultSheet = {
      className: resultData.className, // Fixed casing to match your state
      examOption: resultData.examOption,
      studentEmail: resultData.studentEmail,
      studentName: resultData.studentName,
      studentRoll: resultData.studentRoll,
      subjects,
    };

    axiosSecure.post('/result', newResultSheet)
      .then(res => {
        toast.success('Result submitted successfully!');
        reset({
          studentEmail: '',
          studentName: '',
          className: '',
          studentRoll: '',
          examOption: ''
        });
       
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to submit result.');
      });
  };
   useEffect(() => {
     if (data && studentEmail) {
       reset({ studentName: data?.name, className: data?.department });
     } 
   }, [data, studentEmail,reset]);

  return (
    <div className="min-h-screen   mx-auto">
      <form
        onSubmit={handleSubmit(handleSubmitResult)}
        className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-500/30 shadow-2xl shadow-blue-500/20 md:max-w-[800px] rounded-2xl mx-auto p-6 w-full text-slate-200"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-400 tracking-wide uppercase">
          Create Student Result
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Student Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold ml-1 text-blue-300">
              Student Email
            </label>
            <input
              type="email"
              {...register('studentEmail', { required: true })}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
              placeholder="email@student.com"
            />
          </div>
          {/* Student Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold ml-1 text-blue-300">
              Student Name
            </label>
            <input
              type="text"
              {...register('studentName', { required: true })}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
              placeholder="e.g. John Doe"
            />
          </div>

          {/* Class Selection */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold ml-1 text-blue-300">
              Class Name
            </label>
            <select
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
              {...register('className', { required: true })}
            >
              <option value="" className="bg-slate-900">
                Select Class
              </option>
              <option value="class-6" className="bg-slate-900">
                Class 6
              </option>
              <option value="class-7" className="bg-slate-900">
                Class 7
              </option>
              <option value="class-8" className="bg-slate-900">
                Class 8
              </option>
              <option value="class-9" className="bg-slate-900">
                Class 9
              </option>
              <option value="class-10" className="bg-slate-900">
                Class 10
              </option>
            </select>
          </div>

          {/* Class Roll */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold ml-1 text-blue-300">
              Class Roll
            </label>
            <input
              type="number"
              {...register('studentRoll', { required: true })}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
              placeholder="01"
            />
          </div>

          {/* Exam Selection */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-semibold ml-1 text-blue-300">
              Select Exam Type
            </label>
            <select
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
              {...register('examOption', { required: true })}
            >
              <option value="" className="bg-slate-900">
                Select Exam Option
              </option>
              <option value="test-1" className="bg-slate-900">
                Test 1
              </option>
              <option value="test-2" className="bg-slate-900">
                Test 2
              </option>
              <option value="final" className="bg-slate-900">
                Final Exam
              </option>
            </select>
          </div>
        </div>

        {/* Dynamic Subject Section */}
        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/10 rounded-xl min-h-[100px]">
          <h3 className="text-lg font-medium mb-4 text-blue-200 border-b border-blue-500/20 pb-2">
            Subject Marks
          </h3>
          {className === 'class-6' && <Class6 register={register} />}
          {className === 'class-7' && <Class7 register={register} />}
          {className === 'class-8' && <Class8 register={register} />}
          {(className === 'class-9' || className === 'class-10') && (
            <Class910 register={register} />
          )}
          {!className && (
            <p className="text-slate-500 text-center italic mt-4">
              Please select a class to enter marks
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-600/30 transform transition-all active:scale-95 uppercase tracking-wider cursor-pointer"
        >
          Submit Result Sheet
        </button>
      </form>
    </div>
  );
};

export default CreateResultSheet;