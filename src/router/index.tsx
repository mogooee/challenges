import { Navigate, BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
import ProducingChart from '../pages/ProducingChart';
import DigitalClock from '../pages/DigitalClock';
import StarRating from '../pages/StarRating';
import Notification from '../pages/Notification';
import PostIt from '../pages/PostIt';
import Presentation from '../pages/Presentation';
import Calculator from '../pages/Calculator';

const Dashboard = () => {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

const Routers = (): React.ReactElement => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<ProducingChart />} />
          <Route path="producing-chart" element={<ProducingChart />} />
          <Route path="digital-clock" element={<DigitalClock />} />
          <Route path="star-rating" element={<StarRating />} />
          <Route path="toast-notification" element={<Notification />} />
          {/* <Route path="presentation" element={<Presentation />} /> */}
          {/* <Route path="calculator" element={<Calculator />} /> */}
          <Route path="post-it" element={<PostIt />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
