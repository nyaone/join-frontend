import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/component/header';
import { useCallback, useEffect, useRef, useState } from 'react';
import ResultModal from '@/component/modal/resultModal';
import API from '@/common/api';
import { AdminSessionKey, AdminUsernameKey } from '@/common/settings';
import Footer from '@/component/footer';
import LoginPageBody from '@/component/login/loginPageBody';

const Login = () => {
  const { token } = useParams();

  const nav = useNavigate();

  const [isShowingResult, setShowingResult] = useState(false);
  const [result, setResult] = useState('');

  const nonRequested = useRef(true);

  const doLogin = useCallback(async () => {
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
  }, [nav, token]);

  useEffect(() => {
    // Do login
    if (token && nonRequested.current && doLogin) {
      nonRequested.current = false;
      doLogin();
    }
  }, [doLogin, token]);

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
