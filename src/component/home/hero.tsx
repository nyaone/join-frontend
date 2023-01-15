import IntroBanner from '@/asset/intro-banner.png';

interface HeroProps {
  doLogin: () => void;
  isSessionExist: boolean;
}

const Hero = ({ doLogin, isSessionExist }: HeroProps) => (
  <div className="relative">
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
        <div className="absolute inset-0">
          <img className="h-full w-full object-cover" src={IntroBanner} alt="People working on laptops" />
          <div className="absolute inset-0 bg-gray-500 mix-blend-multiply" />
        </div>
        <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
          <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block text-primary">NyaOne 喵窝</span>
            <span className="block text-white">邀请管理系统</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
            欢迎更多好伙伴们加入我们！
          </p>
          <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
            <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
              <a
                href="https://docs.nya.one/peripheral/join/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-xl font-semibold text-primary shadow-sm transition-colors hover:bg-gray-300 sm:px-8"
              >
                文档
              </a>
              <span
                onClick={doLogin}
                className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-primary bg-opacity-80 px-4 py-3 text-xl font-semibold text-white shadow-sm transition-colors hover:bg-deeper sm:px-8"
              >
                {isSessionExist ? '控制台' : '登录'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
