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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal - Glassmorphism Apple Style */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto w-full max-w-xl max-h-[calc(90vh-5rem)] sm:max-h-[calc(90vh-6rem)] overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão fechar - Sempre visível no topo direito */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center transition-all duration-200 z-[100] border border-white/30 shadow-lg"
                aria-label="Fechar"
                title="Fechar (ESC)"
              >
                <X className="w-5 h-5 text-white" strokeWidth={2.5} />
              </button>

              {/* Container com glassmorphism */}
              <div className="bg-white/10 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col max-h-[calc(90vh-5rem)] sm:max-h-[calc(90vh-6rem)]">
                {/* Header compacto */}
                <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10">
                  <h2 className="font-londrina text-2xl font-black text-white mb-1 uppercase">
                    {product.name}
                  </h2>
                  <p className="font-pacifico text-lg text-yellow-400 mb-1">
                    {product.flavor}
                  </p>
                  <p className="font-montserrat text-sm text-white/70">
                    {product.weight}
                  </p>
                </div>

                {/* Conteúdo scrollável */}
                <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-4 sm:py-5">
                  {/* Imagem compacta */}
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="relative w-32 h-40 sm:w-36 sm:h-44">
                      <img
                        src={product.imageUrl}
                        alt={`Pacote de ${product.name} ${product.flavor} ${product.weight} Batatas Mais Sabor - ${product.category === 'Onduladas' ? 'Batata ondulada crocante premium' : 'Batata palha premium'} para receitas gourmet e snacks saudáveis`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = `https://picsum.photos/seed/product-${product.id}/400/500`;
                        }}
                      />
                    </div>
                  </div>

                  {/* Grid compacto */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-white/10 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-yellow-400" />
                        <h3 className="font-londrina text-sm font-black text-white uppercase">
                          Embalagem
                        </h3>
                      </div>
                      <p className="font-montserrat text-xs text-white/80">
                        {product.details.packaging}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Barcode className="w-4 h-4 text-yellow-400" />
                        <h3 className="font-londrina text-sm font-black text-white uppercase">
                          EAN
                        </h3>
                      </div>
                      <p className="font-montserrat text-xs font-mono text-white">
                        {product.details.ean}
                      </p>
                    </div>
                  </div>

                  {/* Ingredientes */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <Info className="w-4 h-4 text-yellow-400" />
                      <h3 className="font-londrina text-base sm:text-lg font-black text-white uppercase">
                        Ingredientes
                      </h3>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20">
                      <p className="font-montserrat text-sm text-white/80 leading-relaxed">
                        {product.details.ingredients.join(', ')}
                      </p>
                    </div>
                  </div>

                  {/* Tabela Nutricional compacta */}
                  <div>
                    <h3 className="font-londrina text-base sm:text-lg font-black text-white mb-2 sm:mb-3 uppercase">
                      Tabela Nutricional
                    </h3>
                    <div className="bg-white/10 backdrop-blur-xl rounded-lg sm:rounded-xl border border-white/20 overflow-hidden">
                      <div className="px-4 py-2 border-b border-white/10 bg-white/5">
                        <p className="font-montserrat text-xs text-white/70">
                          Porção: <span className="font-semibold text-white">25g (1 porção)</span>
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
                            className="px-4 py-2 flex justify-between items-center"
                          >
                            <span className="font-montserrat text-xs text-white/70">
                              {item.label}
                            </span>
                            <span className="font-montserrat text-xs font-semibold text-white">
                              {item.value}
                            </span>
                          </div>
                        ))}
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
