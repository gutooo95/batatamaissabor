import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ShoppingCart, ArrowRight } from 'lucide-react';

interface FloatingElement {
  id: number;
  type: 'potato' | 'package' | 'sparkle';
  x: number;
  y: number;
  size: number;
  rotation: number;
  imageIndex: number;
  blur: number;
  opacity: number;
  initialDelay: number;
  layer: 'foreground' | 'midground' | 'background';
}

interface HeroProps {
  isPreloaderComplete?: boolean;
}

const Hero: React.FC<HeroProps> = ({ isPreloaderComplete = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  // Detecta se é mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Mouse tracking para efeito magnético suave (damping: 20)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  
  // Spring mais suave para o pacote principal
  const packageSpringX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const packageSpringY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Imagens disponíveis
  const potatoImages = ['batata.png', 'Potato_Chips_PNG_Clip_Art_Image.png'];

  // Gera elementos flutuantes com depth of field (reduzido no mobile)
  const generateFloatingElements = (mobile: boolean): FloatingElement[] => {
    const elements: FloatingElement[] = [];
    
    if (mobile) {
      // MOBILE: Pacote Churrasco no canto inferior
      elements.push({
        id: 10,
        type: 'package',
        x: 75, // Canto direito
        y: 65, // Inferior
        size: 180,
        rotation: -12,
        imageIndex: 0,
        blur: 0,
        opacity: 1,
        initialDelay: 0.3,
        layer: 'midground',
      });
      
      // 3-4 batatas "explodindo" de trás do pacote em direções diferentes
      const explodingPotatoes = [
        { x: 70, y: 55, size: 50, rotation: -30, blur: 2 }, // Cima-esquerda
        { x: 85, y: 60, size: 45, rotation: 45, blur: 3 }, // Cima-direita
        { x: 65, y: 70, size: 40, rotation: 60, blur: 4 }, // Esquerda
        { x: 80, y: 75, size: 55, rotation: -45, blur: 2 }, // Direita
      ];
      
      explodingPotatoes.forEach((potato, i) => {
        elements.push({
          id: 20 + i,
          type: 'potato',
          x: potato.x,
          y: potato.y,
          size: potato.size,
          rotation: potato.rotation,
          imageIndex: i % 2,
          blur: potato.blur,
          opacity: 0.6,
          initialDelay: 0.4 + i * 0.1,
          layer: 'background',
        });
      });
      
      return elements;
    }
    
    // DESKTOP: Todos os elementos
    // FOREGROUND: 2 batatas grandes nas bordas com blur
    const foregroundPotatoes = [
      { x: 5, y: 20, size: 200, blur: 12, rotation: -25 },
      { x: 92, y: 25, size: 180, blur: 8, rotation: 30 },
    ];
    
    foregroundPotatoes.forEach((pos, i) => {
      elements.push({
        id: i,
        type: 'potato',
        x: pos.x,
        y: pos.y,
        size: pos.size,
        rotation: pos.rotation,
        imageIndex: i % 2,
        blur: pos.blur,
        opacity: 1,
        initialDelay: i * 0.1,
        layer: 'foreground',
      });
    });

    // MIDGROUND: Pacote Churrasco
    elements.push({
      id: 10,
      type: 'package',
      x: 58,
      y: 35,
      size: 240,
      rotation: -12,
      imageIndex: 0,
      blur: 0,
      opacity: 1,
      initialDelay: 0.3,
      layer: 'midground',
    });

    // BACKGROUND: Batatas menores
    const backgroundElements = [
      { x: 20, y: 60, size: 80, blur: 3, rotation: 45, type: 'potato' as const },
      { x: 75, y: 70, size: 70, blur: 4, rotation: -30, type: 'potato' as const },
      { x: 15, y: 80, size: 60, blur: 5, rotation: 60, type: 'potato' as const },
      { x: 85, y: 75, size: 65, blur: 3, rotation: -45, type: 'potato' as const },
    ];

    backgroundElements.forEach((pos, i) => {
      elements.push({
        id: 20 + i,
        type: pos.type,
        x: pos.x,
        y: pos.y,
        size: pos.size,
        rotation: pos.rotation,
        imageIndex: i % 2,
        blur: pos.blur,
        opacity: 0.5,
        initialDelay: 0.5 + i * 0.1,
        layer: 'background',
      });
    });

    // Fagulhas (sparkles) no background
    const sparkles = Array.from({ length: 15 }, (_, i) => ({
      id: 100 + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 4,
      rotation: Math.random() * 360,
    }));

    sparkles.forEach((sparkle) => {
      elements.push({
        id: sparkle.id,
        type: 'sparkle',
        x: sparkle.x,
        y: sparkle.y,
        size: sparkle.size,
        rotation: sparkle.rotation,
        imageIndex: 0,
        blur: 0,
        opacity: 0.5,
        initialDelay: Math.random() * 1,
        layer: 'background',
      });
    });

    return elements;
  };

  const [floatingElements] = useState<FloatingElement[]>(() => generateFloatingElements(false));
  
  // Atualiza elementos quando muda para mobile
  useEffect(() => {
    // Não recria elementos, apenas ajusta visibilidade via CSS
  }, [isMobile]);

  // Partículas transformadas em batatas e fagulhas com blur cinematográfico
  const saltParticles = Array.from({ length: isMobile ? 8 : 15 }, (_, i) => {
    const isPotato = Math.random() > 0.5;
    const isEdge = Math.random() > 0.7; // 30% nas bordas (mais blur)
    return {
      id: i,
      x: isEdge ? (Math.random() > 0.5 ? Math.random() * 10 : 90 + Math.random() * 10) : Math.random() * 100,
      y: isEdge ? (Math.random() > 0.5 ? Math.random() * 10 : 90 + Math.random() * 10) : Math.random() * 100,
      size: isPotato ? (15 + Math.random() * 25) : (3 + Math.random() * 5),
      delay: Math.random() * 2,
      isPotato: isPotato,
      blur: isEdge ? (8 + Math.random() * 12) : (2 + Math.random() * 4), // Muito blur nas bordas
    };
  });

  // Cria transforms para cada tipo de elemento (hooks devem estar no nível superior)
  // Parallax diferenciado: batatas explodindo se movem mais rápido que o pacote
  const packageXTransform = useTransform(packageSpringX, (val) => val * 10);
  const packageYTransform = useTransform(packageSpringY, (val) => val * 10);
  const foregroundXTransform = useTransform(springX, (val) => val * 25);
  const foregroundYTransform = useTransform(springY, (val) => val * 25);
  const backgroundXTransform = useTransform(springX, (val) => val * 8); // Mais rápido para batatas explodindo
  const backgroundYTransform = useTransform(springY, (val) => val * 8); // Mais rápido para batatas explodindo
  const midgroundXTransform = useTransform(springX, (val) => val * 15);
  const midgroundYTransform = useTransform(springY, (val) => val * 15);

  // Renderiza elemento flutuante
  const renderFloatingElement = (element: FloatingElement, index: number) => {
    // Determina qual transform usar baseado no tipo e camada
    let xTransform, yTransform;
    if (element.type === 'package') {
      xTransform = packageXTransform;
      yTransform = packageYTransform;
    } else if (element.layer === 'foreground') {
      xTransform = foregroundXTransform;
      yTransform = foregroundYTransform;
    } else if (element.layer === 'background') {
      xTransform = backgroundXTransform;
      yTransform = backgroundYTransform;
    } else {
      xTransform = midgroundXTransform;
      yTransform = midgroundYTransform;
    }
    
    // Velocidade de movimento baseada na camada
    const movementSpeed = element.layer === 'background' ? 5 + Math.random() * 3 : 3 + Math.random() * 2;
    
    return (
      <motion.div
        key={element.id}
        className="absolute pointer-events-none"
        style={{
          left: `${element.x}%`,
          top: `${element.y}%`,
          width: `${element.size}px`,
          height: `${element.size}px`,
          filter: element.blur > 0 ? `blur(${element.blur}px)` : 'none',
          opacity: element.opacity,
          zIndex: element.layer === 'foreground' ? 30 : element.layer === 'midground' ? 15 : 5,
        }}
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: element.opacity,
        }}
        transition={{
          duration: 0.8,
          delay: element.initialDelay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Efeito magnético - mais suave para o pacote principal */}
        <motion.div
          style={{
            x: xTransform,
            y: yTransform,
          }}
          animate={{
            y: element.layer === 'background' 
              ? [-4, 4, -4] 
              : [-8, 8, -8],
            rotate: element.layer === 'background'
              ? [element.rotation, element.rotation + 2, element.rotation]
              : [element.rotation, element.rotation + 5, element.rotation],
          }}
          transition={{
            y: { 
              duration: movementSpeed, 
              repeat: Infinity, 
              ease: "easeInOut" 
            },
            rotate: { 
              duration: movementSpeed * 1.3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            },
          }}
          className="w-full h-full"
          style={{
            backgroundColor: 'transparent',
            background: 'transparent',
          }}
        >
          {element.type === 'sparkle' ? (
            <div className="w-full h-full rounded-full bg-yellow-300/60 blur-[1px]" />
          ) : (
            <img
              src={
                element.type === 'potato'
                  ? `/images/potatoes/${potatoImages[element.imageIndex]}`
                  : `/images/embalagens/batata-ondulada-churrasco.png`
              }
              alt={element.type === 'potato' ? 'Batata' : 'Embalagem Churrasco'}
              className="w-full h-full object-contain"
              style={{
                mixBlendMode: 'normal',
                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))',
                imageRendering: 'crisp-edges',
                backgroundColor: 'transparent',
                background: 'transparent',
              }}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section 
      id="inicio" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fundo: Vermelho profundo com vinheta cinematográfica */}
      <div className="absolute inset-0 bg-[#8B0000]">
        {/* Vignette: Ilumina o centro e escurece as quinas */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1)_0%,_rgba(0,0,0,0.8)_100%)]" />
        
        {/* Background image com overlay */}
        <img 
          src="/images/hero/hero-background.png" 
          alt=""
          className="w-full h-full object-cover opacity-15"
          loading="eager"
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
      </div>

      {/* Layer 1: Batatas e fagulhas com blur cinematográfico */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {saltParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              filter: `blur(${particle.blur}px)`,
              backdropFilter: `blur(${particle.blur}px)`,
            }}
            animate={{
              y: [-3, 3, -3],
              x: [-2, 2, -2],
              opacity: [0.15, 0.35, 0.15],
              rotate: particle.isPotato ? [0, 360] : [0, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          >
            {particle.isPotato ? (
              <img
                src={`/images/potatoes/${potatoImages[particle.id % 2]}`}
                alt="Batata"
                className="w-full h-full object-contain opacity-40"
                style={{
                  mixBlendMode: 'normal',
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full rounded-full bg-yellow-300/30" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Layer 2: Background Elements (batatas pequenas e fagulhas) */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        {floatingElements
          .filter(el => el.layer === 'background')
          .map((element, index) => renderFloatingElement(element, index))}
      </div>

      {/* Layer 3: Midground - Pacote Churrasco (ATRÁS de tudo no mobile) */}
      <div className="absolute inset-0 z-[3] md:z-[15] pointer-events-none">
        {floatingElements
          .filter(el => el.layer === 'midground')
          .map((element, index) => {
            // No mobile: posição para baixo e para o lado, escala reduzida, z-index muito baixo
            const mobileY = isMobile ? 65 : element.y; // Mais abaixo no mobile
            const mobileX = isMobile ? 75 : element.x; // Para o lado direito no mobile
            const mobileScale = isMobile ? 0.6 : 1; // Reduzido para 60% no mobile
            return (
              <motion.div
                key={element.id}
                className="absolute pointer-events-none"
                style={{
                  left: `${mobileX}%`,
                  top: `${mobileY}%`,
                  width: `${isMobile ? element.size * mobileScale : element.size}px`,
                  height: `${isMobile ? element.size * mobileScale : element.size}px`,
                  filter: element.blur > 0 ? `blur(${element.blur}px)` : 'none',
                  opacity: isMobile ? element.opacity * 0.7 : element.opacity, // Mais transparente no mobile
                  zIndex: isMobile ? 3 : 15, // Z-index muito baixo no mobile (atrás de tudo)
                  backgroundColor: 'transparent',
                  background: 'transparent',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={isPreloaderComplete ? { scale: 1, opacity: isMobile ? element.opacity * 0.7 : element.opacity } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: isPreloaderComplete ? element.initialDelay : 0, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  style={{
                    x: packageXTransform,
                    y: packageYTransform,
                    backgroundColor: 'transparent',
                    background: 'transparent',
                  }}
                  animate={{
                    y: [-8, 8, -8],
                    rotate: [element.rotation, element.rotation + 5, element.rotation],
                  }}
                  transition={{
                    y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="w-full h-full"
                >
                  <img
                    src="/images/embalagens/batata-ondulada-churrasco.png"
                    alt="Embalagem Churrasco"
                    className="w-full h-full object-contain"
                    style={{
                      mixBlendMode: 'normal',
                      filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))',
                      imageRendering: 'crisp-edges',
                      backgroundColor: 'transparent',
                      background: 'transparent',
                    }}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
      </div>

      {/* Layer 4: Título e Conteúdo Principal (ACIMA do pacote) - Mobile-First */}
      <div className="absolute inset-0 flex items-center justify-center z-[20] text-center text-white pt-24 sm:pt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ opacity }}
          className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Slogan acima do título - Cor dourada nítida, mais espaço no mobile */}
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={isPreloaderComplete ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: isPreloaderComplete ? 0.3 : 0, duration: 0.8 }}
            className="font-pacifico text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-6 sm:mb-5 md:mb-6 block relative z-[21]"
            style={{
              color: '#FFD700',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              filter: 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3))',
            }}
          >
            A verdadeira explosão de sabor!
          </motion.span>
          
          {/* Título Principal - GIGANTE no mobile, 100% visibilidade, mais espaço */}
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={isPreloaderComplete ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ delay: isPreloaderComplete ? 0.5 : 0, duration: 1 }}
            className="font-londrina font-black mb-8 sm:mb-8 md:mb-10 lg:mb-12 leading-tight tracking-tighter relative z-[21] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
            style={{
              color: '#FFFFFF',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            }}
          >
            BATATAS <br /> 
            <span 
              style={{
                color: '#FFD700',
                textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                filter: 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3))',
              }}
            >
              MAIS SABOR
            </span>
          </motion.h1>

          {/* Botões CTA - Glass-Premium, mais espaço no mobile */}
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={isPreloaderComplete ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
            transition={{ delay: isPreloaderComplete ? 0.9 : 0, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 sm:gap-6 md:gap-8 justify-center items-center relative z-[25] w-full sm:w-auto px-2 sm:px-0 mt-4 sm:mt-0"
          >
            {/* Botão Principal - Glass-Premium com brilho no hover */}
            <motion.a
              href="#produtos"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-[95%] sm:w-auto px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 rounded-2xl overflow-hidden flex items-center justify-center gap-3 sm:gap-4"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Brilho suave de dentro para fora no hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
                }}
              />
              
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10" />
              <span className="font-montserrat font-bold text-white text-sm sm:text-base md:text-lg lg:text-xl relative z-10">
                PROVAR AGORA
              </span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="relative z-10"
              >
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
            </motion.a>

            {/* Botão Secundário - Glass-Premium com brilho no hover */}
            <motion.a
              href="#origem"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-[95%] sm:w-auto px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 rounded-2xl overflow-hidden flex items-center justify-center gap-2 transition-all"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              }}
            >
              {/* Brilho suave de dentro para fora no hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
                }}
              />
              
              <span className="font-montserrat font-semibold text-white text-sm sm:text-base md:text-lg lg:text-xl relative z-10">
                NOSSA ORIGEM
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Layer 5: Foreground - Batatas Grandes Desfocadas (oculto no mobile) */}
      <div className="absolute inset-0 z-[30] pointer-events-none hidden md:block">
        {floatingElements
          .filter(el => el.layer === 'foreground')
          .map((element, index) => renderFloatingElement(element, index))}
      </div>

    </section>
  );
};

export default Hero;
