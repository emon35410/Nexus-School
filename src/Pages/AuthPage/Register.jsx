import React, { use } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../AuthContext/AuthContext";
// import { toast } from "react-toastify";
import SocialLogin from "../../components/Shared/SocialLogin";
import toast from "react-hot-toast";

const Register = () => {
  const { register, handleSubmit, formState:{errors} } = useForm();
  const { userRegister } = use(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (userInfo) => {
    userRegister(userInfo.email, userInfo.password)
      .then(res => {
        toast.success('success')
       navigate('/')
      })
      .catch(err => {
        toast.error(err.message)
      });
    
    

    console.log(userInfo)
  };
  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl border border-base-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-center text-white">
          <h3 className="text-3xl font-black tracking-tight mb-2">
            Nexus-School
          </h3>
          <p className="text-blue-50 opacity-90 font-medium">
            Register in your school
          </p>
        </div>
        <form
          className="card-body my-0 py-0"
          onSubmit={handleSubmit(handleRegister)}
        >
          <fieldset className="fieldset">
            {/* name field */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input w-full"
              placeholder="Your Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required.</p>
            )}

            {/* photo image field */}
            <label className="label">Photo</label>

            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input w-full"
              placeholder="Your Photo"
            />

            {errors.name?.type === "required" && (
              <p className="text-red-500">Photo is required.</p>
            )}

            {/* email field */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required.</p>
            )}

            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
              })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 font-semibold italic">
                Password is required.
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 font-semibold italic">
                Password must be 6 characters or longer
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 font-semibold italic">
                Password must have at least one uppercase, at least one
                lowercase, at least one number, and at least one special
                characters
              </p>
            )}

            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
          <p className="font-semibold text-xs">
            Already have an account?{" "}
            <Link
              state={location.state}
              className="text-blue-400 underline"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
