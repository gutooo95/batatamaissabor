import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simula carregamento de 0 a 100 em 2.5 segundos com curva easeOut
    const duration = 2500; // 2.5 segundos
    const startTime = Date.now();

    const easeOut = (t: number): number => {
      return 1 - Math.pow(1 - t, 3); // Curva easeOut cúbica
    };

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const normalizedTime = Math.min(elapsed / duration, 1);
      const easedTime = easeOut(normalizedTime);
      const percentage = easedTime * 100;
      
      setProgress(percentage);

      if (normalizedTime < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        // Quando completa, aguarda um pouco e inicia animação de saída
        setTimeout(() => {
          setIsComplete(true);
        }, 300);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  // Quando a animação de saída completa, chama onComplete
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 800); // Duração da animação de saída
      return () => clearTimeout(timer);
    }
  }, [isComplete, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: '-100%',
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-neutral-950 flex flex-col items-center justify-center"
        >
          {/* Logo com animação de mola */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              mass: 1,
            }}
            className="mb-10"
          >
            <motion.div
              animate={{
                filter: progress >= 100 ? 'brightness(1.3)' : 'brightness(1)',
              }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/images/logo/SEM FUNDO.png"
                alt="Batatas Mais Sabor"
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
                onError={(e) => {
                  // Fallback caso a imagem não carregue
                  const target = e.currentTarget;
                  target.style.display = 'none';
                }}
              />
            </motion.div>
          </motion.div>

          {/* Barra de Progresso */}
          <div className="relative w-[200px] h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: 0.016, // Atualiza suavemente
                ease: "easeOut",
              }}
              className="absolute left-0 top-0 h-full bg-white rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
