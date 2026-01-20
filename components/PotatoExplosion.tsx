import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Potato {
  id: number;
  x: number; // posição X em %
  y: number; // posição Y em %
  size: number; // tamanho em px
  rotation: number; // rotação inicial
  depth: number; // profundidade (0-2, onde 0 é fundo e 2 é primeiro plano)
  speed: number; // velocidade de movimento
  blur: number; // nível de blur
}

const PotatoExplosion: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Cria 20 batatas com diferentes propriedades
  // Distribui melhor: 7 fundo, 7 meio, 6 primeiro plano
  const potatoes: Potato[] = Array.from({ length: 20 }, (_, i) => {
    const depth = i < 7 ? 0 : i < 14 ? 1 : 2; // Distribuição: 7-7-6
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: depth === 0 ? 30 + Math.random() * 40 : depth === 1 ? 50 + Math.random() * 50 : 70 + Math.random() * 60, // Maior no primeiro plano
      rotation: Math.random() * 360,
      depth: depth,
      speed: depth === 0 ? 0.3 + Math.random() * 0.4 : depth === 1 ? 0.8 + Math.random() * 0.7 : 1.5 + Math.random() * 1.0, // Mais rápido no primeiro plano
      blur: depth === 2 ? 2 + Math.random() * 6 : 0, // Blur apenas no primeiro plano (2-8px)
    };
  });

  // Separa batatas por profundidade
  const backgroundPotatoes = potatoes.filter(p => p.depth === 0);
  const midPotatoes = potatoes.filter(p => p.depth === 1);
  const foregroundPotatoes = potatoes.filter(p => p.depth === 2);

  // Parallax baseado no scroll
  const parallaxBackground = useTransform(scrollY, [0, 500], [0, 50]);
  const parallaxMid = useTransform(scrollY, [0, 500], [0, 100]);
  const parallaxForeground = useTransform(scrollY, [0, 500], [0, 200]);

  // Função para renderizar uma batata
  const renderPotato = (potato: Potato, parallax: any, index: number) => {
    const isForeground = potato.depth === 2;
    const movementRange = isForeground ? 30 : potato.depth === 1 ? 20 : 15; // Maior movimento no primeiro plano
    
    return (
      <motion.div
        key={potato.id}
        style={{
          position: 'absolute',
          left: `${potato.x}%`,
          top: `${potato.y}%`,
          width: `${potato.size}px`,
          height: `${potato.size}px`,
          filter: isForeground ? `blur(${potato.blur}px)` : 'none',
          zIndex: 10 + potato.depth, // Z-index baseado na profundidade
          willChange: 'transform', // Otimização de performance
        }}
        animate={{
          y: [
            -movementRange * potato.speed,
            movementRange * potato.speed,
            -movementRange * potato.speed,
          ],
          x: [
            -movementRange * 0.5 * potato.speed,
            movementRange * 0.5 * potato.speed,
            -movementRange * 0.5 * potato.speed,
          ],
          rotate: [
            potato.rotation,
            potato.rotation + (isForeground ? 720 : 360), // Rotação mais rápida no primeiro plano
            potato.rotation,
          ],
          scale: [
            1,
            1.05 + potato.depth * 0.15,
            1,
          ],
        }}
        transition={{
          duration: isForeground ? 2 + potato.speed : 4 + potato.speed, // Mais rápido no primeiro plano
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.05,
        }}
      >
        <motion.div
          style={{
            y: parallax,
          }}
          className="w-full h-full"
        >
          {/* Imagem da batata - usando SVG como placeholder até ter as imagens */}
          <img
            src={`/images/potatoes/potato-${(potato.id % 5) + 1}.png`}
            alt="Batata"
            className="w-full h-full object-contain drop-shadow-lg"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              // Fallback para SVG se a imagem não existir
              const target = e.currentTarget;
              target.style.display = 'none';
              const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
              svg.setAttribute('viewBox', '0 0 100 100');
              svg.setAttribute('width', '100%');
              svg.setAttribute('height', '100%');
              
              const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
              ellipse.setAttribute('cx', '50');
              ellipse.setAttribute('cy', '50');
              ellipse.setAttribute('rx', '35');
              ellipse.setAttribute('ry', '45');
              ellipse.setAttribute('fill', '#f59e0b');
              ellipse.setAttribute('opacity', '0.8');
              
              svg.appendChild(ellipse);
              target.parentElement?.appendChild(svg);
            }}
          />
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Camada de fundo - movimento mais lento */}
      {backgroundPotatoes.map((potato, index) =>
        renderPotato(potato, parallaxBackground, index)
      )}
      
      {/* Camada intermediária - movimento médio */}
      {midPotatoes.map((potato, index) =>
        renderPotato(potato, parallaxMid, index + backgroundPotatoes.length)
      )}
      
      {/* Primeiro plano - movimento mais rápido e blur */}
      {foregroundPotatoes.map((potato, index) =>
        renderPotato(potato, parallaxForeground, index + backgroundPotatoes.length + midPotatoes.length)
      )}
    </div>
  );
};

export default PotatoExplosion;
