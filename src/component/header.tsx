import { Popover } from '@headlessui/react';
import { useState } from 'react';
import NyaOneLogo from '@/asset/NyaOneLogo';
import { Link } from 'react-router-dom';
import LoginModal from '@/component/modal/loginModal';

interface HeaderProps {
  loginButton?: boolean;
}

const Header = ({ loginButton }: HeaderProps) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  return (
    <>
      <Popover className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/">
                <span className="sr-only">NyaOne</span>
                <NyaOneLogo className={'h-14 w-auto text-primary sm:h-16'} />
              </Link>
            </div>

            {loginButton && (
              <div className="items-center justify-end md:flex md:flex-1 lg:w-0">
                <button
                  type="button"
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-primary px-4 py-2 text-lg font-medium text-white shadow-sm transition-colors hover:bg-deeper"
                  onClick={() => setLoginModalOpen(true)}
                >
                  登录
                </button>
              </div>
            )}
          </div>
        </div>
      </Popover>

      {/*Login Modal*/}
      {loginButton && <LoginModal isLoginModalOpen={isLoginModalOpen} setLoginModalOpen={setLoginModalOpen} />}
    </>
  );
};

export default Header;
