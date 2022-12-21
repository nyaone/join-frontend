import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import API from '@/common/api';
import { Dialog } from '@headlessui/react';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import Loading from '@/common/icons/loading';
import ResultModal from '@/component/modal/resultModal';
import ModalWrapper from '@/component/modal/modalWrapper';

interface LoginModalProps {
  isLoginModalOpen: boolean;
  setLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginModal = ({ isLoginModalOpen, setLoginModalOpen }: LoginModalProps) => {
  const [isLoading, setLoading] = useState(false);
  const [isShowingResult, setShowingResult] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  }>({
    success: false,
    message: '',
  });

  const doLogin = async (ev: any) => {
    ev.preventDefault();

    setLoading(true);
    try {
      const messagingLink = await API.LoginAPI.Request(ev.target.username.value);
      setResult({
        success: true,
        message: messagingLink,
      });
      setLoginModalOpen(false);
    } catch (e: any) {
      setResult({
        success: false,
        message: e.message,
      });
    }
    setShowingResult(true);
    setLoading(false);
  };

  return (
    <>
      <ModalWrapper
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        className={'sm:w-full sm:max-w-sm'}
      >
        <form onSubmit={doLogin}>
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
              <RocketLaunchIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                请输入您在喵窝的用户名
              </Dialog.Title>
              <div className="mt-2">
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-primary focus:ring-primary disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm sm:text-sm"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="submit"
              className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:text-sm ${
                isLoading ? 'cursor-progress bg-primary' : 'bg-primary hover:bg-deeper'
              }`}
              disabled={isLoading}
            >
              {isLoading ? <Loading className={'my-auto h-5 w-5'} /> : <span>开始</span>}
            </button>
          </div>
        </form>
      </ModalWrapper>

      {/*Result Modal*/}
      <ResultModal
        isOpen={isShowingResult}
        setOpen={setShowingResult}
        success={result.success}
        title={result.success ? '发送成功' : '发送失败'}
        onConfirm={() => {
          setShowingResult(false);
          if (result.success) {
            window.open(result.message, '_self');
          }
        }}
      >
        <p className="text-sm text-gray-500">{result.success ? '现在就去私聊看看吧！' : result.message}</p>
      </ResultModal>
    </>
  );
};

export default LoginModal;
