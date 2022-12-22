import IntroBanner from '@/asset/intro-banner.png';

const InviteImage = () => (
  <div className="relative hidden w-0 flex-1 lg:block">
    <img className="absolute inset-0 h-full w-full object-cover" src={IntroBanner} alt="NyaOne Cats" />
  </div>
);

export default InviteImage;
