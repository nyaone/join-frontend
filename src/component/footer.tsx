import { SVGProps } from 'react';
import NyaOneLogo from '@/asset/NyaOneLogo';

const BookIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <rect data-element="frame" x="0" y="0" width="24" height="24" rx="24" ry="24" stroke="none"></rect>
    <g transform="translate(4.800000000000001 4.800000000000001) scale(0.6)" fill="#ffffff">
      <path d="M11,3.691L1.263,1.035c-0.297-0.081-0.621-0.019-0.87,0.17C0.146,1.395,0,1.688,0,2v17 c0,0.451,0.302,0.846,0.737,0.965L11,22.764V3.691z"></path>
      <path d="M23.607,1.205c-0.248-0.188-0.572-0.25-0.87-0.17L13,3.691v19.073l10.263-2.799 C23.698,19.846,24,19.451,24,19V2C24,1.688,23.854,1.395,23.607,1.205z"></path>
    </g>
  </svg>
);

const GitLabIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" fill="currentColor" {...props}>
    <rect data-element="frame" x="0" y="0" width="512" height="512" rx="512" ry="512" stroke="none"></rect>
    <g transform="translate(102.4 102.4) scale(0.6)" fill="#ffffff">
      <path d="M503.5 204.6l-.7-1.8-69.7-181.78c-1.4-3.57-3.9-6.59-7.2-8.64-2.4-1.55-5.1-2.515-8-2.81-2.9-.295-5.7.083-8.4 1.11-2.7 1.02-5.1 2.66-7.1 4.78-1.9 2.12-3.3 4.67-4.1 7.44l-47 144H160.8l-47.1-144c-.8-2.77-2.2-5.31-4.1-7.43-2-2.12-4.4-3.75-7.1-4.77a18.1 18.1 0 0 0-8.38-1.113 18.4 18.4 0 0 0-8.04 2.793 18.09 18.09 0 0 0-7.16 8.64L9.267 202.8l-.724 1.8a129.57 129.57 0 0 0-3.52 82c7.747 26.9 24.047 50.7 46.447 67.6l.27.2.59.4 105.97 79.5 52.6 39.7 32 24.2c3.7 1.9 8.3 4.3 13 4.3 4.7 0 9.3-2.4 13-4.3l32-24.2 52.6-39.7 106.7-79.9.3-.3c22.4-16.9 38.7-40.6 45.6-67.5 8.6-27 7.4-55.8-2.6-82z"></path>
    </g>
  </svg>
);

const GitHubIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="512" viewBox="0 0 480 512" fill="currentColor" {...props}>
    <rect data-element="frame" x="0" y="16" width="480" height="480" rx="480" ry="480" stroke="none"></rect>
    <g transform="translate(96 102.4) scale(0.6)" fill="#ffffff">
      <path d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z"></path>
    </g>
  </svg>
);

const navigation = [
  {
    name: '使用文档',
    href: 'https://docs.nya.one/peripheral/join/',
    icon: BookIcon,
  },
  {
    name: '迎新账号',
    href: 'https://nya.one/@join',
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => <NyaOneLogo {...props} />,
  },
  {
    name: '代码仓库',
    href: 'https://nya.codes/nyaone/join',
    icon: GitLabIcon,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/nyaone/',
    icon: GitHubIcon,
  },
];

const Footer = () => (
  <footer className="bg-white">
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
      <div className="flex justify-center space-x-6 md:order-2">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target={'_blank'}
            rel={'noreferrer'}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">{item.name}</span>
            <item.icon className="h-6 w-6 transition-colors" aria-hidden="true" />
          </a>
        ))}
      </div>
      <div className="mt-8 md:order-1 md:mt-0">
        <p className="text-center text-base text-gray-400">&copy; {new Date().getFullYear()} NyaOne 喵窝 版权所有。</p>
      </div>
    </div>
  </footer>
);

export default Footer;
