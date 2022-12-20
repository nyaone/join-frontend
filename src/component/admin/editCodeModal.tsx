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

interface EditCodeProps {
  code: InviteCode;
  isCreatingNew: boolean;

  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;

  doSave: (isCreatingNew: boolean, code: InviteCode) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const EditCodeModal = ({ code, isCreatingNew, isOpen, setOpen, doSave }: EditCodeProps) => {
  // Constants
  const [codeCode, setCodeCode] = useState<string>('');

  // Props
  const [comment, setComment] = useState<string>('');
  const [isActivate, setActivate] = useState<boolean>(true);
  const [registerCountLimit, setRegisterCountLimit] = useState<number>(0);
  const [registerTimeStart, setRegisterTimeStart] = useState<Date>(new Date());
  const [registerTimeEnd, setRegisterTimeEnd] = useState<Date>(new Date());
  const [isRegisterTimeEndValid, setRegisterTimeEndValid] = useState<boolean>(false);
  const [registerCoolDown, setRegisterCoolDown] = useState<number>(0);

  const [isEditing, setEditing] = useState(false); // Default view mode

  const [isCopied, setCopied] = useState(false);

  useEffect(() => {
    setEditing(isCreatingNew);
  }, [isCreatingNew, isOpen]);

  useEffect(() => {
    setCodeCode(code.code);

    setComment(code.comment);
    setActivate(code.is_activate);
    setRegisterCountLimit(code.register_count_limit);
    setRegisterTimeStart(code.register_time_start);
    setRegisterTimeEnd(code.register_time_end);
    setRegisterTimeEndValid(code.is_register_time_end_valid);
    setRegisterCoolDown(code.register_cool_down);
  }, [code, isOpen]);

  useEffect(() => {
    setCopied(false);
  }, [isOpen]);

  const copy = () => {
    copyInviteLink(codeCode);
    setCopied(true);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={setOpen}>
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
            {/*Constants*/}
            {!isCreatingNew && (
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
                      value={codeCode}
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
            )}

            {/*Properties*/}
            <div>
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
                    value={comment}
                    onChange={(ev) => {
                      setComment(ev.target.value);
                    }}
                    disabled={!isEditing}
                  />
                </div>
              </div>

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
                    value={registerCountLimit}
                    onChange={(ev) => {
                      setRegisterCountLimit(parseInt(ev.target.value));
                    }}
                    disabled={!isEditing}
                  />
                </div>
              </div>

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
                    onChange={(ev) => {
                      setRegisterTimeStart(new Date(ev.target.value));
                    }}
                    disabled={!isEditing}
                  />
                </div>
              </div>

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
                      onChange={(ev) => {
                        setRegisterTimeEnd(new Date(ev.target.value));
                      }}
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
                  </button>
                </div>
              </div>

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
                    value={registerCoolDown}
                    onChange={(ev) => {
                      setRegisterCoolDown(parseInt(ev.target.value));
                    }}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm transition-colors hover:bg-deeper focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => {
            if (!isEditing) {
              setEditing(true);
            } else {
              setEditing(false);
              setOpen(false);
              doSave(isCreatingNew, {
                ...code,
                comment: comment,
                is_activate: isActivate,
                register_count_limit: registerCountLimit,
                register_time_start: registerTimeStart,
                register_time_end: registerTimeEnd,
                is_register_time_end_valid: isRegisterTimeEndValid,
                register_cool_down: registerCoolDown,
              });
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
    </ModalWrapper>
  );
};

export default EditCodeModal;
