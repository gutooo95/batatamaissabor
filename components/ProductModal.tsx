import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Barcode, Info } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  // Fechar com tecla ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  if (!product || !product.details) return null;

  // Determinar cor do glow baseado no sabor/categoria
  const getGlowColor = () => {
    if (product.category === 'Onduladas') {
      if (product.flavor.toLowerCase().includes('cebola')) return 'rgba(34, 197, 94, 0.3)'; // Verde
      if (product.flavor.toLowerCase().includes('churrasco')) return 'rgba(220, 38, 38, 0.3)'; // Vermelho
      return 'rgba(59, 130, 246, 0.3)'; // Azul (Original)
    }
    return 'rgba(132, 204, 22, 0.3)'; // Verde-amarelo (Palha)
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="pointer-events-auto w-full max-w-5xl max-h-[95vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-neutral-900/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col h-full max-h-[95vh]">
                
                {/* Header com respiro generoso */}
                <div className="relative px-10 py-10 sm:px-12 sm:py-12 border-b border-white/10">
                  {/* Botão fechar */}
                  <button
                    onClick={onClose}
                    className="absolute top-8 right-8 sm:top-10 sm:right-10 w-11 h-11 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 z-10"
                    aria-label="Fechar"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>

                  {/* Título */}
                  <div className="pr-16 sm:pr-20">
                    <h2 className="font-londrina text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 uppercase tracking-tighter">
                      {product.name}
                    </h2>
                    <p className="font-pacifico text-2xl sm:text-3xl mb-3" style={{ color: '#FFD700' }}>
                      {product.flavor}
                    </p>
                    <p className="font-montserrat text-base sm:text-lg text-gray-400 font-medium">
                      {product.weight}
                    </p>
                  </div>
                </div>

                {/* Conteúdo scrollável com padding generoso (respiro Apple) */}
                <div className="overflow-y-auto flex-1 px-8 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12">
                  
                  {/* Imagem do produto - Iluminada e centralizada, sem transparências */}
                  <div className="flex justify-center mb-12 sm:mb-16">
                    <div className="relative w-56 h-72 sm:w-72 sm:h-96 lg:w-80 lg:h-[28rem] flex items-center justify-center">
                      {/* Glow radial baseado no sabor */}
                      <div 
                        className="absolute inset-0 rounded-3xl blur-3xl opacity-60"
                        style={{
                          background: `radial-gradient(circle at center, ${getGlowColor()}, transparent 70%)`,
                        }}
                      />
                      
                      {/* Imagem do produto - Iluminada, sem transparências */}
                      <img
                        src={product.imageUrl}
                        alt={`${product.name} - ${product.flavor}`}
                        className="relative w-full h-full object-contain z-10"
                        style={{
                          filter: 'brightness(1.15) contrast(1.1) saturate(1.15) drop-shadow(0 0 20px rgba(255,255,255,0.2))',
                          opacity: 1,
                          mixBlendMode: 'normal',
                        }}
                        onError={(e) => {
                          e.currentTarget.src = `https://picsum.photos/seed/product-${product.id}/400/500`;
                        }}
                      />
                    </div>
                  </div>

                  {/* Bento Grid - Informações técnicas */}
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12">
                    
                    {/* Card: Unidades/Embalagem */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white/5 rounded-3xl p-8 sm:p-10 border border-white/10 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-yellow-400/20 flex items-center justify-center border border-yellow-400/30">
                          <Package className="w-6 h-6 text-yellow-400" />
                        </div>
                        <h3 className="font-londrina text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter">
                          Embalagem
                        </h3>
                      </div>
                      <p className="font-montserrat text-gray-200 text-lg sm:text-xl leading-relaxed font-medium">
                        {product.details.packaging}
                      </p>
                    </motion.div>

                    {/* Card: Código EAN */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="bg-white/5 rounded-3xl p-8 sm:p-10 border border-white/10 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-yellow-400/20 flex items-center justify-center border border-yellow-400/30">
                          <Barcode className="w-6 h-6 text-yellow-400" />
                        </div>
                        <h3 className="font-londrina text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter">
                          Código EAN
                        </h3>
                      </div>
                      <p className="font-montserrat text-gray-200 text-xl sm:text-2xl font-mono leading-relaxed font-semibold">
                        {product.details.ean}
                      </p>
                    </motion.div>
                  </div>

                  {/* Card: Ingredientes */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-yellow-400/20 flex items-center justify-center border border-yellow-400/30">
                        <Info className="w-6 h-6 text-yellow-400" />
                      </div>
                      <h3 className="font-londrina text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter">
                        Ingredientes
                      </h3>
                    </div>
                    <div className="bg-white/5 rounded-3xl p-8 sm:p-10 border border-white/10 backdrop-blur-sm">
                      <p className="font-montserrat text-gray-200 text-lg sm:text-xl leading-relaxed font-medium">
                        {product.details.ingredients.join(', ')}
                      </p>
                    </div>
                  </motion.div>

                  {/* Card: Tabela Nutricional */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <h3 className="font-londrina text-3xl sm:text-4xl font-black text-white mb-6 uppercase tracking-tighter">
                      Tabela Nutricional
                    </h3>
                    <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm">
                      <div className="p-8 sm:p-10 border-b border-white/10">
                        <p className="font-montserrat text-base sm:text-lg text-gray-400 font-medium">
                          Porção: <span className="text-white font-semibold">25g (1 porção)</span>
                        </p>
                      </div>
                      <div className="divide-y divide-white/10">
                        {[
                          { label: 'Valor Energético', value: '153 kcal' },
                          { label: 'Carboidratos', value: '15g' },
                          { label: 'Proteínas', value: '1,3g' },
                          { label: 'Gorduras Totais', value: '9,8g' },
                          { label: 'Gorduras Saturadas', value: '4,4g' },
                          { label: 'Sódio', value: '99mg' },
                          { label: 'Fibra Alimentar', value: '1,5g' },
                        ].map((item, index) => (
                          <div 
                            key={index}
                            className="p-6 sm:p-8 flex justify-between items-center"
                          >
                            <span className="font-montserrat text-base sm:text-lg text-gray-300 font-light">
                              {item.label}
                            </span>
                            <span className="font-montserrat text-base sm:text-lg text-white font-semibold">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
