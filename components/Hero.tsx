import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ShoppingCart, ArrowRight, FileText, Handshake } from 'lucide-react';

interface FloatingElement {
  id: number;
  type: 'potato' | 'package' | 'sparkle' | 'salt';
  x: number;
  y: number;
  size: number;
  rotation: number;
  imageIndex: number;
  blur: number;
  opacity: number;
  initialDelay: number;
  layer: 'foreground' | 'midground' | 'background' | 'salt-layer' | 'small-potatoes' | 'blur-potatoes';
  parallaxSpeed?: number; // Velocidade de parallax no scroll
}

interface HeroProps {
  isPreloaderComplete?: boolean;
}

const Hero: React.FC<HeroProps> = ({ isPreloaderComplete = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Parallax transforms para scroll (velocidades diferentes por camada)
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -50]); // Camada fundo: move mais rápido
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -30]); // Camada meio: velocidade média
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -20]); // Camada frente: move mais devagar
  const textY = useTransform(scrollYProgress, [0, 1], [0, -10]); // Texto: move menos
  
  // Detecta se é mobile
  const [isMobile, setIsMobile] = useState(false);
  
  // Estado para o carrossel de imagens
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    '/images/hero/Batata mais sabor-1769036321019.png',
    '/images/hero/Batata mais sabor-1769036762231.png'
  ];
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Carrossel automático - muda a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);
  
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
      // 2-3 batatas chips menores no topo com blur intenso (preencher espaço superior)
      const topPotatoes = [
        { x: 20, y: 15, size: 35, rotation: -25, blur: 8 }, // Topo-esquerda com blur intenso
        { x: 80, y: 12, size: 30, rotation: 40, blur: 10 }, // Topo-direita com blur muito intenso
        { x: 50, y: 8, size: 28, rotation: -15, blur: 9 }, // Topo-centro com blur intenso
      ];
      
      topPotatoes.forEach((potato, i) => {
        elements.push({
          id: 30 + i,
          type: 'potato',
          x: potato.x,
          y: potato.y,
          size: potato.size,
          rotation: potato.rotation,
          imageIndex: i % 2,
          blur: potato.blur,
          opacity: 0.4, // Mais transparente para não competir com o texto
          initialDelay: 0.2 + i * 0.1,
          layer: 'background',
        });
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

  // Sistema de camadas dinâmicas para mobile (Centralização Atmosférica - Apple Style)
  const generateMobileLayers = (): {
    topSaltSpices: Array<{ id: number; x: number; y: number; size: number; opacity: number; delay: number }>;
    edgeBlurPotatoes: Array<{ id: number; x: number; y: number; size: number; rotation: number; imageIndex: number; blur: number; opacity: number; delay: number; zIndex: number }>;
  } => {
    // Topo da Tela: Partículas de sal e temperos em slow motion (opacidade reduzida)
    const topSaltSpices = Array.from({ length: 15 }, (_, i) => ({
      id: 1000 + i,
      x: Math.random() * 100,
      y: Math.random() * 25, // Concentrado no topo (0-25%)
      size: 2 + Math.random() * 4,
      opacity: 0.1 + Math.random() * 0.15, // Opacidade reduzida
      delay: Math.random() * 3, // Slow motion delay
    }));

    // Bordas Superiores: Duas batatas onduladas em escala 1.5x com blur(12px) - "coladas na lente"
    const edgeBlurPotatoes = [
      {
        id: 2001,
        x: 5, // Borda esquerda superior
        y: 3,
        size: (60 + Math.random() * 30) * 1.5, // Escala 1.5x
        rotation: -25,
        imageIndex: 0,
        blur: 12, // Blur fixo de 12px
        opacity: 0.25,
        delay: 0.4,
        zIndex: 18, // Atrás do texto (z-[21])
      },
      {
        id: 2002,
        x: 92, // Borda direita superior
        y: 5,
        size: (55 + Math.random() * 25) * 1.5, // Escala 1.5x
        rotation: 30,
        imageIndex: 1,
        blur: 12, // Blur fixo de 12px
        opacity: 0.3,
        delay: 0.6,
        zIndex: 18, // Atrás do texto
      },
    ];

    return { topSaltSpices, edgeBlurPotatoes };
  };

  const mobileLayers = isMobile ? generateMobileLayers() : { topSaltSpices: [], edgeBlurPotatoes: [] };

  // Partículas transformadas em batatas e fagulhas com blur cinematográfico (desktop)
  const saltParticles = Array.from({ length: isMobile ? 0 : 15 }, (_, i) => {
    const isPotato = Math.random() > 0.5;
    const isEdge = Math.random() > 0.7;
    return {
      id: i,
      x: isEdge ? (Math.random() > 0.5 ? Math.random() * 10 : 90 + Math.random() * 10) : Math.random() * 100,
      y: isEdge ? (Math.random() > 0.5 ? Math.random() * 10 : 90 + Math.random() * 10) : Math.random() * 100,
      size: isPotato ? (15 + Math.random() * 25) : (3 + Math.random() * 5),
      delay: Math.random() * 2,
      isPotato: isPotato,
      blur: isEdge ? (8 + Math.random() * 12) : (2 + Math.random() * 4),
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
            backgroundColor: 'transparent',
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
              alt={element.type === 'potato' ? 'Batata crocante premium Batatas Mais Sabor - Snacks saudáveis e receitas gourmet' : 'Embalagem de Batata Ondulada Sabor Churrasco Batatas Mais Sabor 40g'}
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
      {/* Fundo: Carrossel de fotos da Hero cobrindo toda a extensão */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Carrossel de imagens */}
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentImageIndex === index ? 1 : 0,
              scale: currentImageIndex === index ? 1 : 1.1,
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            <img 
              src={image} 
              alt={`Carrossel de imagens Batatas Mais Sabor - Produtos premium de batata palha e ondulada premium do Paraná ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </motion.div>
        ))}
        
        {/* Overlay escuro para legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        {/* Iluminação de Estúdio: Gradiente radial do topo (simula refletor) */}
        {isMobile && (
          <motion.div 
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background: 'radial-gradient(ellipse 120% 80% at 50% 0%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 215, 0, 0.08) 20%, rgba(255, 200, 0, 0.04) 40%, transparent 70%)',
            }}
          />
        )}
        
        {/* Vignette: Ilumina o centro e escurece as quinas */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1)_0%,_rgba(0,0,0,0.7)_100%)]" />
        
        {/* Indicadores do carrossel (opcional - pequenos pontos na parte inferior) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[3] flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentImageIndex === index 
                  ? 'bg-yellow-400 w-8' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Ir para imagem ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* MOBILE: Topo da Tela - Partículas de Sal e Temperos em Slow Motion */}
      {isMobile && (
        <motion.div 
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ y: layer1Y }}
        >
          {mobileLayers.topSaltSpices.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white/30"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                filter: 'blur(0.5px)',
              }}
              animate={{
                y: [-1, 1, -1], // Movimento muito lento (slow motion)
                opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
              }}
              transition={{
                duration: 6 + Math.random() * 4, // Slow motion: 6-10 segundos
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* MOBILE: Bordas Superiores - Batatas Onduladas 1.5x com blur(12px) "coladas na lente" */}
      {isMobile && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ y: layer3Y }}
        >
          {mobileLayers.edgeBlurPotatoes.map((potato) => (
            <motion.div
              key={potato.id}
              className="absolute"
              style={{
                left: `${potato.x}%`,
                top: `${potato.y}%`,
                width: `${potato.size}px`,
                height: `${potato.size}px`,
                filter: `blur(${potato.blur}px)`, // Blur fixo de 12px
                opacity: potato.opacity,
                zIndex: potato.zIndex,
              }}
              initial={{ scale: 0, rotate: potato.rotation }}
              animate={{
                scale: 1,
                rotate: potato.rotation + [0, 10, -10, 0],
                y: [-3, 3, -3], // Movimento sutil
              }}
              transition={{
                scale: { duration: 1, delay: potato.delay, ease: [0.16, 1, 0.3, 1] },
                rotate: { duration: 8 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 6 + Math.random() * 2, repeat: Infinity, delay: potato.delay },
              }}
            >
              <img
                src={`/images/potatoes/${potatoImages[potato.imageIndex]}`}
                alt="Batata crocante premium Batatas Mais Sabor - Snacks saudáveis e receitas gourmet"
                className="w-full h-full object-contain"
                style={{
                  mixBlendMode: 'normal',
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Layer 1: Batatas e fagulhas com blur cinematográfico (Desktop apenas) */}
      {!isMobile && (
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
                alt="Batata crocante premium Batatas Mais Sabor - Snacks saudáveis e receitas gourmet"
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
      )}

      {/* Layer 2: Background Elements (batatas pequenas e fagulhas) */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        {floatingElements
          .filter(el => el.layer === 'background')
          .map((element, index) => renderFloatingElement(element, index))}
      </div>


      {/* Layer 4: Título e Conteúdo Principal - Centralização Atmosférica (Apple Style) */}
      <motion.div 
        className={`absolute inset-0 flex flex-col justify-center items-center z-[20] text-center text-white`}
        style={{ y: textY }} // Parallax suave no scroll
      >
        {/* Gradiente Radial de Iluminação - Spotlight do centro do texto para fora */}
        {isMobile && (
          <div 
            className="absolute inset-0 pointer-events-none z-[19]"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 215, 0, 0.06) 30%, rgba(255, 200, 0, 0.03) 50%, transparent 80%)',
            }}
          />
        )}
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ 
            opacity,
          }}
          className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[21]"
        >
          {/* Slogan acima do título - Pacifico, centralizado com respiro elegante */}
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={isPreloaderComplete ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: isPreloaderComplete ? 0.3 : 0, duration: 0.8 }}
            className="font-pacifico text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4 sm:mb-5 md:mb-6 block"
            style={{
              color: '#FFD700',
              textShadow: '0 2px 4px rgba(0,0,0,0.4)',
              filter: 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3))',
            }}
          >
            Espalhando mais sabor pelo Brasil
          </motion.span>
          
          {/* Título Principal - Londrina Solid Black, text-shadow ultra-sutil para legibilidade absoluta */}
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={isPreloaderComplete ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ delay: isPreloaderComplete ? 0.5 : 0, duration: 1 }}
            className={`font-londrina font-black mb-8 sm:mb-8 md:mb-10 lg:mb-12 leading-tight tracking-tighter ${isMobile ? 'text-6xl' : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl'}`}
            style={{
              color: '#FFFFFF',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)', // Ultra-sutil para legibilidade sem sujar
              fontWeight: 900,
              letterSpacing: isMobile ? '-0.02em' : '-0.01em',
            }}
          >
            BATATAS <br /> 
            <span 
              style={{
                color: '#FFD700',
                textShadow: '0 1px 3px rgba(0,0,0,0.5)', // Ultra-sutil
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
            className={`flex flex-col sm:flex-row gap-5 sm:gap-6 md:gap-8 justify-center items-center relative z-[25] w-full sm:w-auto px-2 sm:px-0 ${isMobile ? 'mt-6 mb-8' : 'mt-4 sm:mt-0'}`}
          >
            {/* Botão Principal - Glass-Premium com brilho no hover */}
            <motion.a
              href="/catalogo/Catálogo Batata Mais Sabor (ATUALIZADO).pdf"
              download="Catálogo Batata Mais Sabor (ATUALIZADO).pdf"
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
              
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10" />
              <span className="font-montserrat font-bold text-white text-sm sm:text-base md:text-lg lg:text-xl relative z-10">
                NOSSO CATÁLOGO
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
              href="#distribuidor"
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
              
              <Handshake className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10" />
              <span className="font-montserrat font-semibold text-white text-sm sm:text-base md:text-lg lg:text-xl relative z-10">
                SEJA NOSSO CONSULTOR
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

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
