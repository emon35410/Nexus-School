import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../AuthContext/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { loginUser } = use(AuthContext);
  const navigate=useNavigate()
 
  const handleLogin = (userInfo) => {
    loginUser(userInfo.email, userInfo.password)
      .then(res => {
        toast.success('success');
        navigate('/')
      }).catch(err => {
      console.log(err)
    })
  }
  return (
    <div className="hero bg-base-200 min-h-screen ">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="text-center  mt-4 ">
          <h1 className="text-3xl font-bold">Login now!</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(handleLogin)} className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input type="email" {...register('email', {required:true})} className="input" placeholder="Email" />
            {/* password */}
            <label className="label">Password</label>
            <input type="password" {...register('password',{required:true , minLength:6})} className="input" placeholder="Password" />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary mt-4">Login</button>
          </form>
          <p>don't have an account <Link to='/register' className='link link-hover text-blue-500'>Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;