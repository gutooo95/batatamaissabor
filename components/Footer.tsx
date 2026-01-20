
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Phone, MapPin, Mail, Award } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 text-white pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 md:gap-20 mb-12 sm:mb-16 md:mb-20">
          
          {/* Lado Esquerdo: Logo e Slogan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center p-2 mb-6 shadow-2xl overflow-hidden bg-transparent">
              <img 
                src="/images/logo/SEM%20FUNDO.png" 
                alt="Batatas Mais Sabor Logo"
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.includes('SEM%20FUNDO') || target.src.includes('SEM FUNDO')) {
                    target.src = '/images/logo/Logo%20Batata%20mais%20Sabor.png';
                  } else {
                    target.style.display = 'none';
                  }
                }}
              />
            </div>
            <h4 className="font-londrina text-2xl sm:text-3xl md:text-4xl mb-4 text-center md:text-left">BATATAS MAIS SABOR</h4>
            <p className="font-montserrat text-gray-400 text-center md:text-left leading-relaxed text-sm sm:text-base max-w-xs">
              A verdadeira explosão de sabor!
            </p>
            
            {/* Selo de Qualidade */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-6 sm:mt-8 flex items-center gap-3 px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full"
            >
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="font-montserrat text-xs sm:text-sm font-semibold text-yellow-400">
                100% Batata Selecionada
              </span>
            </motion.div>
          </motion.div>

          {/* Centro: Links Rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <h4 className="font-montserrat font-black text-base sm:text-lg mb-6 md:mb-8 uppercase tracking-widest border-l-4 border-yellow-400 pl-4">
              Links Rápidos
            </h4>
            <ul className="space-y-4 font-montserrat font-semibold text-gray-300 text-sm sm:text-base text-center md:text-left">
              <li>
                <a href="#produtos" className="hover:text-yellow-400 transition-colors duration-300">
                  Produtos
                </a>
              </li>
              <li>
                <a href="#receitas" className="hover:text-yellow-400 transition-colors duration-300">
                  Receitas
                </a>
              </li>
              <li>
                <a href="#frota" className="hover:text-yellow-400 transition-colors duration-300">
                  Logística
                </a>
              </li>
              <li>
                <a href="#distribuidor" className="hover:text-yellow-400 transition-colors duration-300">
                  Seja um Distribuidor
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Lado Direito: Contatos e Redes Sociais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <h4 className="font-montserrat font-black text-base sm:text-lg mb-6 md:mb-8 uppercase tracking-widest border-l-4 border-yellow-400 pl-4">
              Contato
            </h4>
            <ul className="space-y-4 sm:space-y-5 font-montserrat text-gray-300 text-sm sm:text-base text-center md:text-left">
              <li className="flex items-center gap-3 sm:gap-4">
                <Phone className="text-yellow-400 shrink-0" size={18} />
                <a 
                  href="https://wa.me/5544988231595" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 transition-colors duration-300 break-all"
                >
                  (44) 98823-1595
                </a>
              </li>
              <li className="flex items-center gap-3 sm:gap-4">
                <MapPin className="text-yellow-400 shrink-0" size={18} />
                <span>Engenheiro Beltrão - PR, Brasil</span>
              </li>
            </ul>
            
            {/* Redes Sociais */}
            <div className="mt-6 sm:mt-8">
              <h5 className="font-montserrat font-semibold text-sm text-gray-400 mb-4 text-center md:text-left">
                Siga-nos
              </h5>
              <div className="flex gap-4 justify-center md:justify-start">
                <a 
                  href="https://www.instagram.com/batatasmaissabor" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-gray-300 group-hover:text-yellow-400 transition-colors" />
                </a>
                <a 
                  href="https://www.facebook.com/batatasmaissabor" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300 group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-gray-300 group-hover:text-yellow-400 transition-colors" />
                </a>
              </div>
              <p className="mt-4 font-montserrat text-xs text-gray-500 text-center md:text-left">
                @batatasmaissabor
              </p>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="pt-8 sm:pt-10 md:pt-12 border-t border-white/10 text-center">
          <p className="font-montserrat text-xs sm:text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Batatas Mais Sabor Alimentos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
