import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FIXED_RECIPES, Recipe } from '../constants-recipes';
import RecipeModal from './RecipeModal';

const Recipes: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section id="receitas" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-neutral-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <span className="font-pacifico text-yellow-400 text-lg sm:text-xl md:text-2xl block mb-2">
              Cozinhando com Sabor
            </span>
            <h2 className="font-londrina text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white">
              DICAS DO CHEF
            </h2>
          </motion.div>

          {/* Grid de Cards - 3 Receitas Fixas com Glassmorphism */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {FIXED_RECIPES.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                whileHover={{ scale: 1.03, y: -8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(recipe)}
                className="group relative h-72 sm:h-80 md:h-96 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 w-[90%] sm:w-full mx-auto"
              >
                {/* Imagem da Receita - Parte Superior com Transparência */}
                <div 
                  className="absolute inset-0 top-0 h-[50%] bg-cover bg-center rounded-t-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  style={{
                    backgroundImage: `url(/images/receitas/${recipe.imageName === 'pizza-com-batata-palha' ? 'Pizza-de-batata-palha.jpg' : recipe.imageName})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                
                {/* Glassmorphism Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-neutral-800/70 to-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl group-hover:border-yellow-400/30 transition-all duration-500" />
                
                {/* Overlay de brilho sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Conteúdo do card */}
                <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 z-[4]">
                  <motion.h3
                    className="font-londrina text-3xl sm:text-4xl md:text-5xl text-white font-black mb-3 drop-shadow-2xl"
                    style={{
                      textShadow: '0 4px 8px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(251, 191, 36, 0.3)',
                    }}
                  >
                    {recipe.title}
                  </motion.h3>
                  
                  <p className="font-montserrat text-yellow-400/90 text-sm sm:text-base font-semibold mb-4">
                    Com Batata Palha MAIS SABOR
                  </p>

                  {/* Indicador de clique com glassmorphism */}
                  <motion.div
                    className="mt-4 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 group-hover:bg-yellow-400/20 group-hover:border-yellow-400/40 transition-all duration-300"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <span className="font-montserrat text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
                      Ver Receita
                    </span>
                    <motion.svg
                      className="w-4 h-4 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.div>
                </div>

                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Recipes;
