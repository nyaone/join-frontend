import { Route, Routes } from 'react-router-dom';
import AdminCodes from '@/page/admin/codes';
import AdminInvitees from '@/page/admin/invitees';
import AdminLayout from '@/component/admin/layout';

const AdminPages = () => (
  <AdminLayout>
    <Routes>
      <Route path={'/codes'} element={<AdminCodes />} />
      <Route path={'/invitees'} element={<AdminInvitees />} />
    </Routes>
  </AdminLayout>
);

export default AdminPages;
