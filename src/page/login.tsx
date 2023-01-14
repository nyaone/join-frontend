import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/component/header';
import { useCallback, useEffect, useRef, useState } from 'react';
import ResultModal from '@/component/modal/resultModal';
import API from '@/common/api';
import { AdminInfoKey, AdminSessionKey } from '@/common/settings';
import Footer from '@/component/footer';
import LoginPageBody from '@/component/login/loginPageBody';

const Login = () => {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isShowingResult, setShowingResult] = useState(false);
  const [result, setResult] = useState('');

  const nonRequested = useRef(true);

  const doLogin = useCallback(
    async (token: string | null) => {
      try {
        if (!token) {
          throw new Error('Necessary token not found.');
        }

        const session = await API.LoginAPI.Confirm(token);
        // Save session
        localStorage.setItem(AdminSessionKey, session.session);
        localStorage.setItem(
          AdminInfoKey,
          JSON.stringify({
            name: session.name || session.username,
            avatar: session.avatar,
          }),
        );

        // Clear search params
        setSearchParams(new URLSearchParams());

        // Redirect to admin page
        nav('/admin/codes');
      } catch (e: any) {
        setResult(e.message);
        setShowingResult(true);
      }
    },
    [nav, setSearchParams],
  );

  useEffect(() => {
    // Do login
    if (doLogin && searchParams && nonRequested.current) {
      nonRequested.current = false;

      const token = searchParams.get('token');

      doLogin(token);
    }
  }, [doLogin, searchParams]);

  const closeModal = () => {
    setShowingResult(false);
    // Go back home
    nav('/');
  };

  return (
    <>
      <Header />
      <LoginPageBody />
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
