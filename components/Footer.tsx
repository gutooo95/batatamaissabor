import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Phone, MapPin, FileText } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 text-white pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Logo e Branding - Centralizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16"
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 overflow-hidden">
            <img 
              src="/images/logo/SEM%20FUNDO.png" 
              alt="Batatas Mais Sabor"
              className="w-full h-full object-contain"
              loading="lazy"
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
          <h3 className="font-londrina text-2xl mb-2">BATATAS MAIS SABOR</h3>
          <p className="font-montserrat text-sm text-gray-400">Espalhando mais sabor pelo Brasil</p>
        </motion.div>

        {/* Links e Informações - Grid Centralizado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Links Rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h4 className="font-montserrat font-semibold text-sm text-gray-300 mb-6 uppercase tracking-wider">
              Links
            </h4>
            <ul className="space-y-3 font-montserrat text-sm text-gray-400">
              <li>
                <a href="#produtos" className="hover:text-white transition-colors duration-200">
                  Produtos
                </a>
              </li>
              <li>
                <a href="#receitas" className="hover:text-white transition-colors duration-200">
                  Receitas
                </a>
              </li>
              <li>
                <a href="#frota" className="hover:text-white transition-colors duration-200">
                  Logística
                </a>
              </li>
              <li>
                <a href="#distribuidor" className="hover:text-white transition-colors duration-200">
                  Seja Distribuidor
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contato */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h4 className="font-montserrat font-semibold text-sm text-gray-300 mb-6 uppercase tracking-wider">
              Contato
            </h4>
            <ul className="space-y-3 font-montserrat text-sm text-gray-400">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <a 
                  href="https://wa.me/5544988231595" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  (44) 98823-1595
                </a>
              </li>
              <li className="flex items-start justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                <span className="text-left">
                  Rua Santa Catarina 422<br />
                  Parque Industrial<br />
                  87270-000, Engenheiro Beltrão - PR
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Redes Sociais e Catálogo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h4 className="font-montserrat font-semibold text-sm text-gray-300 mb-6 uppercase tracking-wider">
              Redes Sociais
            </h4>
            <div className="flex gap-3 justify-center md:justify-start mb-6">
              <a 
                href="https://www.instagram.com/batatasmaissabor" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-gray-400" />
              </a>
              <a 
                href="https://www.facebook.com/batatasmaissabor" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-gray-400" />
              </a>
            </div>
            <motion.a
              href="/catalogo/Catálogo Batata Mais Sabor (ATUALIZADO).pdf"
              download="Catálogo Batata Mais Sabor (ATUALIZADO).pdf"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-sm font-montserrat text-gray-300 transition-all duration-200"
            >
              <FileText className="w-4 h-4" />
              <span>Catálogo</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Divisor */}
        <div className="border-t border-white/5 mb-8"></div>

        {/* Copyright e Links Legais - Centralizado */}
        <div className="text-center space-y-3">
          <p className="font-montserrat text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Batatas Mais Sabor. Todos os direitos reservados.
          </p>
          <div className="flex items-center justify-center gap-3 text-xs text-gray-600">
            <a href="/politica-privacidade" className="hover:text-gray-400 transition-colors duration-200">
              Privacidade
            </a>
            <span className="text-gray-600">·</span>
            <a href="/termos-uso" className="hover:text-gray-400 transition-colors duration-200">
              Termos
            </a>
          </div>
          <p className="font-montserrat text-xs text-gray-600 pt-2">
            Desenvolvido por{' '}
            <a 
              href="https://bigdevz.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gray-400 transition-colors duration-200"
            >
              BigDev.Z
            </a>
            {' - '}IT Consulting
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
