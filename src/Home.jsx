import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import FeaturedCategories from './components/FeaturedCategories';
import ShopTheLook from './components/ShopTheLook';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';

function Home() {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#FFF5EE] group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Noto Serif", "Noto Sans", sans-serif' }}
    >

      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="bg-amber-900 text-amber-100 py-2.5 px-4 text-center text-sm font-medium sticky top-0 z-40">
  <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
    <span>🌙</span>
    <span>Orders before <strong className="text-white">May 15th</strong> → Delivered <strong className="text-green-300">before Eid</strong></span>
    <span>•</span>
    <span>Orders after <strong className="text-white">May 15th</strong> → Delivered <strong className="text-amber-300">after Eid</strong></span>
    <span>✨</span>
  </div>
</div>
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 w-full">
            <HeroBanner />
            <FeaturedCategories />
            <ShopTheLook />
            <div>
              <ContactForm />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Home;
