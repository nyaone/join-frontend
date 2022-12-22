import { useState } from 'react';
import LoadingModal from '@/component/modal/loadingModal';
import ResultModal from '@/component/modal/resultModal';
import InviteForm from '@/component/invite/inviteForm';
import InviteImage from '@/component/invite/inviteImage';
import InviteHeader from '@/component/invite/inviteHeader';
import type { Result } from '@/component/invite/Result';

const Invite = () => {
  const [isLoading, setLoading] = useState(false);

  const [isShowingResult, setShowingResult] = useState(false);
  const [result, setResult] = useState<Result>({
    success: false,
    message: '',
  });

  return (
    <>
      <main>
        <div className="flex min-h-[100vh]">
          <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <InviteHeader />

              <InviteForm setLoading={setLoading} setResult={setResult} setShowingResult={setShowingResult} />
            </div>
          </div>

          <InviteImage />
        </div>
      </main>

      {/*Result Modal*/}
      <ResultModal
        isOpen={isShowingResult}
        setOpen={setShowingResult}
        success={result.success}
        title={result.success ? '注册成功' : '注册失败惹'}
        onConfirm={() => {
          setShowingResult(false);
          if (result.success) {
            window.open(result.message, '_self');
          }
        }}
      >
        <p className="text-sm text-gray-500">{result.success ? '注册成功，玩得愉快！' : result.message}</p>
      </ResultModal>

      <LoadingModal isOpen={isLoading} />
    </>
  );
};

export default Invite;
