import { useParams } from 'react-router-dom';
import IntroBanner from '@/asset/intro-banner.png';
import NyaOneLogo from '@/asset/NyaOneLogo';
import { useEffect, useState } from 'react';
import API from '@/common/api';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import LoadingModal from '@/component/loadingModal';
import Loading from '@/common/icons/loading';
import ResultModal from '@/component/resultModal';

const Invite = () => {
  const { code } = useParams();

  const [isLoading, setLoading] = useState(false);

  const [isValidatingInviteCode, setValidatingInviteCode] = useState(false);
  const [isInviteCodeValid, setInviteCodeValid] = useState(false);

  const [isValidatingUsername, setValidatingUsername] = useState(false);
  const [isUsernameValidated, setUsernameValidated] = useState(false);
  const [isUsernameValid, setUsernameValid] = useState(false);

  const [inviteCode, setInviteCode] = useState(code);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isShowingResult, setShowingResult] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  }>({
    success: false,
    message: '',
  });

  const validateUsername = async () => {
    if (!username) {
      setUsernameValid(false);
      return;
    }

    setValidatingUsername(true);

    if (await API.InviteeAPI.UsernameCheck(username)) {
      setUsernameValid(true);
    } else {
      setUsernameValid(false);
    }

    setValidatingUsername(false);
    setUsernameValidated(true);
  };

  const doRegister = async () => {
    if (!inviteCode || !isInviteCodeValid || !username || !isUsernameValidated || !isUsernameValid) {
      // Invalid invite code
      return;
    }

    setLoading(true);

    try {
      const instanceUri = await API.PublicAPI.Instance();
      await API.InviteeAPI.Register(inviteCode, username, password);
      setResult({
        success: true,
        message: instanceUri,
      });
    } catch (e: any) {
      setResult({
        success: false,
        message: e.message,
      });
    }

    setShowingResult(true);
    setLoading(false);
  };

  useEffect(() => {
    const validateInviteCode = async () => {
      setValidatingInviteCode(true);

      if (
        inviteCode &&
        /^\w{8}(?:-\w{4}){3}-\w{12}$/.test(inviteCode) && // Check format (UUID)
        (await API.InviteeAPI.CodeCheck(inviteCode)) // Check in API
      ) {
        // Code is valid
        setInviteCodeValid(true);
      } else {
        // Invalid
        setInviteCodeValid(false);
      }

      setValidatingInviteCode(false);
    };

    validateInviteCode();
  }, [code, inviteCode]);

  return (
    <>
      <main>
        <div className="flex min-h-[100vh] overflow-hidden">
          <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <NyaOneLogo className={'h-12 w-auto text-primary'} />
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">加入喵窝</h2>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <div className={'mt-4'}>
                    <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700">
                      邀请码
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        name="inviteCode"
                        id="inviteCode"
                        className={`block w-full rounded-md pr-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm ${
                          isValidatingInviteCode
                            ? 'border-primary'
                            : isInviteCodeValid
                            ? 'border-green-300 text-green-900'
                            : 'border-red-300 text-red-900'
                        } disabled:bg-gray-50`}
                        aria-invalid={!isValidatingInviteCode && !isInviteCodeValid}
                        value={inviteCode}
                        onChange={(ev) => setInviteCode(ev.target.value)}
                        disabled={isValidatingInviteCode || isInviteCodeValid || isLoading}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        {isValidatingInviteCode ? (
                          <Loading className="h-5 w-5 text-primary" aria-hidden="true" />
                        ) : isInviteCodeValid ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                        ) : (
                          <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={'mt-4'}>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      用户名
                    </label>
                    <div className="relative mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                        @
                      </span>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className={`block w-full rounded-none rounded-r-md pr-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm ${
                          !isUsernameValidated
                            ? 'border-gray-300'
                            : isValidatingUsername
                            ? 'border-primary'
                            : isUsernameValid
                            ? 'border-green-300 text-green-900'
                            : 'border-red-300 text-red-900'
                        } disabled:bg-gray-50`}
                        aria-invalid={isUsernameValidated && !isValidatingUsername && !isUsernameValid}
                        minLength={1}
                        maxLength={20}
                        value={username}
                        onChange={(ev) => {
                          const newUsername = ev.target.value;
                          const filteredUsername = newUsername.replace(/\W/g, ''); // Remove all not \w chat
                          setUsername(filteredUsername);
                        }}
                        disabled={isLoading}
                        onBlur={() => validateUsername()}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        {isValidatingUsername ? (
                          <Loading className="h-5 w-5 text-primary" aria-hidden="true" />
                        ) : (
                          isUsernameValidated &&
                          (isUsernameValid ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                          ) : (
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={'mt-4'}>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      密码
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className="sm:text-smdisabled:border-gray-200 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary disabled:bg-gray-50 disabled:text-gray-500"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className={'mt-6'}>
                    <button
                      type="button"
                      className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-deeper focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-deeper"
                      disabled={
                        isValidatingInviteCode ||
                        !isInviteCodeValid ||
                        isValidatingUsername ||
                        !isUsernameValid ||
                        !password ||
                        isLoading
                      }
                      onClick={() => doRegister()}
                    >
                      出发！
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden w-0 flex-1 lg:block">
            <img className="absolute inset-0 h-full w-full object-cover" src={IntroBanner} alt="NyaOne Cats" />
          </div>
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
