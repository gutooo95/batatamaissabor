
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Origin: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.4, 0.6], [1.1, 1]);
  const y = useTransform(scrollYProgress, [0.4, 0.6], [50, 0]);

  return (
    <section id="origem" className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-neutral-950 text-white">
      {/* Background Parallax Image */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0 opacity-40"
      >
        <img 
          src="/images/lavouras/lavoura-background.png" 
          alt="Lavouras de Batata" 
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            // Fallback para imagem placeholder se não existir
            e.currentTarget.src = 'https://picsum.photos/seed/farm/1920/1080';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 md:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full"
          >
            <span className="font-pacifico text-yellow-400 text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 block">Da Terra para você</span>
            <h2 className="font-londrina text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-none">NOSSA ORIGEM, <br />NOSSO ORGULHO.</h2>
            <div className="space-y-4 sm:space-y-5 md:space-y-6 font-montserrat text-sm sm:text-base md:text-lg text-gray-200">
                <p>
                    A <strong>Batatas Mais Sabor (BMS)</strong> nasceu com um propósito simples: levar a qualidade do campo direto para a mesa das famílias brasileiras.
                </p>
                <p>
                    Nossas batatas são selecionadas rigorosamente em lavouras próprias e parceiras que seguem os mais altos padrões de cultivo sustentável. 
                </p>
                <p>
                    O segredo do nosso sabor? Respeito ao tempo da natureza e tecnologia de ponta em nossa logística e processamento, garantindo que cada embalagem aberta revele um produto sempre fresco e ultra-crocante.
                </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12">
                <div className="text-center">
                    <span className="font-londrina text-2xl sm:text-3xl md:text-4xl text-yellow-400 block">100%</span>
                    <span className="text-xs uppercase font-bold text-gray-400">Natural</span>
                </div>
                <div className="text-center">
                    <span className="font-londrina text-2xl sm:text-3xl md:text-4xl text-yellow-400 block">24h</span>
                    <span className="text-xs uppercase font-bold text-gray-400">Logística</span>
                </div>
                <div className="text-center">
                    <span className="font-londrina text-2xl sm:text-3xl md:text-4xl text-yellow-400 block">+15</span>
                    <span className="text-xs uppercase font-bold text-gray-400">Anos</span>
                </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full grid grid-cols-2 gap-2 sm:gap-3 md:gap-4"
          >
            <div className="space-y-2 sm:space-y-3 md:space-y-4 pt-0 sm:pt-6 md:pt-12">
                <img 
                  src="/images/lavouras/lavoura-1.png" 
                  alt="Plantio de Batatas" 
                  className="rounded-xl sm:rounded-2xl shadow-2xl w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = 'https://picsum.photos/seed/crop1/400/600';
                  }}
                />
                <img 
                  src="/images/lavouras/lavoura-2.png" 
                  alt="Qualidade das Lavouras" 
                  className="rounded-xl sm:rounded-2xl shadow-2xl w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = 'https://picsum.photos/seed/crop2/400/400';
                  }}
                />
            </div>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <img 
                  src="/images/lavouras/lavoura-3.png" 
                  alt="Colheita de Batatas" 
                  className="rounded-xl sm:rounded-2xl shadow-2xl w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = 'https://picsum.photos/seed/crop3/400/400';
                  }}
                />
                <img 
                  src="/images/lavouras/lavoura-4.png" 
                  alt="Lavouras Mais Sabor" 
                  className="rounded-xl sm:rounded-2xl shadow-2xl w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = 'https://picsum.photos/seed/crop4/400/600';
                  }}
                />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Origin;
