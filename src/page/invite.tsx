import { useParams } from 'react-router-dom';
import IntroBanner from '@/asset/intro-banner.png';
import NyaOneLogo from '@/asset/NyaOneLogo';
import { useEffect, useState } from 'react';
import API from '@/common/api';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import LoadingModal from '@/component/loadingModal';
import Loading from '@/common/icons/loading';
import ResultModal from '@/component/resultModal';
import { CodeCheckResult } from '@/common/api/invitee';
import { ToSLink } from '@/common/settings';

const Invite = () => {
  const { code } = useParams();

  const [isLoading, setLoading] = useState(false);

  const [isValidatingInviteCode, setValidatingInviteCode] = useState(false);
  const [isInviteCodeValid, setInviteCodeValid] = useState<CodeCheckResult>({
    valid: false,
    reason: '未初始化',
  });

  const [isValidatingUsername, setValidatingUsername] = useState(false);
  const [isUsernameValidated, setUsernameValidated] = useState(false);
  const [isUsernameValid, setUsernameValid] = useState(false);

  const [inviteCode, setInviteCode] = useState(code);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordSame, setPasswordSame] = useState(false);
  const [isPasswordChecked, setPasswordChecked] = useState(false);

  const [isAcceptToS, setAcceptToS] = useState(false);

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

  const checkPasswordSame = () => {
    if (password === '' || confirmPassword === '') {
      // Not ready
      return;
    }

    setPasswordSame(password === confirmPassword);
    setPasswordChecked(true);
  };

  const doRegister = async () => {
    if (!inviteCode || !isInviteCodeValid.valid || !username || !isUsernameValidated || !isUsernameValid) {
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
      setUsernameValidated(false);
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

      if (!inviteCode) {
        setInviteCodeValid({
          valid: false,
          reason: '值无效',
        });
      } else if (!/^\w{8}(?:-\w{4}){3}-\w{12}$/.test(inviteCode)) {
        setInviteCodeValid({
          valid: false,
          reason: '格式错误',
        });
      } else {
        try {
          const result = await API.InviteeAPI.CodeCheck(inviteCode);
          setInviteCodeValid(result);
        } catch (e) {
          setInviteCodeValid({
            valid: false,
            reason: '验证请求失败',
          });
        }
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
                    <div className="flex justify-between">
                      <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700">
                        邀请码
                      </label>
                      <span
                        className={`text-sm ${
                          isValidatingInviteCode || isInviteCodeValid.valid ? 'hidden' : 'text-red-600'
                        }`}
                        id="inviteCode-message"
                      >
                        {isInviteCodeValid.reason}
                      </span>
                    </div>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        name="inviteCode"
                        id="inviteCode"
                        className={`block w-full rounded-md pr-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm ${
                          isValidatingInviteCode
                            ? 'border-primary'
                            : isInviteCodeValid.valid
                            ? 'border-green-300 text-green-900'
                            : 'border-red-300 text-red-900'
                        } disabled:bg-gray-50`}
                        aria-invalid={!isValidatingInviteCode && !isInviteCodeValid.valid}
                        aria-describedby="inviteCode-message"
                        value={inviteCode}
                        onChange={(ev) => setInviteCode(ev.target.value)}
                        disabled={isValidatingInviteCode || isInviteCodeValid.valid || isLoading}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        {isValidatingInviteCode ? (
                          <Loading className="h-5 w-5 text-primary" aria-hidden="true" />
                        ) : isInviteCodeValid.valid ? (
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
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                        disabled={isLoading}
                        onBlur={() => checkPasswordSame()}
                      />
                    </div>
                  </div>

                  <div className={'mt-4'}>
                    <div className="flex justify-between">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        确认密码
                      </label>
                      <span
                        className={`text-sm ${!isPasswordChecked || isPasswordSame ? 'hidden' : 'text-red-600'}`}
                        id="confirmPassword-message"
                      >
                        密码不一致哦
                      </span>
                    </div>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className={`block w-full rounded-md pr-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm ${
                          !isPasswordChecked
                            ? 'border-gray-300'
                            : isPasswordSame
                            ? 'border-green-300 text-green-900'
                            : 'border-red-300 text-red-900'
                        } disabled:bg-gray-50`}
                        aria-invalid={isPasswordChecked && !isPasswordSame}
                        aria-describedby="confirmPassword-message"
                        value={confirmPassword}
                        onChange={(ev) => setConfirmPassword(ev.target.value)}
                        disabled={isLoading}
                        onBlur={() => checkPasswordSame()}
                      />
                      {isPasswordChecked && (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          {isPasswordSame ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                          ) : (
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative mt-4 flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        id="acceptToS"
                        name="acceptToS"
                        type="checkbox"
                        className="h-5 w-5 cursor-pointer rounded border-gray-300 text-primary focus:ring-primary"
                        checked={isAcceptToS}
                        onChange={(ev) => setAcceptToS(ev.target.checked)}
                      />
                    </div>
                    <div className="text-md ml-3">
                      <label htmlFor="comments" className="font-medium text-gray-700">
                        已阅读并同意{' '}
                        <a
                          href={ToSLink}
                          target={'_blank'}
                          rel={'noreferrer'}
                          className={'text-primary transition-colors hover:text-deeper'}
                        >
                          服务条款
                        </a>
                      </label>
                    </div>
                  </div>

                  <div className={'mt-6'}>
                    <button
                      type="button"
                      className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-deeper focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-deeper"
                      disabled={
                        // Invite Code
                        isValidatingInviteCode || // Invite code is still validating
                        !isInviteCodeValid.valid || // Invite code is invalid
                        // Username
                        isValidatingUsername || // Username is still validating
                        !isUsernameValidated || // Username is not validated yet
                        !isUsernameValid || // Username is invalid
                        // Password
                        !password || // Password not set
                        !isPasswordChecked || // Password is not checked
                        !isPasswordSame || // Password is not same
                        // ToS
                        !isAcceptToS || // User didn't check the ToS accept option
                        // Loading
                        isLoading // Something is loading
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
