import type { InviteCode } from '@/common/api/admin';
import { useEffect, useRef, useState } from 'react';
import API from '@/common/api';
import EditCodeModal from '@/component/admin/codes/editCodeModal';
import ResultModal from '@/component/modal/resultModal';
import copyInviteLink from '@/common/utils/copyInviteLink';
import CodesHeader from '@/component/admin/codes/codesHeader';
import type { Result } from '@/component/admin/codes/Result';
import CodesTable from '@/component/admin/codes/codesTable';
import { DefaultCode } from '@/component/admin/codes/DefaultCode';

const AdminCodes = () => {
  const [isLoading, setLoading] = useState(true);
  const isNotLoaded = useRef(true);

  const [inviteCodes, setInviteCodes] = useState<InviteCode[]>([]);
  const [currentEditingCode, setCurrentEditingCode] = useState<InviteCode>(DefaultCode);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreatingNew, setCreatingNew] = useState(false);

  const [isShowingResult, setShowingResult] = useState(false);
  const [result, setResult] = useState<Result>({
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
      {/*Page*/}
      <div className="px-4 sm:px-6 lg:px-8">
        <CodesHeader
          setCurrentEditingCode={setCurrentEditingCode}
          setCreatingNew={setCreatingNew}
          setEditModalOpen={setEditModalOpen}
          isLoading={isLoading}
        />
        {inviteCodes.length > 0 || isLoading ? (
          <CodesTable
            inviteCodes={inviteCodes}
            setCurrentEditingCode={setCurrentEditingCode}
            setCreatingNew={setCreatingNew}
            setEditModalOpen={setEditModalOpen}
            setResult={setResult}
            setShowingResult={setShowingResult}
            isLoading={isLoading}
          />
        ) : (
          <div className={'p-4'}>
            还没有邀请码哦，赶紧
            <span
              className={
                'cursor-pointer px-1 underline decoration-primary decoration-wavy decoration-2 underline-offset-4 transition-colors hover:text-primary'
              }
              onClick={() => setEditModalOpen(true)}
            >
              创建一个
            </span>
            吧！
          </div>
        )}
      </div>

      {/*Modals*/}
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
    </>
  );
};

export default AdminCodes;
