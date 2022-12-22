import { InviteCode } from '@/common/api/admin';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { Dialog, Switch } from '@headlessui/react';
import {
  CheckIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  ClockIcon,
  LockClosedIcon,
  SparklesIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import copyInviteLink from '@/common/utils/copyInviteLink';
import formatTime from '@/common/utils/formatTime';
import ModalWrapper from '@/component/modal/modalWrapper';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface InviteCodeProps {
  code: string;
}

const InviteCodeCode = ({ code }: InviteCodeProps) => {
  const [isCopied, setCopied] = useState(false);

  const copy = () => {
    copyInviteLink(code);
    setCopied(true);
  };

  useEffect(() => {
    setCopied(false);
  }, []);

  return (
    <div>
      <label htmlFor="code" className="block text-sm font-medium text-gray-700">
        邀请码
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            type="text"
            name="code"
            id="code"
            value={code}
            readOnly
            disabled
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
          />
        </div>
        <button
          type="button"
          className="focus:ring-border-primary relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-1"
          onClick={() => copy()}
        >
          {isCopied ? (
            <>
              <ClipboardDocumentCheckIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span>成功</span>
            </>
          ) : (
            <>
              <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span>复制</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

interface CommentProps {
  isEditing: boolean;
  comment: string;
}

const Comment = ({ isEditing, comment }: CommentProps) => (
  <div className="mt-3">
    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
      备注
    </label>
    <div className="mt-1">
      <input
        type="text"
        name="comment"
        id="comment"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
        disabled={!isEditing}
        defaultValue={comment}
      />
    </div>
  </div>
);

interface ActivateSwitchProps {
  isEditing: boolean;
  isActivate: boolean;
  setActivate: (state: boolean) => void;
}

const ActivateSwitch = ({ isEditing, isActivate, setActivate }: ActivateSwitchProps) => (
  <div className="mt-4 flex-1">
    <Switch.Group as={'div'} className={'flex h-full items-center'}>
      <Switch.Label as="span" className="mr-3">
        <span className="text-sm font-medium text-gray-900">是否启用</span>
      </Switch.Label>
      <Switch
        checked={isActivate}
        onChange={setActivate}
        className={classNames(
          isActivate ? 'bg-green-500' : 'bg-red-500',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-auto disabled:opacity-60',
        )}
        disabled={!isEditing}
        name={'isActivate'}
      >
        <span
          className={classNames(
            isActivate ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          )}
        >
          <span
            className={classNames(
              isActivate ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
              'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
            )}
            aria-hidden="true"
          >
            <XMarkIcon className={'h-3 w-3 text-red-500'} />
          </span>
          <span
            className={classNames(
              isActivate ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
              'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
            )}
            aria-hidden="true"
          >
            <CheckIcon className={'h-3 w-3 text-green-600'} />
          </span>
        </span>
      </Switch>
    </Switch.Group>
  </div>
);

interface RegisterCountLimitProps {
  isEditing: boolean;
  registerCountLimit: number;
}

const RegisterCountLimit = ({ isEditing, registerCountLimit }: RegisterCountLimitProps) => (
  <div className="mt-4">
    <label htmlFor="registerCountLimit" className="block text-sm font-medium text-gray-700">
      使用次数限制上限 ( 0 表示不限制)
    </label>
    <div className="mt-1">
      <input
        type="number"
        min={0}
        name="registerCountLimit"
        id="registerCountLimit"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
        disabled={!isEditing}
        defaultValue={registerCountLimit}
      />
    </div>
  </div>
);

interface RegisterTimeStartProps {
  isEditing: boolean;
  registerTimeStart: Date;
}

const RegisterTimeStart = ({ isEditing, registerTimeStart }: RegisterTimeStartProps) => (
  <div className="mt-3">
    <label htmlFor="registerTimeStart" className="block text-sm font-medium text-gray-700">
      开放注册时间
    </label>
    <div className="mt-1">
      <input
        type="datetime-local"
        name="registerTimeStart"
        id="registerTimeStart"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
        defaultValue={formatTime(registerTimeStart.toString())}
        disabled={!isEditing}
      />
    </div>
  </div>
);

interface RegisterTimeEndProps {
  isEditing: boolean;
  registerTimeEnd: Date;
  isRegisterTimeEndValid: boolean;
  setRegisterTimeEndValid: (state: boolean) => void;
}

const RegisterTimeEnd = ({
  isEditing,
  registerTimeEnd,
  isRegisterTimeEndValid,
  setRegisterTimeEndValid,
}: RegisterTimeEndProps) => (
  <div className="mt-3">
    <label htmlFor="registerTimeEnd" className="block text-sm font-medium text-gray-700">
      停止注册时间
    </label>
    <div className="mt-1 flex rounded-md shadow-sm">
      <div className="relative flex flex-grow items-stretch focus-within:z-10">
        <input
          type="datetime-local"
          name="registerTimeEnd"
          id="registerTimeEnd"
          className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
          defaultValue={formatTime(registerTimeEnd.toString())}
          disabled={!isEditing || !isRegisterTimeEndValid}
        />
      </div>
      <button
        type="button"
        className="focus:ring-border-primary relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 focus:border-primary focus:outline-none focus:ring-1"
        disabled={!isEditing}
        onClick={() => {
          // Toggle
          setRegisterTimeEndValid(!isRegisterTimeEndValid);
        }}
      >
        {isRegisterTimeEndValid ? (
          <>
            <ClockIcon className="h-5 w-5" aria-hidden="true" />
            <span>会过期</span>
          </>
        ) : (
          <>
            <SparklesIcon className="h-5 w-5" aria-hidden="true" />
            <span>永不过期</span>
          </>
        )}

        <input
          className={'hidden'}
          type={'checkbox'}
          checked={isRegisterTimeEndValid}
          name={'isRegisterTimeEndValid'}
          readOnly
        />
      </button>
    </div>
  </div>
);

interface RegisterCoolDownProps {
  isEditing: boolean;
  registerCoolDown: number;
}

const RegisterCoolDown = ({ isEditing, registerCoolDown }: RegisterCoolDownProps) => (
  <div className="mt-4">
    <label htmlFor="registerCoolDown" className="block text-sm font-medium text-gray-700">
      注册冷却时间（秒）
    </label>
    <div className="mt-1">
      <input
        type="number"
        min={0}
        name="registerCoolDown"
        id="registerCoolDown"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
        disabled={!isEditing}
        defaultValue={registerCoolDown}
      />
    </div>
  </div>
);

interface EditCodeFormInputsProps {
  code: InviteCode;
  isEditing: boolean;
}

const EditCodeFormInputs = ({ code, isEditing }: EditCodeFormInputsProps) => {
  // Props
  const [comment, setComment] = useState<string>('');
  const [isActivate, setActivate] = useState<boolean>(true);
  const [registerCountLimit, setRegisterCountLimit] = useState<number>(0);
  const [registerTimeStart, setRegisterTimeStart] = useState<Date>(new Date());
  const [registerTimeEnd, setRegisterTimeEnd] = useState<Date>(new Date());
  const [isRegisterTimeEndValid, setRegisterTimeEndValid] = useState<boolean>(false);
  const [registerCoolDown, setRegisterCoolDown] = useState<number>(0);

  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    setComment(code.comment);
    setActivate(code.is_activate);
    setRegisterCountLimit(code.register_count_limit);
    setRegisterTimeStart(code.register_time_start);
    setRegisterTimeEnd(code.register_time_end);
    setRegisterTimeEndValid(code.is_register_time_end_valid);
    setRegisterCoolDown(code.register_cool_down);
    setLoaded(true);
  }, [code]);

  return isLoaded ? (
    <div>
      <Comment isEditing={isEditing} comment={comment} />
      <ActivateSwitch isEditing={isEditing} isActivate={isActivate} setActivate={setActivate} />
      <RegisterCountLimit isEditing={isEditing} registerCountLimit={registerCountLimit} />
      <RegisterTimeStart isEditing={isEditing} registerTimeStart={registerTimeStart} />
      <RegisterTimeEnd
        isEditing={isEditing}
        registerTimeEnd={registerTimeEnd}
        isRegisterTimeEndValid={isRegisterTimeEndValid}
        setRegisterTimeEndValid={setRegisterTimeEndValid}
      />
      <RegisterCoolDown isEditing={isEditing} registerCoolDown={registerCoolDown} />
    </div>
  ) : (
    <></>
  );
};

interface ActionsProps {
  isEditing: boolean;
  setEditing: (state: boolean) => void;
  setOpen: (state: boolean) => void;
}

const Actions = ({ isEditing, setEditing, setOpen }: ActionsProps) => (
  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
    <button
      type={isEditing ? 'submit' : 'button'}
      className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm transition-colors hover:bg-deeper focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
      onClick={(ev) => {
        if (!isEditing) {
          ev.preventDefault();
          setEditing(true);
        }
      }}
    >
      {isEditing ? (
        <>
          <span>确认</span>
        </>
      ) : (
        <>
          <LockClosedIcon className="mr-1 h-5 w-5" aria-hidden={true} />
          <span>编辑</span>
        </>
      )}
    </button>
    <button
      type="button"
      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm transition-colors hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
      onClick={() => setOpen(false)}
    >
      关闭
    </button>
  </div>
);

interface EditCodeProps {
  code: InviteCode;
  isCreatingNew: boolean;

  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;

  doSave: (isCreatingNew: boolean, code: InviteCode) => void;
}

const EditCodeModal = ({ code, isCreatingNew, isOpen, setOpen, doSave }: EditCodeProps) => {
  const [isEditing, setEditing] = useState(false); // Default is view mode

  useEffect(() => {
    console.log(isCreatingNew);
    setEditing(isCreatingNew);
  }, [isCreatingNew, isOpen]);

  const handleSetProperties = (ev: any) => {
    ev.preventDefault();

    setEditing(false);
    setOpen(false);

    console.log(ev.target);
    doSave(isCreatingNew, {
      ...code,
      comment: ev.target.comment.value,
      is_activate: !!ev.target.isActivate,
      register_count_limit: parseInt(ev.target.registerCountLimit.value),
      register_time_start: new Date(ev.target.registerTimeStart.value),
      register_time_end: new Date(ev.target.registerTimeEnd.value),
      is_register_time_end_valid: ev.target.isRegisterTimeEndValid.checked,
      register_cool_down: parseInt(ev.target.registerCoolDown.value),
    });
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={setOpen} className={'sm:w-full sm:max-w-lg'}>
      <form onSubmit={handleSetProperties}>
        <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
          <button
            type="button"
            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={() => setOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="sm:flex sm:items-start">
          <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
              {isCreatingNew ? '创建' : isEditing ? '编辑' : '查看'}邀请码
            </Dialog.Title>
            <div className="mt-4 text-left">
              {!isCreatingNew && <InviteCodeCode code={code.code} />}
              <EditCodeFormInputs code={code} isEditing={isEditing} />
            </div>
          </div>
        </div>
        <Actions isEditing={isEditing} setEditing={setEditing} setOpen={setOpen} />
      </form>
    </ModalWrapper>
  );
};

export default EditCodeModal;
