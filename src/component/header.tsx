import { Popover } from '@headlessui/react';
import NyaOneLogo from '@/asset/NyaOneLogo';
import { Link } from 'react-router-dom';

const Header = () => (
  <Popover className="relative bg-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link to="/">
            <span className="sr-only">NyaOne</span>
            <NyaOneLogo className={'h-14 w-auto text-primary sm:h-16'} />
          </Link>
        </div>
      </div>
    </div>
  </Popover>
);

export default Header;
