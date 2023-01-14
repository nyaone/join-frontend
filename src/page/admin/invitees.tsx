import { useEffect, useRef, useState } from 'react';
import type { Invitee } from '@/common/api/admin';
import API from '@/common/api';
import ResultModal from '@/component/modal/resultModal';
import LoadingModal from '@/component/modal/loadingModal';
import { AdminInstanceKey } from '@/common/settings';
import InviteesTable from '@/component/admin/invitees/inviteesTable';
import Loading from '@/common/icons/loading';

const AdminInviteesHeader = () => (
  <div className="flex items-center">
    <div className="flex-auto">
      <h1 className="text-xl font-semibold text-gray-900">我邀请的用户</h1>
    </div>
  </div>
);

const AdminInvitees = () => {
  const [isLoading, setLoading] = useState(true);
  const isNotLoaded = useRef(true);

  const [invitees, setInvitees] = useState<Invitee[]>([]);

  const [instanceUri, setInstanceUri] = useState('');

  const [isShowingResult, setShowingResult] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  }>({
    success: false,
    message: '',
  });

  useEffect(() => {
    const initInvitees = async () => {
      try {
        // Get instance from localStorage
        let instanceUri = localStorage.getItem(AdminInstanceKey);
        if (!instanceUri) {
          instanceUri = await API.PublicAPI.Instance();
          localStorage.setItem(AdminInstanceKey, instanceUri);
        }
        setInstanceUri(instanceUri);

        const ines = await API.AdminAPI.InviteeList();
        setInvitees(ines);
      } catch (e: any) {
        setResult({
          success: false,
          message: e.message,
        });
        setShowingResult(true);
      }

      setLoading(false);
    };

    if (isNotLoaded.current) {
      isNotLoaded.current = false;
      initInvitees();
    }
  }, [isNotLoaded]);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <AdminInviteesHeader />
        {invitees.length > 0 ? (
          <InviteesTable instanceUri={instanceUri} invitees={invitees} />
        ) : (
          <div className={'p-4'}>{isLoading ? <>正在努力加载中...</> : <>还没有找到伙伴哦，快去发出邀请吧！</>}</div>
        )}
      </div>

      <ResultModal
        success={result.success}
        title={result.success ? '成功' : '出错啦'}
        onConfirm={() => setShowingResult(false)}
        isOpen={isShowingResult}
        setOpen={setShowingResult}
      >
        {result.message}
      </ResultModal>

      <LoadingModal isOpen={isLoading} />
    </>
  );
};

export default AdminInvitees;
