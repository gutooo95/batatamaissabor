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

const Hero: React.FC = () => {
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
      // MOBILE: Apenas pacote Churrasco e 1 batata de fundo
      elements.push({
        id: 10,
        type: 'package',
        x: 50, // Centralizado
        y: 40, // Mais abaixo para não cobrir texto
        size: 180, // Menor no mobile
        rotation: -12,
        imageIndex: 0,
        blur: 0,
        opacity: 1,
        initialDelay: 0.3,
        layer: 'midground',
      });
      
      // Apenas 1 batata de fundo no mobile
      elements.push({
        id: 20,
        type: 'potato',
        x: 80,
        y: 75,
        size: 60,
        rotation: 45,
        imageIndex: 0,
        blur: 5,
        opacity: 0.4,
        initialDelay: 0.5,
        layer: 'background',
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

  // Partículas de sal e tempero (Background - reduzidas no mobile)
  const saltParticles = Array.from({ length: isMobile ? 10 : 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 2,
  }));

  // Cria transforms para cada tipo de elemento (hooks devem estar no nível superior)
  const packageXTransform = useTransform(packageSpringX, (val) => val * 10);
  const packageYTransform = useTransform(packageSpringY, (val) => val * 10);
  const foregroundXTransform = useTransform(springX, (val) => val * 25);
  const foregroundYTransform = useTransform(springY, (val) => val * 25);
  const backgroundXTransform = useTransform(springX, (val) => val * 5);
  const backgroundYTransform = useTransform(springY, (val) => val * 5);
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

      {/* Layer 1: Partículas de sal e tempero (Background - opacity reduzida) */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {saltParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-yellow-300/20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [-2, 2, -2],
              x: [-1, 1, -1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3 + Math.random(),
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Layer 2: Background Elements (batatas pequenas e fagulhas) */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        {floatingElements
          .filter(el => el.layer === 'background')
          .map((element, index) => renderFloatingElement(element, index))}
      </div>

      {/* Layer 3: Midground - Pacote Churrasco (ATRÁS do título) - Ajustado no mobile */}
      <div className="absolute inset-0 z-[15] pointer-events-none">
        {floatingElements
          .filter(el => el.layer === 'midground')
          .map((element, index) => {
            // No mobile, ajusta posição para não cobrir texto
            const mobileY = isMobile ? element.y + 10 : element.y;
            const mobileX = isMobile ? 50 : element.x; // Centraliza no mobile
            return (
              <motion.div
                key={element.id}
                className="absolute pointer-events-none"
                style={{
                  left: `${mobileX}%`,
                  top: `${mobileY}%`,
                  width: `${isMobile ? element.size * 0.75 : element.size}px`,
                  height: `${isMobile ? element.size * 0.75 : element.size}px`,
                  filter: element.blur > 0 ? `blur(${element.blur}px)` : 'none',
                  opacity: element.opacity,
                  zIndex: 15,
                  backgroundColor: 'transparent',
                  background: 'transparent',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: element.opacity }}
                transition={{ duration: 0.8, delay: element.initialDelay, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Layer 4: Título e Conteúdo Principal (ACIMA do pacote) - Centralizado Perfeitamente */}
      <div className="absolute inset-0 flex items-center justify-center z-[20] text-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ opacity }}
          className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Slogan acima do título */}
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-pacifico text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#FFD700] mb-4 sm:mb-6 block drop-shadow-lg relative z-[21]"
            style={{
              textShadow: '0 2px 8px rgba(255, 215, 0, 0.4), 0 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            A verdadeira explosão de sabor!
          </motion.span>
          
          {/* Título Principal com Gradiente Suave - Sem filtros de sombra na frente */}
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-londrina font-black mb-8 sm:mb-10 md:mb-12 leading-none tracking-tighter relative z-[21]"
            style={{
              fontSize: 'clamp(2rem, 8vw, 5rem)',
              background: 'linear-gradient(to bottom, #FFFFFF, #F5F5DC)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            BATATAS <br /> 
            <span 
              style={{
                background: 'linear-gradient(to bottom, #FFD700, #FFA500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MAIS SABOR
            </span>
          </motion.h1>

          {/* Botões CTA - Alinhados lado a lado, centralizados, com gap idêntico */}
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-row gap-6 sm:gap-8 justify-center items-center relative z-[25]"
          >
            {/* Botão Principal */}
            <motion.a
              href="#produtos"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 rounded-2xl overflow-hidden flex items-center gap-3 sm:gap-4"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut",
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

            {/* Botão Secundário */}
            <motion.a
              href="#origem"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 rounded-2xl flex items-center gap-2 transition-all"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(15px) saturate(180%)',
                WebkitBackdropFilter: 'blur(15px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              }}
            >
              <span className="font-montserrat font-semibold text-white text-sm sm:text-base md:text-lg lg:text-xl">
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
