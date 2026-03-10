import React from 'react';
import { useForm } from 'react-hook-form';
import Class6 from './Class6';
import Class7 from './Class7';
import Class8 from './Class8';
import Class910 from './Class910';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const CreateResultSheet = () => {
  const { register, handleSubmit, watch } = useForm()
  const className = watch('ClassName');
  const axiosSecure=useAxiosSecure()

  const handleSubmitResult = (resultData) => {
    if (!resultData?.studentRoll) {
      toast.info('add studentRoll')
      return
    }
    axiosSecure.post('/result',resultData).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  
  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSubmitResult)}
        className=" bg-blue-900  md:max-w-[700px] rounded-xl mx-auto p-4 w-full"
      >
        <fieldset className=" fieldset">
          {/* student name */}
          <label className="label">Student Name</label>
          <input
            type="text"
            {...register('studentName', { required: true })}
            className="input text-blue-600 w-full"
            placeholder="input student name"
          />
          {/* student class roll */}
          <label className="label">Class Roll</label>
          <input
            type="number"
            {...register('studentRoll', { required: true })}
            className="input text-blue-600 w-full"
            placeholder="input student class roll"
          />
          {/* student class Name */}
          <label className="label">Class Name</label>
          <select
            className="select text-blue-600 w-full"
            {...register('ClassName', { required: true })}
          >
            <option value={''}>Select Class</option>
            <option value={'class-6'}>Class 6</option>
            <option value={'class-7'}>Class 7</option>
            <option value={'class-8'}>Class 8</option>
            <option value={'class-9'}>Class 9</option>
            <option value={'class-10'}>Class 10</option>
          </select>
          {/* student class Name */}
          <label className="label ">Select Exam</label>
          <select
            className="select text-blue-600 w-full"
            {...register('examOption', { required: true })}
          >
            <option value={''}>Select Exam Option</option>
            <option value={'test-1'}>Test 1</option>
            <option value={'test-2'}>Test 2</option>
            <option value={'final'}>Final Exam</option>
          </select>
          {/* student Student Email */}
          <label className="label">Student Email</label>
          <input
            type="email"
            {...register('studentEmail', { required: true })}
            className="input text-blue-600 w-full"
            placeholder="input student Email"
          />
        </fieldset>

        {/*  class base subject filed show */}
        <div>
          {className === 'class-6' && <Class6 register={register}></Class6>}
          {className === 'class-7' && <Class7 register={register}></Class7>}
          {className === 'class-8' && <Class8 register={register}></Class8>}
          {(className === 'class-9' || className === 'class-10') && (
            <Class910 register={register}></Class910>
          )}
        </div>

        <button className=' btn my-2 w-full'>Submit</button>
      </form>
    </div>
  );
};

export default CreateResultSheet;