import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/AuthPage/Login';
import Register from '../Pages/AuthPage/Register';
import Dashboard from '../Pages/Dashboard/Dashboard';
import DashboardLayout from '../Layouts/DashboardLayout';
import Notice from '../Pages/Notice/Notice';
import Profile from '../Pages/Profile/Profile';
import NotFound from '../components/NotFound/NotFound';
import NexusLoader from '../components/Nexusloader/Nexusloader';
import ManageUsers from '../Pages/ManageUsers/ManageUsers';
import ViewNotice from '../Pages/Notice/ViewNotice';
import Attendance from '../Pages/Dashboard/Teacher/Attendance';
import AttendanceHistory from '../Pages/Dashboard/Teacher/AttendanceHistory';
import Assignment from '../Pages/TeacherPages/Assignment';
import MyAssignments from '../Pages/StudentPages/MyAssignments';
import ManageStudents from '../Pages/mangeStudent/ManageStudents';
import CreateRoutine from '../Pages/DynamicRoutine/CreateRoutine';
import ClassRoutine from '../Pages/DynamicRoutine/ClassRoutine';
import AdmissionForm from '../Pages/Admission/AdmissionForm';
import AdmissionApplication from '../Pages/AdminAdmissionCheck/AdmissionApplication';
import CreateResultSheet from '../Pages/PublishResultSheet/CreateResultSheet';
import ExamShedule from '../Pages/TeacherPages/ExamShedule';
import AllTeachers from '../Pages/BookingTeacher/AllTeachers';
import ManageMeetings from '../Pages/ManageMeetings/ManageMeetings';
import About from '../Pages/Home/About/About';
import Contact from '../components/Home/Contact';
import ResultSheet from '../Pages/PublishResultSheet/ResultSheet';
import StudentResult from '../Pages/PublishResultSheet/StudentResult';
import UpdateRoutine from '../Pages/DynamicRoutine/UpdateRoutine';
import MyExamSchedule from '../Pages/StudentPages/MyExamSchedule';
import MyCourse from '../Pages/MyCourse/MyCourse';
import StudentGiveResult from '../Pages/PublishResultSheet/StudentGiveResult';
import PrivateRoutes from './PrivetRoute/PrivateRoutes';
import AdminPrivetRoute from './PrivetRoute/AdminPrivetRoute';
import TeacherPrivRoute from './PrivetRoute/TeacherPrivRoute';
import StudentPrivRoute from './PrivetRoute/StudentPrivRoute';

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
        path: '/booking-teachers',
        Component: AllTeachers,
      },
      {
        path: '/manage-meetings',
        Component: ManageMeetings,
      },
      {
        path: '/result-sheet',
        Component: ResultSheet,
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: 'contact',
        Component: Contact,
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
        element: (
          <PrivateRoutes>
            <Dashboard></Dashboard>
          </PrivateRoutes>
        ),
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
        path: '/dashboard/manage-users',
        element: (
          <PrivateRoutes>
            <ManageUsers></ManageUsers>
          </PrivateRoutes>
        ),
      },
      {
        path: '/dashboard/admissions',
        element: <AdmissionApplication></AdmissionApplication>,
      },
      {
        path: '/dashboard/notices',
        Component: ViewNotice,
      },
      {
        path: '/dashboard/teachersh/Attendance',
        element: <Attendance></Attendance>,
      },
      {
        path: '/dashboard/teachersh/AttendanceHistory',
        element: <AttendanceHistory></AttendanceHistory>,
      },
      {
        path: '/dashboard/assignments',
        Component: Assignment,
      },
      {
        path: '/dashboard/my-assignments',
        Component: MyAssignments,
      },
      {
        path: '/dashboard/manage-student',
        element: (
         <TeacherPrivRoute>
              <ManageStudents></ManageStudents>
            </TeacherPrivRoute>
          
        ),
      },
      {
        path: '/dashboard/exam-schedule',
        Component: ExamShedule,
      },
      {
        path: '/dashboard/create-routine',
        element: (
         <AdminPrivetRoute>
              <CreateRoutine></CreateRoutine>
            </AdminPrivetRoute>
         
        ),
      },
      {
        path: '/dashboard/class-routine',
        element: (<StudentPrivRoute>
              <ClassRoutine></ClassRoutine>
            </StudentPrivRoute>
          
        ),
      },

      {
        path: '/dashboard/student-give-result',
        Component: StudentGiveResult,
      },
      {
        path: '/dashboard/student-give-result/:id',
        Component: CreateResultSheet,
      },
      {
        path: '/dashboard/student-result',
        Component: StudentResult,
      },

      {
        path: '/dashboard/check-routine',
        Component: UpdateRoutine,
      },
      {
        path: '/dashboard/my-exam-schedule',
        Component: MyExamSchedule,
      },
      {
        path: '/dashboard/my-courses',
        Component: MyCourse,
      },
    ],
  },
]);

export default router;
