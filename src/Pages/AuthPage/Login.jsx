import React, { use } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../AuthContext/AuthContext";
import { toast } from "react-toastify";
import SocialLogin from "../../components/Shared/SocialLogin";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { loginUser } = use(AuthContext);
  const navigate = useNavigate();

  // const handleLogin = (userInfo) => {
  //   loginUser(userInfo.email, userInfo.password)
  //     .then((res) => {
  //       toast.success("success");
  //       navigate("/");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl border border-base-200 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-center text-white">
          <h3 className="text-3xl font-black tracking-tight mb-2">
            Nexus-School
          </h3>
          <p className="text-blue-50 opacity-90 font-medium">
            Login to your School
          </p>
        </div>

        <div className="card-body p-8 pt-6">
          <form className="space-y-4">
            {/* onSubmit={handleSubmit(handleLogin)} */}
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email Address</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`input input-bordered focus:input-primary w-full `} //${errors.email ? "input-error" : ""}
                placeholder="name@example.com"
              />
              {/* {errors.email && (
                <span className="text-error text-xs mt-1">
                  {errors.email.message}
                </span>
              )} */}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label flex justify-between">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                })}
                className={`input input-bordered focus:input-primary w-full`}
                placeholder="••••••••"
              />
              {/* {errors.password && (
                <span className="text-error text-xs mt-1">
                  {errors.password.message}
                </span>
              )} */}
            </div>
            <div>
              <a className="link link-hover underline">Forgot password?</a>
            </div>
            {/* Login Button */}
            <button className="btn btn-primary btn-block text-white font-bold mt-2">
              Sign In
            </button>
          </form>
        </div>
        {/* Social Login */}
        <SocialLogin></SocialLogin>

        <p className="text-center text-sm mt-4 pb-3">
          New to <span className="font-semibold">Nexus-School? </span>
          <Link
            state={location.state}
            className="text-primary font-bold hover:underline"
            to="/register"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
