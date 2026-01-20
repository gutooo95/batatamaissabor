import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  isPreloaderComplete: boolean;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ isPreloaderComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const phoneNumber = '5544988231595'; // (44) 98823-1595 formatado
  const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os produtos Batatas Mais Sabor.');

  useEffect(() => {
    if (isPreloaderComplete) {
      // Aguarda 1 segundo após o preloader para aparecer
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPreloaderComplete]);

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9998]"
        >
          {/* Pulse Animation */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-green-500 rounded-full"
            style={{ filter: 'blur(8px)' }}
          />

          {/* Button */}
          <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/15 hover:border-green-400/50 transition-all duration-300 group"
            aria-label="Fale conosco no WhatsApp"
          >
            {/* Inner Glow */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle at center, rgba(37, 211, 102, 0.3) 0%, transparent 70%)',
              }}
            />
            
            <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 relative z-10" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppButton;
