import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import ProducingChart from '../pages/ProducingChart';
import DigitalClock from '../pages/DigitalClock';
import StarRating from '../pages/StarRating';
import Presentation from '../pages/Presentation';
import Notification from '../pages/Notification';
import Calculator from '../pages/Calculator';
import PostIt from '../pages/PostIt';
import SideBar from '../components/SideBar';

const Routers = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <SideBar />
      <Routes>
        <Route path="/" element={<ProducingChart />} />
        <Route path="/producing-chart" index element={<ProducingChart />} />
        <Route path="/digital-clock" element={<DigitalClock />} />
        <Route path="/star-rating" element={<StarRating />} />
        {/* <Route path="/presentation" element={<Presentation />} /> */}
        <Route path="/toast-notification" element={<Notification />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/post-it" element={<PostIt />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
