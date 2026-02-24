// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";

const SocialLogin = () => {
  // const { signInGoogle } = useAuth();
  // const axiosSecure = useAxiosSecure();
  // const location = useLocation();
  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);

  // const handleGoogleSignIn = async () => {
  //   // setLoading(true);
  //   try {
  //     // const result = await signInGoogle();

  //     const userInfo = {
  //       email: result.user?.email,
  //       displayName: result.user?.displayName,
  //       photoURL: result.user?.photoURL,
  //       role: "student", // Default role for new social logins
  //       createdAt: new Date(),
  //     };

  //     // Store user in DB
  //     const res = await axiosSecure.post("/users", userInfo);

  //     Swal.fire({
  //       position: "top-end",
  //       icon: "success",
  //       title: `Welcome, ${result.user?.displayName}!`,
  //       showConfirmButton: false,
  //       timer: 1500,
  //       toast: true,
  //     });

  //     // Navigate to the intended page or home
  //     const from = location.state?.from?.pathname || "/";
  //     navigate(from, { replace: true });
  //   } catch (error) {
  //     console.error("Google Sign In Error:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Login Failed",
  //       text: "Could not authenticate with Google. Please try again.",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="w-full px-4 pb-6 ">
      <div className="divider opacity-50 text-xs font-bold uppercase tracking-widest">
        Or Continue With
      </div>

      <button
        // onClick={handleGoogleSignIn}
        // disabled={loading}
        className={`btn btn-outline w-full rounded-xl border-base-300 normal-case 
          font-bold gap-3 transition-all duration-300 
          hover:bg-base-200 hover:text-base-content ml-1 mr-1
          `}
      >
        {/* {!loading && ( */}
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
        {/* )} */}
        {/* {loading ? "Authenticating..." : "Sign in with Google"} */}
      </button>

      <p className="mt-4 text-[10px] text-center opacity-40 leading-relaxed px-6">
        By continuing, you agree to Nexus-School's
        <span className="underline cursor-pointer ml-1">Terms of Service</span>.
      </p>
    </div>
  );
};

export default SocialLogin;
