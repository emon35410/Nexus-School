import { useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useRole from "../../Hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import AdminProfile from "./AdminProfile";
import TeacherProfile from "./TeacherProfile";
import StudentProfile from "./StudentProfile";
import NexusLoader from "../../components/Nexusloader/Nexusloader";


const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [role, roleLoading] = useRole();

  const { data: dbUser, isLoading, refetch } = useQuery({
    queryKey: ['userProfile', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading || roleLoading) return <NexusLoader/>;

  // রোল অনুযায়ী কম্পোনেন্ট পাঠানো হচ্ছে
  if (role === 'admin') return <AdminProfile dbUser={dbUser} refetch={refetch} />;
  if (role === 'teacher') return <TeacherProfile dbUser={dbUser} refetch={refetch} />;
  
  return <StudentProfile dbUser={dbUser} refetch={refetch} />;
};

export default Profile;