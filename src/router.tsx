import { Route, Routes } from 'react-router-dom';

import Home from '@/page/home';
import Invite from '@/page/invite';
import Login from '@/page/login';
import NotFound from '@/page/404';
import AdminPages from '@/page/admin';

const Router = () => (
  <Routes>
    {/*For everyone*/}
    <Route path={'/'} element={<Home />} />

    {/*For new invitees only*/}
    <Route path={'/invite/:code'} element={<Invite />} />

    {/*For users only*/}
    <Route path={'/login'} element={<Login />} />

    {/*Admin Pages*/}
    <Route path={'/admin/*'} element={<AdminPages />} />

    {/*404 Fallback*/}
    <Route path={'*'} element={<NotFound />} />
  </Routes>
);

export default Router;
