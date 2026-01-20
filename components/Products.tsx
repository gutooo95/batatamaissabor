import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { PRODUCTS } from '../constants';
import { Category } from '../types';
import { Product } from '../types';

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Separar produtos por categoria
  const onduladasProducts = PRODUCTS.filter(p => p.category === Category.WAVY);
  const palhaProducts = PRODUCTS.filter(p => p.category === Category.STICK);

  const handleDetailsClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section id="produtos" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Título Principal */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 sm:mb-20 md:mb-24"
        >
          <h2 className="font-pacifico text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white mb-4 sm:mb-6" style={{ fontSize: 'clamp(2rem, 4vw + 1rem, 4.5rem)' }}>
            Nossos Produtos
          </h2>
          <p className="font-montserrat text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 1.5vw + 0.5rem, 1.125rem)' }}>
            Seja para um lanche rápido ou para elevar o nível das suas receitas, temos a crocância perfeita esperando por você.
          </p>
        </motion.div>

        {/* LINHA ONDULADAS - 3 Produtos lado a lado */}
        <div className="mb-20 sm:mb-24 md:mb-32">
          <div className="flex flex-col items-center mb-12 sm:mb-16">
            <h3 className="font-pacifico text-3xl sm:text-4xl md:text-5xl text-white mb-3 sm:mb-4">
              Onduladas
            </h3>
            <div className="h-0.5 w-20 sm:w-24 md:w-28 bg-white/20 rounded-full" />
          </div>

          {/* Grid 3 colunas - Altura uniforme */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 justify-items-center">
            {onduladasProducts.map((product) => (
              <div key={product.id} className="w-full h-[600px] sm:h-[650px] md:h-[680px]">
                <ProductCard product={product} onDetailsClick={handleDetailsClick} />
              </div>
            ))}
          </div>
        </div>

        {/* LINHA BATATA PALHA - 4 Produtos lado a lado */}
        <div className="mt-20 sm:mt-24 md:mt-32">
          <div className="flex flex-col items-center mb-12 sm:mb-16">
            <h3 className="font-pacifico text-3xl sm:text-4xl md:text-5xl text-white mb-3 sm:mb-4">
              Batata Palha
            </h3>
            <div className="h-0.5 w-20 sm:w-24 md:w-28 bg-white/20 rounded-full" />
          </div>

          {/* Grid 4 colunas - Altura uniforme - 1 coluna no mobile, 2 no tablet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 justify-items-center">
            {palhaProducts.map((product) => (
              <div key={product.id} className="w-full max-w-sm sm:max-w-none h-[550px] sm:h-[600px] md:h-[650px] lg:h-[680px]">
                <ProductCard product={product} onDetailsClick={handleDetailsClick} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Detalhes do Produto */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </section>
  );
};

export default Products;
