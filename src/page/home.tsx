import Header from '@/component/header';
import Hero from '@/component/home/hero';
import Feature1 from '@/component/home/feature-1';
import Feature2 from '@/component/home/feature-2';
import Footer from '@/component/footer';

const Home = () => (
  <main>
    <Header loginButton={true} />
    <Hero />
    <Feature1 />
    <Feature2 />
    <Footer />
  </main>
);

export default Home;
