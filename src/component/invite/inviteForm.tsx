import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CodeCheckResult } from '@/common/api/invitee';
import API from '@/common/api';
import Loading from '@/common/icons/loading';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { ToSLink } from '@/common/settings';
import { Result } from '@/component/invite/Result';

interface InviteCodeInputProps {
  setInviteCodeOK: (state: boolean) => void;
}

const InviteCodeInput = ({ setInviteCodeOK }: InviteCodeInputProps) => {
  const { code } = useParams();

  const [isValidatingInviteCode, setValidatingInviteCode] = useState(false);
  const [isInviteCodeValid, setInviteCodeValid] = useState<CodeCheckResult>({
    valid: false,
    reason: '未初始化',
  });

  const inviteCode = useRef('');

  const validateInviteCode = useCallback(async () => {
    setInviteCodeOK(false);
    setValidatingInviteCode(true);

    if (!inviteCode.current) {
      setInviteCodeValid({
        valid: false,
        reason: '值无效',
      });
    } else if (!/^\w{8}(?:-\w{4}){3}-\w{12}$/.test(inviteCode.current)) {
      setInviteCodeValid({
        valid: false,
        reason: '格式错误',
      });
    } else {
      try {
        const result = await API.InviteeAPI.CodeCheck(inviteCode.current);
        setInviteCodeValid(result);
        if (result.valid) {
          setInviteCodeOK(true);
        }
      } catch (e) {
        setInviteCodeValid({
          valid: false,
          reason: '验证请求失败',
        });
      }
    }

    setValidatingInviteCode(false);
  }, [setValidatingInviteCode, setInviteCodeValid, setInviteCodeOK]);

  useEffect(() => {
    if (code) {
      inviteCode.current = code;
      validateInviteCode();
    }
  }, [code, validateInviteCode]);

  return (
    <div className={'mt-4'}>
      <div className="flex justify-between">
        <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700">
          邀请码
        </label>
        <span
          className={`text-sm ${isValidatingInviteCode || isInviteCodeValid.valid ? 'hidden' : 'text-red-600'}`}
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
          defaultValue={inviteCode.current}
          onBlur={(ev) => {
            inviteCode.current = ev.target.value;
            validateInviteCode();
          }}
          disabled={isValidatingInviteCode || isInviteCodeValid.valid}
          required
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
  );
};

interface UsernameInputProps {
  setUsernameOK: (state: boolean) => void;
}

const UsernameInput = ({ setUsernameOK }: UsernameInputProps) => {
  const [isValidatingUsername, setValidatingUsername] = useState(false);
  const [isUsernameValidated, setUsernameValidated] = useState(false);
  const [isUsernameValid, setUsernameValid] = useState(false);

  const username = useRef('');

  const validateUsername = async () => {
    if (!username.current) {
      setUsernameValid(false);
      setUsernameOK(false);
      return;
    }

    setValidatingUsername(true);

    if (await API.InviteeAPI.UsernameCheck(username.current)) {
      setUsernameValid(true);
      setUsernameOK(true);
    } else {
      setUsernameValid(false);
      setUsernameOK(true);
    }

    setValidatingUsername(false);
    setUsernameValidated(true);
  };

  return (
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
          // defaultValue={username}
          onBlur={(ev) => {
            const newUsername = ev.target.value;
            const filteredUsername = newUsername.replace(/\W/g, ''); // Remove all not \w chat
            username.current = filteredUsername;
            validateUsername();
          }}
          required
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
  );
};

interface PasswordInputProps {
  setPasswordOK: (state: boolean) => void;
}

const PasswordInput = ({ setPasswordOK }: PasswordInputProps) => {
  const password = useRef('');
  const confirmPassword = useRef('');

  const [isPasswordSame, setPasswordSame] = useState(false);
  const [isPasswordChecked, setPasswordChecked] = useState(false);

  const checkPasswordSame = () => {
    if (password.current === '' || confirmPassword.current === '') {
      // Not ready
      setPasswordOK(false);
      return;
    }

    const isPasswordSame = password.current === confirmPassword.current;
    setPasswordSame(isPasswordSame);
    setPasswordOK(isPasswordSame);
    setPasswordChecked(true);
  };

  return (
    <>
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
            // defaultValue={password}
            onBlur={(ev) => {
              password.current = ev.target.value;
              checkPasswordSame();
            }}
            required
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
            // defaultValue={confirmPassword}
            onBlur={(ev) => {
              confirmPassword.current = ev.target.value;
              checkPasswordSame();
            }}
            required
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
    </>
  );
};

interface AcceptToSProps {
  setAcceptToSOK: (state: boolean) => void;
}

const AcceptToS = ({ setAcceptToSOK }: AcceptToSProps) => {
  const [isAcceptToS, setAcceptToS] = useState(false);

  return (
    <div className="relative mt-4 flex items-start">
      <div className="flex h-6 items-center">
        <input
          id="acceptToS"
          name="acceptToS"
          type="checkbox"
          className="h-5 w-5 cursor-pointer rounded border-gray-300 text-primary focus:ring-primary"
          checked={isAcceptToS}
          onChange={(ev) => {
            setAcceptToS(ev.target.checked);
            setAcceptToSOK(ev.target.checked);
          }}
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
  );
};

interface RegisterButtonProps {
  isEverythingOK: boolean;
}

const RegisterButton = ({ isEverythingOK }: RegisterButtonProps) => (
  <div className={'mt-6'}>
    <button
      type="submit"
      className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-deeper focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-deeper"
      disabled={!isEverythingOK}
    >
      出发！
    </button>
  </div>
);

interface InviteFormProps {
  setLoading: (state: boolean) => void;
  setResult: (state: Result) => void;
  setShowingResult: (state: boolean) => void;
}

const InviteForm = ({ setLoading, setResult, setShowingResult }: InviteFormProps) => {
  const [isInviteCodeOK, setInviteCodeOK] = useState(false);
  const [isUsernameOK, setUsernameOK] = useState(false);
  const [isPasswordOK, setPasswordOK] = useState(false);
  const [isAcceptToSOK, setAcceptToSOK] = useState(false);

  const doRegister = async (ev: any) => {
    ev.preventDefault(); // Prevent form submit

    setLoading(true);

    try {
      const instanceUri = await API.PublicAPI.Instance();
      await API.InviteeAPI.Register(ev.target.inviteCode.value, ev.target.username.value, ev.target.password.value);
      setResult({
        success: true,
        message: instanceUri,
      });

      // Prevent duplicate username
      setUsernameOK(false);
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
    <form className="mt-8" onSubmit={doRegister}>
      <InviteCodeInput setInviteCodeOK={setInviteCodeOK} />
      <UsernameInput setUsernameOK={setUsernameOK} />
      <PasswordInput setPasswordOK={setPasswordOK} />

      <AcceptToS setAcceptToSOK={setAcceptToSOK} />

      <RegisterButton isEverythingOK={isInviteCodeOK && isUsernameOK && isPasswordOK && isAcceptToSOK} />
    </form>
  );
};

export default InviteForm;
