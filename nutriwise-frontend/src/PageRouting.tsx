import {Route, Routes} from 'react-router-dom';
import Landing from './Landing';
import Dashboard from './Dashboard';
export default () => (
  <Routes>
    <Route path="/*" element={<Landing/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
  </Routes>
);
