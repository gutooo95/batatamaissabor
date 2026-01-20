
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Origin from './components/Origin';
import Fleet from './components/Fleet';
import Recipes from './components/Recipes';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica se já foi carregado antes (localStorage)
    const hasLoadedBefore = localStorage.getItem('batatas-mais-sabor-loaded');
    
    if (hasLoadedBefore) {
      // Se já carregou antes, pula o preloader
      setIsLoading(false);
    } else {
      // Marca como carregado
      localStorage.setItem('batatas-mais-sabor-loaded', 'true');
    }
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="bg-neutral-950 min-h-screen overflow-x-hidden">
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <Header />
            <main className="relative overflow-x-hidden">
              <Hero />
              <Products />
              <Origin />
              <Fleet />
              <Recipes />
            </main>
      <Footer />
    </div>
  );
}

export default App;
