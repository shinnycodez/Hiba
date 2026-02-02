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
      {/* Announcement Banner */}
      <div className="w-full bg-gradient-to-r from-amber-50 to-rose-50 border-b border-amber-200/50 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-amber-900">
              Notice
            </span>
          </div>
          <p className="text-center text-sm text-amber-800/90 font-serif">
            Orders are temporarily closed until further notice. We'll be back soon!
          </p>
          <div className="hidden md:flex items-center gap-1 ml-4 px-3 py-1 bg-white/50 rounded-full">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-amber-700">Paused</span>
          </div>
        </div>
      </div>

      <div className="layout-container flex h-full grow flex-col">
        <Header />
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
