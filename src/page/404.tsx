import { Link } from 'react-router-dom';
import Header from '@/component/header';
import Footer from '@/component/footer';

const NotFound = () => {
  const notice = [
    '那么只剩下一种可能了——出现了，是 bug ！',
    '除了……呃，可能是 bug ？',
    '瞬态电子云会梦到数字 bug 吗',
    '难道您就是尊敬的、从破碎世界的边界传送过来的时空旅人！',
  ];

  return (
    <>
      <Header />
      <div className="min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center md:py-36 lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">这里没有东西哦</h1>
                <p className="mt-1 text-base text-gray-500">{notice[Math.floor(Math.random() * notice.length)]}</p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link
                  to={'/'}
                  className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-deeper focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  回到主页
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
