import BannerJpg from '@/asset/banner.jpg';
import BannerWebp from '@/asset/banner.webp';

const InviteImage = () => (
  <div className="relative hidden w-0 flex-1 lg:block">
    <picture>
      <source srcSet={BannerWebp} type="image/webp" />
      <img className="absolute inset-0 h-full w-full object-cover" src={BannerJpg} alt="NyaOne Cats" />
    </picture>
  </div>
);

export default InviteImage;
