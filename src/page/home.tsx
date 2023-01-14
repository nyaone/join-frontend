import Header from '@/component/header';
import Hero from '@/component/home/hero';
import Footer from '@/component/footer';
import ResultModal from '@/component/modal/resultModal';
import { useCallback, useEffect, useState } from 'react';
import LoadingModal from '@/component/modal/loadingModal';
import API from '@/common/api';
import { useNavigate } from 'react-router-dom';
import { AdminSessionKey } from '@/common/settings';

const Home = () => {
  const nav = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [isShowingResult, setShowingResult] = useState(false);
  const [result, setResult] = useState<string>('');

  const doLogin = async () => {
    setLoading(true);
    try {
      const authLink = await API.LoginAPI.Request();
      window.open(authLink, '_self');
    } catch (e: any) {
      setResult(e.message);
      setShowingResult(true);
      setLoading(false);
    }
  };

  const checkSession = useCallback(async () => {
    try {
      await API.AdminAPI.SessionCheck();
      nav('/admin/codes');
    } catch (e) {
      // Token is invalid
      localStorage.removeItem(AdminSessionKey);
    }
  }, [nav]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <main>
      <Header />
      <Hero doLogin={doLogin} />
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
