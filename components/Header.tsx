import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    const navItems = [
      { name: 'Início', href: '#inicio' },
      { name: 'Produtos', href: '#produtos' },
      { name: 'Nossa Origem', href: '#origem' },
      { name: 'Nossa Frota', href: '#frota' },
      { name: 'Receitas', href: '#receitas' },
    ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      isScrolled ? 'bg-neutral-950/95 backdrop-blur-xl shadow-2xl border-b border-white/10 py-1 sm:py-2' : 'bg-transparent py-2 sm:py-4'
    }`}>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center p-1 sm:p-1.5 shadow-xl overflow-hidden bg-transparent">
            <img 
              src="/images/logo/SEM%20FUNDO.png" 
              alt="Batatas Mais Sabor Logo"
              className="w-full h-full object-contain"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes('SEM%20FUNDO') || target.src.includes('SEM FUNDO')) {
                  target.src = '/images/logo/Logo%20Batata%20mais%20Sabor.png';
                } else {
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.style.backgroundColor = '#dc2626';
                    const span = document.createElement('span');
                    span.className = 'text-white font-londrina text-2xl sm:text-3xl leading-none text-center';
                    span.textContent = 'Batatas';
                    target.parentElement.appendChild(span);
                  }
                }
              }}
            />
          </div>
          <span className={`font-londrina text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight hidden sm:block ${
            isScrolled ? 'text-red-500' : 'text-white'
          }`}>
            BATATAS MAIS SABOR
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`font-montserrat font-semibold text-sm xl:text-base transition-colors whitespace-nowrap ${
                isScrolled ? 'text-gray-200 hover:text-yellow-400' : 'text-white hover:text-yellow-400'
              }`}
            >
              {item.name}
            </a>
          ))}
          <a 
            href="#distribuidor"
            className="bg-red-600 hover:bg-red-700 text-white font-montserrat font-bold py-2 px-4 xl:px-6 rounded-full transition-transform active:scale-95 shadow-lg text-xs xl:text-sm whitespace-nowrap"
          >
            Seja um Distribuidor
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-white bg-red-600 rounded-lg shadow-md relative z-[101]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-neutral-950/98 backdrop-blur-xl border-t border-white/10 overflow-hidden relative z-[100]"
          >
            <div className="flex flex-col p-4 gap-3 sm:gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-montserrat font-bold text-white py-2 sm:py-3 hover:text-yellow-400 text-base sm:text-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="#distribuidor"
                className="bg-red-600 text-white font-montserrat font-bold py-3 sm:py-4 rounded-xl text-sm sm:text-base mt-2 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Seja um Distribuidor
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
