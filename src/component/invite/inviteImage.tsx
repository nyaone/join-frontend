const InviteImage = () => (
  <div className="relative hidden w-0 flex-1 lg:block">
    <picture>
      <source srcSet="/banner.webp" type="image/webp" />
      <img className="absolute inset-0 h-full w-full object-cover" src="/banner.jpg" alt="NyaOne Cats" />
    </picture>
  </div>
);

export default InviteImage;
