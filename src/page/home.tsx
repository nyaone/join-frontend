import Header from '@/component/header';
import Hero from '@/component/home/hero';
import Footer from '@/component/footer';
import ResultModal from '@/component/modal/resultModal';
import { useEffect, useState } from 'react';
import LoadingModal from '@/component/modal/loadingModal';
import API from '@/common/api';
import { useNavigate } from 'react-router-dom';
import { AdminSessionKey } from '@/common/settings';

const Home = () => {
  const nav = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [isShowingResult, setShowingResult] = useState(false);
  const [result, setResult] = useState<string>('');

  const [isSessionExist, setSessionExist] = useState(false);

  const doLogin = async () => {
    setLoading(true);
    if (isSessionExist) {
      // Validate saved session
      try {
        await API.AdminAPI.SessionCheck();
        nav('/admin/codes');
        return;
      } catch (e) {
        // Token is invalid, remove it
        localStorage.removeItem(AdminSessionKey);
      }
    }

    // Request new login session
    try {
      const authLink = await API.LoginAPI.Request();
      window.open(authLink, '_self');
    } catch (e: any) {
      setResult(e.message);
      setShowingResult(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Check if session exists
    if (localStorage.getItem(AdminSessionKey)) {
      setSessionExist(true);
    }
  }, []);

  return (
    <main>
      <Header />
      <Hero doLogin={doLogin} isSessionExist={isSessionExist} />
      <Footer />

      <LoadingModal isOpen={isLoading} />

      {/*Result Modal*/}
      <ResultModal
        isOpen={isShowingResult}
        setOpen={setShowingResult}
        success={false}
        title={'出错啦'}
        onConfirm={() => {
          setShowingResult(false);
        }}
      >
        <p className="text-sm text-gray-500">{result}</p>
      </ResultModal>
    </main>
  );
};

export default Home;
