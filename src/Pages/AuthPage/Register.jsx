import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../AuthContext/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { userRegister } = use(AuthContext);
  const navigate=useNavigate()

  const handleRegister = userInfo => {
    userRegister(userInfo.email, userInfo.password)
      .then(res => {
        toast.success('success')
       navigate('/')
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen ">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="text-center  mt-4 ">
            <h1 className="text-3xl font-bold">Register now!</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(handleRegister)} className="fieldset">
              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="input"
                placeholder="Email"
              />
              {/* password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register('password', { required: true, minLength: 6 })}
                className="input"
                placeholder="Password"
              />

              <button className="btn btn-primary mt-4">Register</button>
            </form>
            <p>
              already have an account{' '}
              <Link to="/login" className="link link-hover text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
