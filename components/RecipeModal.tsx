import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Timer, Users, ChefHat } from 'lucide-react';
import { Recipe } from '../constants-recipes';

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, isOpen, onClose }) => {
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

  if (!recipe) return null;

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
                {/* Header com imagem compacta */}
                <div className="relative h-32 sm:h-40 overflow-hidden">
                  <img
                    src={`/images/receitas/${recipe.imageName}`}
                    alt={`Receita ${recipe.title} com Batata Palha Mais Sabor - Receitas gourmet e dicas do chef`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/seed/recipe-${recipe.id}/800/400`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-1.5 bg-yellow-400/20 backdrop-blur-sm rounded-lg border border-yellow-400/30">
                        <ChefHat className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <Timer className="w-3.5 h-3.5 text-yellow-400" />
                          <span className="font-montserrat text-xs text-white font-semibold">{recipe.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-yellow-400" />
                          <span className="font-montserrat text-xs text-white font-semibold">{recipe.servings}</span>
                        </div>
                      </div>
                    </div>
                    <h2 className="font-londrina text-xl font-black text-white uppercase drop-shadow-lg">
                      {recipe.title}
                    </h2>
                  </div>
                </div>

                {/* Conteúdo scrollável */}
                <div className="overflow-y-auto flex-1 p-4 sm:p-5">
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Ingredientes */}
                    <div>
                      <h3 className="font-londrina text-base font-black text-white mb-4 uppercase border-b border-white/10 pb-2">
                        Ingredientes
                      </h3>
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="font-montserrat text-sm text-white/80 flex gap-2 items-start"
                          >
                            <span className="text-yellow-400 font-bold shrink-0 mt-0.5">•</span>
                            <span className="flex-1">{ingredient}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Modo de Preparo */}
                    <div>
                      <h3 className="font-londrina text-base font-black text-white mb-4 uppercase border-b border-white/10 pb-2">
                        Modo de Preparo
                      </h3>
                      <ol className="space-y-3">
                        {recipe.method.map((step, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="font-montserrat text-sm text-white/80 flex gap-2"
                          >
                            <span className="font-bold text-yellow-400 shrink-0 w-5 h-5 bg-yellow-400/20 rounded-full flex items-center justify-center text-xs border border-yellow-400/30">
                              {index + 1}
                            </span>
                            <span className="flex-1">{step}</span>
                          </motion.li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>

                {/* Footer compacto */}
                <div className="px-5 py-4 border-t border-white/10 bg-white/5">
                  <p className="font-montserrat text-center text-xs text-white/70">
                    <span className="font-semibold text-yellow-400">Dica:</span> Sirva quente com arroz branco e{' '}
                    <span className="font-semibold text-yellow-400">Batata Palha MAIS SABOR</span>!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RecipeModal;
