import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, Shield } from 'lucide-react';

const Fleet: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: 'Transporte Próprio',
      description: 'Frota exclusiva e monitorada',
    },
    {
      icon: Clock,
      title: 'Entrega Rápida',
      description: 'Agilidade em cada quilômetro',
    },
    {
      icon: Shield,
      title: 'Qualidade Preservada',
      description: 'Crocância e frescor garantidos',
    },
  ];

  return (
    <section id="frota" className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-neutral-900 text-white pb-16 sm:pb-20 md:pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          
          {/* Lado Esquerdo: Texto Minimalista */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Título */}
            <h2 className="font-londrina text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
              <span style={{ color: '#FFD700' }}>LOGÍSTICA</span>
              <br />
              <span style={{ color: '#FFD700' }}>PRÓPRIA</span>
            </h2>

            {/* Subtítulo */}
            <p className="font-montserrat text-lg sm:text-xl md:text-2xl text-white font-light leading-relaxed">
              Do campo para a sua mesa com transporte próprio.
            </p>

            {/* Copy */}
            <p className="font-montserrat text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
              Contamos com uma frota exclusiva e monitorada para garantir que a crocância e o frescor das Batatas Mais Sabor cheguem intactos a cada ponto de venda. Agilidade e compromisso com a excelência em cada quilômetro.
            </p>

            {/* Ícones Minimalistas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-6 pt-6 sm:pt-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center sm:items-start text-center sm:text-left"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-4">
                      <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-400" />
                    </div>
                    <h3 className="font-montserrat font-bold text-white text-sm sm:text-base mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-montserrat text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Lado Direito: Imagem Cinematográfica */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] overflow-hidden bg-neutral-800/50 backdrop-blur-sm border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
              {/* Gradiente de pôr do sol */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 via-red-900/30 to-neutral-900 z-0" />
              
              {/* Imagem do caminhão */}
              <img
                src="/images/frota/Batata mais Sabor-1768657692257.png"
                alt="Frota em movimento"
                className="absolute inset-0 w-full h-full object-cover z-10"
                style={{
                  filter: 'brightness(0.9) contrast(1.1) saturate(1.2)',
                }}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  // Fallback: esconde imagem se não existir
                  e.currentTarget.style.display = 'none';
                  // Mostra placeholder apenas se imagem falhar
                  const placeholder = e.currentTarget.parentElement?.querySelector('.opacity-0');
                  if (placeholder) {
                    placeholder.classList.remove('opacity-0');
                    placeholder.classList.add('opacity-100');
                  }
                }}
              />
              
              {/* Placeholder (mostrado apenas se imagem não carregar) */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none opacity-0">
                <div className="text-center px-6">
                  <Truck className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 text-yellow-400/30 mx-auto mb-4" />
                </div>
              </div>
              
              {/* Efeito de motion blur simulado */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)] z-30 pointer-events-none" />
              
              {/* Overlay sutil para profundidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent z-30 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Fleet;
