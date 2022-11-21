import { useEffect, useRef, useState } from 'react';
import type { Invitee } from '@/common/api/admin';
import API from '@/common/api';
import ResultModal from '@/component/resultModal';
import LoadingModal from '@/component/loadingModal';
import formatTime from '@/common/utils/formatTime';
import { AdminInstanceKey } from '@/common/settings';

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
        // Get instance from sessionStorage
        let instanceUri = sessionStorage.getItem(AdminInstanceKey);
        if (!instanceUri) {
          instanceUri = await API.PublicAPI.Instance();
          sessionStorage.setItem(AdminInstanceKey, instanceUri);
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
        <div className="flex items-center">
          <div className="flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">我邀请的用户</h1>
          </div>
        </div>
        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="table-cell py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  用户名
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  注册时间
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                >
                  使用的邀请码
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {invitees.map((invitee) => (
                <tr
                  key={invitee.username}
                  className="cursor-pointer transition-colors hover:bg-gray-100 sm:bg-transparent"
                  onClick={() => {
                    // Redirect to target user link
                    window.open(instanceUri + '/@' + invitee.username, '_blank');
                  }}
                >
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                    {invitee.username}
                    <dl className="font-normal lg:hidden">
                      <dd className="mt-1 truncate text-gray-700">
                        注册于 {formatTime(invitee.registered_at.toString(), true)}
                      </dd>
                      <dd className="mt-1 truncate text-gray-500 md:hidden">
                        使用的邀请码是 {invitee.invited_by_code}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {formatTime(invitee.registered_at.toString(), true)}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">{invitee.invited_by_code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
