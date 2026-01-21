import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onDetailsClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDetailsClick }) => {
  const handleClick = () => {
    if (onDetailsClick) {
      onDetailsClick(product);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-full w-full rounded-[2.5rem] bg-neutral-900/50 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer group"
    >
      {/* Container da Imagem - Centralizada, 60% da altura do card */}
      <div className="relative h-[60%] w-full flex items-center justify-center pt-8 sm:pt-10 md:pt-12">
        {/* Gradiente radial de spotlight sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_0%,_transparent_60%)] pointer-events-none" />
        
        <motion.img 
          src={product.imageUrl} 
          alt={`Pacote de ${product.name} ${product.flavor} ${product.weight} Batatas Mais Sabor - ${product.category === 'Onduladas' ? 'Batata ondulada crocante premium' : 'Batata palha premium'} para receitas gourmet e snacks saudáveis`}
          className="relative w-auto h-full max-w-[80%] sm:max-w-[75%] md:max-w-[80%] object-contain brightness-110 saturate-125 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          style={{
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
          }}
          whileHover={{ 
            y: -15,
            scale: 1.05,
            filter: 'brightness(115%) saturate(130%) drop-shadow(0 0 40px rgba(255,255,255,0.25))',
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.currentTarget;
            target.src = `https://picsum.photos/seed/package-${product.id}/400/500`;
          }}
        />
      </div>

      {/* Content - Parte Inferior */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center justify-end">
        {/* Nome do Produto - Londrina Solid Black (Branco) */}
        <h3 className="font-londrina text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white mb-1 sm:mb-2 text-center break-words px-2">
          {product.name}
        </h3>
        
        {/* Sabor - Pacifico (Dourado #FFD700) */}
        <p className="font-pacifico text-base sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-4 md:mb-6 text-center break-words px-2" style={{ color: '#FFD700' }}>
          {product.flavor}
        </p>

        {/* Peso Líq. - Montserrat (Cinza Claro) */}
        <p className="font-montserrat text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 md:mb-6 text-center">
          PESO LÍQ. <span className="text-gray-300 font-semibold">{product.weight}</span>
        </p>

        {/* Botão Detalhes - Apenas contorno, preenche no hover */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="font-montserrat font-medium text-xs sm:text-sm md:text-base text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full border border-white/30 bg-transparent hover:bg-white/10 hover:border-white/50 transition-all duration-300 uppercase tracking-wide w-full max-w-[200px] sm:max-w-none"
          style={{ transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          Detalhes
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
