import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import type { InviteCode } from '@/common/api/admin';
import type { Result } from '@/component/admin/codes/Result';

interface CodesTableProps {
  inviteCodes: InviteCode[];
  setCurrentEditingCode: (state: InviteCode) => void;
  setCreatingNew: (state: boolean) => void;
  setEditModalOpen: (state: boolean) => void;
  setResult: (state: Result) => void;
  setShowingResult: (state: boolean) => void;
}

const CodesTableHeader = () => (
  <thead className="bg-gray-50">
    <tr>
      <th scope="col" className="table-cell py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
        邀请码
      </th>
      <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
        备注
      </th>
      <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">
        邀请人数
      </th>
      <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
        状态
      </th>
    </tr>
  </thead>
);

const CodesTable = ({
  inviteCodes,
  setCurrentEditingCode,
  setCreatingNew,
  setEditModalOpen,
  setResult,
  setShowingResult,
}: CodesTableProps) => (
  <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
    <table className="min-w-full divide-y divide-gray-300">
      <CodesTableHeader />
      <tbody className="divide-y divide-gray-200 bg-white">
        {inviteCodes.map((code) => (
          <tr
            key={code.code}
            className="cursor-pointer transition-colors hover:bg-gray-100"
            onClick={() => {
              setCurrentEditingCode(code);
              setCreatingNew(false);
              setEditModalOpen(true);
            }}
          >
            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
              {code.code}
              <dl className="font-normal lg:hidden">
                <dd className="mt-1 truncate text-gray-700">{code.comment}</dd>
                <dd className="mt-1 truncate text-gray-500 md:hidden">邀请了 {code.invite_count} 人</dd>
                <dd className="mt-1 truncate sm:hidden">
                  {code.is_valid ? (
                    <span className="text-green-500">有效的</span>
                  ) : (
                    <span className="text-red-500">失效原因： {code.invalid_reason}</span>
                  )}
                </dd>
              </dl>
            </td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{code.comment}</td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">{code.invite_count}</td>
            <td
              className={`hidden px-3 py-4 text-sm text-gray-500 transition-colors sm:table-cell ${
                code.is_valid ? 'text-green-500 hover:text-green-300' : 'text-red-500 hover:text-red-300'
              }`}
              onClick={(ev) => {
                ev.stopPropagation();

                setResult({
                  success: code.is_valid,
                  title: code.is_valid ? '邀请码是有效的' : '邀请码已失效',
                  message: code.is_valid ? '邀请码没问题，快去分享吧' : code.invalid_reason,
                });

                setShowingResult(true);
              }}
            >
              {code.is_valid ? <CheckCircleIcon className={'h-6 w-6'} /> : <XCircleIcon className={'h-6 w-6'} />}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CodesTable;
