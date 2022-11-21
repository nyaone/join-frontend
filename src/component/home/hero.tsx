import IntroBanner from '@/asset/intro-banner.png';

const Hero = () => (
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
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
