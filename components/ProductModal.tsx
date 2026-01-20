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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto w-full max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-neutral-900/95 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="relative px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10 border-b border-white/10">
                  {/* Botão fechar - Maior no mobile */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 z-10"
                    aria-label="Fechar"
                  >
                    <X className="w-6 h-6 sm:w-5 sm:h-5 text-white" />
                  </button>

                  {/* Título */}
                  <div className="pr-16 sm:pr-20">
                    <h2 className="font-londrina text-3xl md:text-4xl font-black text-white mb-3 uppercase tracking-tight">
                      {product.name}
                    </h2>
                    <p className="font-pacifico text-xl md:text-2xl mb-2" style={{ color: '#FFD700' }}>
                      {product.flavor}
                    </p>
                    <p className="font-montserrat text-sm sm:text-base text-gray-400">
                      {product.weight}
                    </p>
                  </div>
                </div>

                {/* Conteúdo scrollável */}
                <div className="overflow-y-auto flex-1 px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
                  {/* Imagem do produto com Spotlight */}
                  <div className="flex justify-center mb-8 sm:mb-10">
                    <div className="relative w-64 h-80 sm:w-72 sm:h-96 flex items-center justify-center">
                      {/* Gradiente radial de spotlight mais intenso */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.3)_0%,_rgba(255,255,255,0.1)_40%,_transparent_70%)] rounded-3xl" />
                      
                      {/* Imagem do produto - Máximo brilho e vivacidade */}
                      <img
                        src={product.imageUrl}
                        alt={`${product.name} - ${product.flavor}`}
                        className="relative w-full h-full object-contain"
                        style={{
                          filter: 'brightness(1.5) contrast(1.25) saturate(1.5) drop-shadow(0 0 50px rgba(255,255,255,0.4))',
                          opacity: 1,
                          mixBlendMode: 'normal',
                        }}
                        onError={(e) => {
                          e.currentTarget.src = `https://picsum.photos/seed/product-${product.id}/400/500`;
                        }}
                      />
                    </div>
                  </div>

                  {/* Informações de Embalagem e EAN */}
                  <div className="grid md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 mb-8 sm:mb-10">
                    <div className="bg-white/5 rounded-2xl p-5 sm:p-6 lg:p-7 border border-white/10">
                      <div className="flex items-center gap-3 mb-4">
                        <Package className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                        <h3 className="font-montserrat font-bold text-white text-sm sm:text-base uppercase tracking-wide">
                          Embalagem
                        </h3>
                      </div>
                      <p className="font-montserrat text-gray-300 text-sm sm:text-base leading-relaxed">
                        {product.details.packaging}
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-5 sm:p-6 lg:p-7 border border-white/10">
                      <div className="flex items-center gap-3 mb-4">
                        <Barcode className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                        <h3 className="font-montserrat font-bold text-white text-sm sm:text-base uppercase tracking-wide">
                          Código EAN
                        </h3>
                      </div>
                      <p className="font-montserrat text-gray-300 text-sm sm:text-base font-mono leading-relaxed">
                        {product.details.ean}
                      </p>
                    </div>
                  </div>

                  {/* Ingredientes */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Info className="w-5 h-5 text-yellow-400" />
                      <h3 className="font-londrina text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                        Ingredientes
                      </h3>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
                      <p className="font-montserrat text-gray-300 text-sm sm:text-base leading-relaxed">
                        {product.details.ingredients.join(', ')}
                      </p>
                    </div>
                  </div>

                  {/* Tabela Nutricional */}
                  <div>
                    <h3 className="font-londrina text-xl sm:text-2xl lg:text-3xl font-black text-white mb-5 uppercase tracking-tight">
                      Tabela Nutricional
                    </h3>
                    <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                      <div className="p-5 sm:p-6 lg:p-7 border-b border-white/10">
                        <p className="font-montserrat text-xs sm:text-sm lg:text-base text-gray-400">
                          Porção: <span className="text-white font-semibold">{product.details.nutritionalInfo.servingSize}</span>
                        </p>
                      </div>
                      <div className="divide-y divide-white/10">
                        <div className="p-4 sm:p-5 lg:p-6 flex justify-between items-center">
                          <span className="font-montserrat text-sm sm:text-base lg:text-lg text-gray-300">Valor Energético</span>
                          <span className="font-montserrat text-sm sm:text-base lg:text-lg text-white font-bold">{product.details.nutritionalInfo.calories}</span>
                        </div>
                        <div className="p-4 sm:p-5 lg:p-6 flex justify-between items-center">
                          <span className="font-montserrat text-sm sm:text-base lg:text-lg text-gray-300">Gorduras Totais</span>
                          <span className="font-montserrat text-sm sm:text-base lg:text-lg text-white font-bold">{product.details.nutritionalInfo.totalFat}</span>
                        </div>
                        <div className="p-4 sm:p-5 lg:p-6 flex justify-between items-center">
                          <span className="font-montserrat text-sm sm:text-base lg:text-lg text-gray-300">Gorduras Saturadas</span>
                          <span className="font-montserrat text-sm sm:text-base lg:text-lg text-white font-bold">{product.details.nutritionalInfo.saturatedFat}</span>
                        </div>
                        <div className="p-4 sm:p-5 lg:p-6 flex justify-between items-center">
                          <span className="font-montserrat text-sm sm:text-base lg:text-lg text-gray-300">Gorduras Trans</span>
                          <span className="font-montserrat text-sm sm:text-base lg:text-lg text-white font-bold">{product.details.nutritionalInfo.transFat}</span>
                        </div>
                        <div className="p-4 sm:p-5 lg:p-6 flex justify-between items-center">
                          <span className="font-montserrat text-sm sm:text-base lg:text-lg text-gray-300">Carboidratos</span>
                          <span className="font-montserrat text-sm sm:text-base lg:text-lg text-white font-bold">{product.details.nutritionalInfo.carbs}</span>
                        </div>
                        <div className="p-4 sm:p-5 lg:p-6 flex justify-between items-center">
                          <span className="font-montserrat text-sm sm:text-base lg:text-lg text-gray-300">Proteínas</span>
                          <span className="font-montserrat text-sm sm:text-base lg:text-lg text-white font-bold">{product.details.nutritionalInfo.protein}</span>
                        </div>
                        <div className="p-4 sm:p-5 lg:p-6 flex justify-between items-center">
                          <span className="font-montserrat text-sm sm:text-base lg:text-lg text-gray-300">Sódio</span>
                          <span className="font-montserrat text-sm sm:text-base lg:text-lg text-white font-bold">{product.details.nutritionalInfo.sodium}</span>
                        </div>
                      </div>
                    </div>
                  </div>
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
