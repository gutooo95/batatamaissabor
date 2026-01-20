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
      <section id="receitas" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-neutral-950 relative pb-16 sm:pb-20 md:pb-24 lg:pb-32">
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

          {/* Grid de Cards - 3 Receitas Fixas com Imagens Protagonistas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {FIXED_RECIPES.map((recipe, index) => {
              return (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCardClick(recipe)}
                  className="group relative h-72 sm:h-80 md:h-96 rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-500 w-[90%] sm:w-full mx-auto"
                >
                  {/* Imagem da Receita - 100% Nítida, Protagonista com Máscara Gradiente Refinada */}
                  <motion.div 
                    className="absolute inset-0 w-full h-full overflow-hidden z-[1]"
                    style={{
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
                    }}
                  >
                    <motion.img
                      src={`/images/receitas/${recipe.imageName}`}
                      alt={recipe.title}
                      className="w-full h-full object-cover object-center"
                      style={{
                        filter: 'saturate(1.5) brightness(1.1)',
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      onError={(e) => {
                        // Fallback: placeholder elegante com ícone de chef
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          const placeholder = document.createElement('div');
                          placeholder.className = 'absolute inset-0 flex items-center justify-center bg-neutral-800';
                          placeholder.innerHTML = `
                            <div class="text-center">
                              <svg class="w-16 h-16 mx-auto mb-2 text-yellow-400/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              <p class="text-gray-500 text-xs">Imagem não encontrada</p>
                            </div>
                          `;
                          target.parentElement.appendChild(placeholder);
                        }
                      }}
                    />
                  </motion.div>
                  
                  {/* Fundo escuro sólido na parte inferior para legibilidade total */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/80 to-neutral-900 rounded-[2.5rem] z-[2]" />
                  
                  {/* Borda interna ultra-fina para definição Apple */}
                  <div className="absolute inset-0 border border-white/5 rounded-[2.5rem] pointer-events-none z-[15]" />
                  
                  {/* Glassmorphism Background - Apenas para efeito visual, sem blur na imagem */}
                  <div className="absolute inset-0 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl group-hover:border-yellow-400/30 transition-all duration-500 pointer-events-none z-[3]" />

                  {/* Conteúdo do card - Parte inferior com contraste total e z-index alto */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 z-[20]">
                    <motion.h3
                      className="font-londrina text-2xl sm:text-3xl md:text-4xl text-white font-black mb-2 drop-shadow-2xl"
                      style={{
                        textShadow: '0 4px 8px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)',
                      }}
                    >
                      {recipe.title}
                    </motion.h3>
                    
                    <p className="font-montserrat text-yellow-400/90 text-xs sm:text-sm font-semibold mb-4">
                      Com Batata Palha MAIS SABOR
                    </p>

                    {/* Botão Minimalista Centralizado */}
                    <motion.div
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 group-hover:bg-yellow-400/20 group-hover:border-yellow-400/40 transition-all duration-300 w-fit mx-auto"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <span className="font-montserrat text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
                        VER RECEITA
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
                </motion.div>
              );
            })}
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
