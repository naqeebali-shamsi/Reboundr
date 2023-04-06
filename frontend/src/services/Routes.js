import { Route, Routes as Rt } from 'react-router-dom';
import Profile from '../components/Networking/Profile';
import Registration from '../components/Registration';
import ResetPassword from '../components/ResetPassword';
import LandingPage from '../pages/LandingPage';
import Profilepage from '../pages/Profilepage';
import JobsModule from '../pages/JobsModule';
import Networking from '../pages/Networking';
import Posts from '../pages/Posts';
import InterviewPage from '../pages/InterviewPage';
import QuestionsPage from '../pages/QuestionsPage';
import EvaluationPage from '../pages/EvaluationPage';
import UpdateProfileData from '../pages/UpdateProfileData';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
  return (
    <Rt>
      <Route path="/register" element={<Registration />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/profilepage" element={<ProtectedRoute element={<Profilepage />} />} />
      <Route path="/jobs" element={<ProtectedRoute element={<JobsModule />} />} />
      <Route path="/posts" element={<ProtectedRoute element={<Posts />} />} />
      <Route path="/networking" element={<ProtectedRoute element={<Networking />} />} />
      <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      <Route path="/interview" element={<ProtectedRoute element={<InterviewPage />} />} />
      <Route path="/questions" element={<ProtectedRoute element={<QuestionsPage />} />} />
      <Route path="/evaluation" element={<ProtectedRoute element={<EvaluationPage />} />} />
      <Route path="/updateprofiledata" element={<ProtectedRoute element={<UpdateProfileData />} />} />
    </Rt>
  );
};

export default Routes;
