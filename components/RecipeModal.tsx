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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto w-full max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-neutral-900/95 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
                {/* Header com Imagem da Receita */}
                <div className="relative h-64 overflow-hidden">
                  {/* Imagem da Receita */}
                  <img
                    src={`/images/receitas/${recipe.imageName}`}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/seed/recipe-${recipe.id}/800/400`;
                    }}
                  />
                  {/* Overlay escuro para legibilidade */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
                  
                  {/* Botão fechar - Maior no mobile */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 z-10"
                    aria-label="Fechar"
                  >
                    <X className="w-6 h-6 sm:w-5 sm:h-5 text-white" />
                  </button>

                  {/* Título sobre a imagem */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-yellow-400/20 backdrop-blur-sm rounded-xl border border-yellow-400/30">
                        <ChefHat className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Timer className="w-4 h-4 text-yellow-400" />
                          <span className="font-montserrat text-xs text-white/90 font-semibold">{recipe.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-yellow-400" />
                          <span className="font-montserrat text-xs text-white/90 font-semibold">{recipe.servings}</span>
                        </div>
                      </div>
                    </div>
                    <h2 className="font-londrina text-3xl md:text-4xl font-black text-white uppercase tracking-tight drop-shadow-2xl">
                      {recipe.title}
                    </h2>
                  </div>
                </div>

                {/* Conteúdo scrollável */}
                <div className="overflow-y-auto flex-1 p-8">
                  {/* Grid de ingredientes e preparo */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Ingredientes */}
                    <div>
                      <h3 className="font-londrina text-xl font-black text-white mb-6 uppercase tracking-tight border-b border-white/10 pb-3">
                        Ingredientes
                      </h3>
                      <ul className="space-y-3">
                        {recipe.ingredients.map((ingredient, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="font-montserrat text-gray-300 flex gap-3 items-start text-sm leading-relaxed"
                          >
                            <span className="text-yellow-400 font-black shrink-0 mt-1">•</span>
                            <span className="flex-1">{ingredient}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Modo de Preparo */}
                    <div>
                      <h3 className="font-londrina text-xl font-black text-white mb-6 uppercase tracking-tight border-b border-white/10 pb-3">
                        Modo de Preparo
                      </h3>
                      <ol className="space-y-4">
                        {recipe.method.map((step, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="font-montserrat text-gray-300 text-sm leading-relaxed flex gap-3"
                          >
                            <span className="font-black text-yellow-400 shrink-0 w-6 h-6 bg-yellow-400/20 rounded-full flex items-center justify-center text-xs border border-yellow-400/30">
                              {index + 1}
                            </span>
                            <span className="flex-1">{step}</span>
                          </motion.li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-white/5">
                  <p className="font-montserrat text-center text-sm text-gray-400">
                    <span className="font-bold text-yellow-400">Dica:</span> Sirva quente com arroz branco e{' '}
                    <span className="font-bold text-yellow-400">Batata Palha MAIS SABOR</span> para o melhor sabor!
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
