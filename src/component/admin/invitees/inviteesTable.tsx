import formatTime from '@/common/utils/formatTime';
import { Invitee } from '@/common/api/admin';

interface InviteesTableProps {
  instanceUri: string;
  invitees: Invitee[];
}

const InviteesTableHeader = () => (
  <thead className="bg-gray-50">
    <tr>
      <th scope="col" className="table-cell py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
        用户名
      </th>
      <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
        注册时间
      </th>
      <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">
        使用的邀请码
      </th>
    </tr>
  </thead>
);

const InviteesTable = ({ instanceUri, invitees }: InviteesTableProps) => (
  <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
    <table className="min-w-full divide-y divide-gray-300">
      <InviteesTableHeader />
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
                <dd className="mt-1 truncate text-gray-500 md:hidden">使用的邀请码是 {invitee.invited_by_code}</dd>
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
);

export default InviteesTable;
