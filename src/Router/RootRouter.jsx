import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/AuthPage/Login";
import Register from "../Pages/AuthPage/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardLayout from "../Layouts/DashboardLayout";
import Notice from "../Pages/Notice/Notice";
import Profile from "../Pages/Profile/Profile";
import NotFound from "../components/NotFound/NotFound";
import NexusLoader from "../components/Nexusloader/Nexusloader";
import ManageUsers from "../Pages/ManageUsers/ManageUsers";
import ViewNotice from "../Pages/Notice/ViewNotice";
import Attendance from "../Pages/Dashboard/Teacher/Attendance";
import AttendanceHistory from "../Pages/Dashboard/Teacher/AttendanceHistory";
import Assignment from "../Pages/TeacherPages/Assignment";
import MyAssignments from "../Pages/StudentPages/MyAssignments";
import ManageStudents from "../Pages/mangeStudent/ManageStudents";
import CreateRoutine from "../Pages/DynamicRoutine/CreateRoutine";
import ClassRoutine from "../Pages/DynamicRoutine/ClassRoutine";
import AdmissionForm from "../Pages/Admission/AdmissionForm";
import AdmissionApplication from "../Pages/AdminAdmissionCheck/AdmissionApplication";
import CreateResultSheet from "../Pages/PublishResultSheet/CreateResultSheet";
import AllTeachers from "../Pages/BookingTeacher/AllTeachers";
import ManageMeetings from "../Pages/ManageMeetings/ManageMeetings";
import ResultSheet from "../Pages/PublishResultSheet/ResultSheet";

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    errorElement: <NotFound></NotFound>,
    hydrateFallbackElement: <NexusLoader></NexusLoader>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/admission',
        Component: AdmissionForm,
      },
      {
        path:"/booking-teachers",
        Component: AllTeachers
      },
      {
        path:"/manage-meetings",
        Component: ManageMeetings
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: '/dashboard/noticepost',
        Component: Notice,
      },
      {
        path: '/dashboard/profile',
        Component: Profile,
      },
      {
      path:"/dashboard/manage-users",
      Component: ManageUsers
    },
    {
      path:"/dashboard/admissions",
      element: <AdmissionApplication></AdmissionApplication>
    },
    {
      path:"/dashboard/notices",
      Component: ViewNotice
    },
    {
      path:"/dashboard/teachersh/Attendance",
      element: <Attendance></Attendance>
    },{
      path:"/dashboard/teachersh/AttendanceHistory",
      element:<AttendanceHistory></AttendanceHistory>
    },
    {
      path:"/dashboard/assignments",
      Component: Assignment
    },
    {
      path:"/dashboard/my-assignments",
      Component: MyAssignments
      },
      {
        path: '/dashboard/manage-student',
        Component:ManageStudents
    },
      {
        path: '/dashboard/create-routine',
        Component:CreateRoutine
    },
      {
        path: '/dashboard/class-routine',
        Component:ClassRoutine
    },
    
      {
        path: '/dashboard/create-result-sheet',
        Component:CreateResultSheet
    },
      {
        path: '/dashboard/result-sheet',
        Component:ResultSheet
    },
    
    ],
  },
]);

export default router;
