// import { useContext } from "react";
// import { AuthContext } from "../context/AuthProvider";
// import StudentPanel from "./StudentPanel";
// import AdminPanel from "./AdminPanel";
// import TeacherPanel from "./TeacherPanel";

import { NavLink, Link, useNavigate } from "react-router";

const Dashboard = () => {
  //   const { user } = useContext(AuthContext);

  // Assume user.role = "student" | "admin" | "teacher"

  //   const renderPanel = () => {
  //     // if (user?.role === "admin") return <AdminPanel />;
  //     // if (user?.role === "teacher") return <TeacherPanel />;
  //     // return <StudentPanel />;
  //   };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-base-200 p-5 hidden md:block">
        <Link to="/" className="text-2xl font-bold mb-6">
          Nexus-<span className="text-primary">School</span>
        </Link>
        <ul className="menu space-y-2">
          <li>
            <a>Dashboard</a>
          </li>

          {/* {user?.role === "admin" && (
            <>
              <li>
                <a>Manage Users</a>
              </li>
              <li>
                <a>Manage Classes</a>
              </li>
            </>
          )}

          {user?.role === "teacher" && (
            <>
              <li>
                <a>My Classes</a>
              </li>
              <li>
                <a>Assignments</a>
              </li>
            </>
          )}

          {user?.role === "student" && (
            <>
              <li>
                <a>My Courses</a>
              </li>
              <li>
                <a>Results</a>
              </li>
            </>
          )} */}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow">
          <h1 className="text-xl font-semibold">Welcome, </h1>
          {/* {user?.name} */}
          <button className="btn btn-sm btn-error">Logout</button>
        </div>

        {/* Role Based Panel */}
        {/* {renderPanel()} */}
      </div>
    </div>
  );
};

export default Dashboard;
