
import React from 'react';
import { Instagram, Facebook, Phone, MapPin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-800 text-white pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-20">
          <div className="flex flex-col items-center sm:items-start">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center p-1 sm:p-2 mb-4 sm:mb-6 shadow-xl overflow-hidden bg-transparent">
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
            <h4 className="font-londrina text-2xl sm:text-3xl mb-3 sm:mb-4 text-center sm:text-left">BATATAS MAIS SABOR</h4>
            <p className="font-montserrat text-red-100 text-center sm:text-left opacity-80 leading-relaxed text-sm sm:text-base">
              Dedicados à excelência desde a semente até o pacote final. Sinta o sabor da qualidade.
            </p>
          </div>

          <div>
            <h4 className="font-montserrat font-black text-base sm:text-lg mb-4 sm:mb-6 md:mb-8 uppercase tracking-widest border-l-4 border-yellow-400 pl-3 sm:pl-4">Menu</h4>
            <ul className="space-y-3 sm:space-y-4 font-montserrat font-semibold text-red-100 text-sm sm:text-base">
                <li><a href="#inicio" className="hover:text-yellow-400 transition-colors">Início</a></li>
                <li><a href="#produtos" className="hover:text-yellow-400 transition-colors">Nossos Produtos</a></li>
                <li><a href="#origem" className="hover:text-yellow-400 transition-colors">Nossa Origem</a></li>
                <li><a href="#receitas" className="hover:text-yellow-400 transition-colors">Receitas</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat font-black text-base sm:text-lg mb-4 sm:mb-6 md:mb-8 uppercase tracking-widest border-l-4 border-yellow-400 pl-3 sm:pl-4">Contato</h4>
            <ul className="space-y-4 sm:space-y-5 md:space-y-6 font-montserrat text-red-100 text-sm sm:text-base">
                <li className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <Phone className="text-yellow-400 shrink-0 mt-0.5 sm:mt-0" size={18} />
                    <span className="break-all">(44) 98823-1595</span>
                </li>
                <li className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <Mail className="text-yellow-400 shrink-0 mt-0.5 sm:mt-0" size={18} />
                    <span className="break-all">contato@batatasmaissabor.com.br</span>
                </li>
                <li className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <MapPin className="text-yellow-400 shrink-0 mt-0.5 sm:mt-0" size={18} />
                    <span>Engenheiro Beltrão - PR, Brasil</span>
                </li>
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat font-black text-base sm:text-lg mb-4 sm:mb-6 md:mb-8 uppercase tracking-widest border-l-4 border-yellow-400 pl-3 sm:pl-4">Siga-nos</h4>
            <div className="flex gap-3 sm:gap-4">
                <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-red-700 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-red-900 transition-all shadow-lg">
                    <Instagram size={20} className="sm:w-6 sm:h-6" />
                </a>
                <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-red-700 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-red-900 transition-all shadow-lg">
                    <Facebook size={20} className="sm:w-6 sm:h-6" />
                </a>
            </div>
            <div className="mt-6 sm:mt-8 md:mt-10">
                <p className="font-pacifico text-yellow-400 text-lg sm:text-xl">Sempre crocante!</p>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 md:pt-10 border-t border-red-700 text-center font-montserrat text-xs sm:text-sm text-red-200 px-4">
            <p>&copy; {new Date().getFullYear()} Batatas Mais Sabor Alimentos. Todos os direitos reservados.</p>
            <p className="mt-2 text-xs opacity-50 uppercase tracking-tighter">Desenvolvido com carinho e muita batata.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
