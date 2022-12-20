import type { PropsWithChildren } from 'react';
import { Fragment, useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  Bars3CenterLeftIcon,
  CodeBracketIcon,
  XMarkIcon,
  UsersIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Footer from '@/component/footer';
import NyaOneLogo from '@/asset/NyaOneLogo';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import API from '@/common/api';
import { AdminSessionKey, AdminUsernameKey } from '@/common/settings';
import ModalWrapper from '@/component/modal/modalWrapper';

const navigation = [
  { name: '邀请码', href: '/admin/codes', icon: CodeBracketIcon },
  { name: '用户', href: '/admin/invitees', icon: UsersIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface SideBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBar = ({ sidebarOpen, setSidebarOpen }: SideBarProps) => {
  const location = useLocation();
  const nav = useNavigate();

  const nonRequested = useRef(true);

  useEffect(() => {
    const initRedirect = async () => {
      try {
        await API.AdminAPI.SessionCheck();
      } catch (e) {
        // Invalid session, back to homepage
        nav('/');
      }
    };

    if (nonRequested.current) {
      nonRequested.current = false;
      initRedirect();
    }
  }, [nav, nonRequested]);

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-sky-700 pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <NyaOneLogo className={'h-8 w-auto text-white'} />
                </div>
                <nav className="mt-5 h-full flex-shrink-0 divide-y divide-sky-800 overflow-y-auto" aria-label="Sidebar">
                  <div className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href
                            ? 'bg-sky-800 text-white'
                            : 'text-sky-100 hover:bg-sky-600 hover:text-white',
                          'group flex items-center rounded-md px-2 py-2 text-base font-medium',
                        )}
                        aria-current={location.pathname === item.href ? 'page' : undefined}
                      >
                        <item.icon className="mr-4 h-6 w-6 flex-shrink-0 text-sky-200" aria-hidden="true" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-grow flex-col overflow-y-auto bg-sky-700 pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <NyaOneLogo className={'h-8 w-auto text-white'} />
          </div>
          <nav className="mt-5 flex flex-1 flex-col divide-y divide-sky-800 overflow-y-auto" aria-label="Sidebar">
            <div className="space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? 'bg-sky-800 text-white'
                      : 'text-sky-100 hover:bg-sky-600 hover:text-white',
                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6',
                  )}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                >
                  <item.icon className="mr-4 h-6 w-6 flex-shrink-0 text-sky-200" aria-hidden="true" />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

interface AdminLayoutProps {}

interface LogoutCheckProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
}
const LogoutCheck = ({ open, setOpen, onConfirm }: LogoutCheckProps) => {
  const cancelButtonRef = useRef(null);
  return (
    <ModalWrapper isOpen={open} onClose={setOpen} className={'sm:w-full sm:max-w-sm'}>
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
            是否确认登出
          </Dialog.Title>
        </div>
      </div>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
          onClick={() => onConfirm()}
        >
          确认登出
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
          onClick={() => setOpen(false)}
          ref={cancelButtonRef}
        >
          取消
        </button>
      </div>
    </ModalWrapper>
  );
};

const AdminLayout = ({ children }: PropsWithChildren<AdminLayoutProps>) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLogoutCheckOpen, setLogoutCheckOpen] = useState(false);

  const nav = useNavigate();

  const [username, setUsername] = useState('Loading...');

  const checkLogout = () => {
    setLogoutCheckOpen(true);
  };

  const doLogout = () => {
    setLogoutCheckOpen(false);
    API.AdminAPI.Logout();
    sessionStorage.removeItem(AdminSessionKey);
    sessionStorage.removeItem(AdminUsernameKey);
    nav('/');
  };

  useEffect(() => {
    const username = sessionStorage.getItem(AdminUsernameKey);
    setUsername(`@${username}`);
  }, []);

  return (
    <>
      <div className="min-h-full">
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search bar */}
            <div className="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
              <div className="flex flex-1"></div>
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                      <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">{username}</span>
                      <ChevronDownIcon
                        className="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block cursor-pointer px-4 py-2 text-sm text-red-400',
                            )}
                            onClick={() => checkLogout()}
                          >
                            退出登录
                          </span>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="flex-1 pb-1">
            <div className="bg-white shadow">
              <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                  <div className="min-w-0 flex-1">{children}</div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>

      <LogoutCheck open={isLogoutCheckOpen} setOpen={setLogoutCheckOpen} onConfirm={doLogout} />
    </>
  );
};

export default AdminLayout;
