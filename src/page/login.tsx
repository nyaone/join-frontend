import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/component/header';
import Loading from '@/common/icons/loading';
import { useEffect, useState } from 'react';
import ResultModal from '@/component/resultModal';
import API from '@/common/api';
import { AdminSessionKey, AdminUsernameKey } from '@/common/settings';
import Footer from '@/component/footer';

const Login = () => {
  const { token } = useParams();

  const nav = useNavigate();

  const [isShowingResult, setShowingResult] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    // Do login

    const doLogin = async () => {
      try {
        const session = await API.LoginAPI.Confirm(token!);
        // Save session
        sessionStorage.setItem(AdminSessionKey, session.session);
        sessionStorage.setItem(AdminUsernameKey, session.username);

        // Redirect to admin page
        nav('/admin/codes');
      } catch (e: any) {
        setResult(e.message);
        setShowingResult(true);
      }
    };

    doLogin();
  }, [nav, token]);

  const closeModal = () => {
    setShowingResult(false);
    // Go back home
    nav('/');
  };

  return (
    <>
      <Header />
      <div className="min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center md:py-36 lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              <Loading />
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">正在为您登录，请稍候</h1>
                <p className="mt-1 text-base text-gray-500">
                  如果您在这个页面停留了较长时间，那应该是系统出故障了，也许您可以尝试检查一下浏览器控制台里有没有报错提示？
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />

      {/*Result Modal*/}
      <ResultModal
        isOpen={isShowingResult}
        setOpen={(state) => {
          if (!state) {
            closeModal();
          }
        }}
        success={false}
        title={'登录失败'}
        onConfirm={() => closeModal()}
      >
        <p className="text-sm text-gray-500">{result}</p>
      </ResultModal>
    </>
  );
};

export default Login;
