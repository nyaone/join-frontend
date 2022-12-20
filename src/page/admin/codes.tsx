import type { InviteCode, InviteCodeProps } from '@/common/api/admin';
import { useEffect, useRef, useState } from 'react';
import API from '@/common/api';
import { PlusIcon } from '@heroicons/react/24/solid';
import EditCodeModal from '@/component/admin/editCodeModal';
import ResultModal from '@/component/modal/resultModal';
import copyInviteLink from '@/common/utils/copyInviteLink';
import LoadingModal from '@/component/modal/loadingModal';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const DefaultCodeProps: InviteCodeProps = {
  comment: '',
  is_activate: true,
  register_count_limit: 0,
  register_time_start: new Date(),
  register_time_end: new Date(),
  is_register_time_end_valid: false,
  register_cool_down: 0,
};

const DefaultCode: InviteCode = {
  code: '',
  invite_count: 0,
  is_valid: true,
  invalid_reason: '',
  ...DefaultCodeProps,
};

const AdminCodes = () => {
  const [isLoading, setLoading] = useState(true);
  const isNotLoaded = useRef(true);

  const [inviteCodes, setInviteCodes] = useState<InviteCode[]>([]);
  const [currentEditingCode, setCurrentEditingCode] = useState<InviteCode>(DefaultCode);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreatingNew, setCreatingNew] = useState(false);

  const [isShowingResult, setShowingResult] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    title: string;
    message: string;
  }>({
    success: false,
    title: '',
    message: '',
  });

  useEffect(() => {
    const initCodes = async () => {
      try {
        const codes = await API.AdminAPI.CodeList();
        setInviteCodes(codes);
      } catch (e: any) {
        setResult({
          success: false,
          title: '出错啦',
          message: e.message,
        });
        setShowingResult(true);
      }

      setLoading(false);
    };

    if (isNotLoaded.current) {
      isNotLoaded.current = false;
      initCodes();
    }
  }, [isNotLoaded]);

  const saveOrCreateCode = async (isNew: boolean, code: InviteCode) => {
    setLoading(true);

    if (isNew) {
      // Create code with props
      try {
        const newCode = await API.AdminAPI.CodeCreate(code);
        setInviteCodes([...inviteCodes, newCode]);
        await copyInviteLink(newCode.code);
        setResult({
          success: true,
          title: '成功',
          message: `邀请码创建成功！链接已经在剪贴板里啦，快去分享吧`,
        });
      } catch (e: any) {
        setResult({
          success: false,
          title: '出错啦',
          message: e.message,
        });
      }
    } else {
      // Save
      try {
        const updatedCode = await API.AdminAPI.CodeEdit(code.code, code);
        const updatedInviteCodesList = [...inviteCodes];
        updatedInviteCodesList.splice(
          inviteCodes.findIndex((code) => code.code === updatedCode.code),
          1,
          updatedCode,
        );
        setInviteCodes(updatedInviteCodesList);
        setResult({
          success: true,
          title: '成功',
          message: `邀请码设置已更新`,
        });
      } catch (e: any) {
        setResult({
          success: false,
          title: '出错啦',
          message: e.message,
        });
      }
    }

    setLoading(false);
    setShowingResult(true);
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">我的邀请码</h1>
          </div>
          <div className="sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto"
              onClick={() => {
                setCurrentEditingCode(DefaultCode);
                setCreatingNew(true);
                setEditModalOpen(true);
              }}
            >
              <PlusIcon className={'h-5 w-5'} />
            </button>
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
                  邀请码
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  备注
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                >
                  邀请人数
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  状态
                </th>
              </tr>
            </thead>
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
      </div>

      <EditCodeModal
        code={currentEditingCode}
        isCreatingNew={isCreatingNew}
        isOpen={isEditModalOpen}
        setOpen={setEditModalOpen}
        doSave={saveOrCreateCode}
      />
      <ResultModal
        success={result.success}
        title={result.title}
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

export default AdminCodes;
