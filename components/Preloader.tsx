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
          {/* Logo com animação de escala suave (0.9 a 1.0) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-10"
          >
            <img
              src="/images/logo/SEM%20FUNDO.png"
              alt="Batatas Mais Sabor"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
              onError={(e) => {
                // Fallback caso a imagem não carregue
                const target = e.currentTarget;
                if (target.src.includes('SEM%20FUNDO') || target.src.includes('SEM FUNDO')) {
                  target.src = '/images/logo/Logo%20Batata%20mais%20Sabor.png';
                } else {
                  target.style.display = 'none';
                }
              }}
            />
          </motion.div>

          {/* Barra de Progresso - 200px, 1px de altura */}
          <div className="relative w-[200px] h-[1px] bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: 0.016,
                ease: "easeOut",
              }}
              className="absolute left-0 top-0 h-full bg-white"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
