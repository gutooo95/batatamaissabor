import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone } from 'lucide-react';

const Distributor: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    whatsapp: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // WhatsApp da empresa (44) 98823-1595 formatado
    const companyWhatsApp = '5544988231595';
    const message = `Olá! Tenho interesse em me tornar um distribuidor parceiro da Batatas Mais Sabor.\n\nNome: ${formData.name}\nCidade: ${formData.city}\nEstado: ${formData.state}\nWhatsApp: ${formData.whatsapp}`;
    const whatsappUrl = `https://wa.me/${companyWhatsApp}?text=${encodeURIComponent(message)}`;
    
    // Abre WhatsApp Web/App
    window.open(whatsappUrl, '_blank');
    
    // Reset form após 2 segundos
    setTimeout(() => {
      setFormData({ name: '', city: '', state: '', whatsapp: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <section id="distribuidor" className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-neutral-950 text-white pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Card Bento Style */}
          <div className="relative rounded-[2.5rem] bg-neutral-900/50 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-red-600/5 pointer-events-none" />
            
            {/* Content */}
            <div className="relative p-8 sm:p-10 md:p-12 lg:p-16">
              {/* Header */}
              <div className="text-center mb-8 sm:mb-10 md:mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="font-londrina text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4"
                  style={{ color: '#FFD700' }}
                >
                  SEJA UM DISTRIBUIDOR
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="font-montserrat text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto"
                >
                  Leve a explosão de sabor para sua região. Torne-se um distribuidor parceiro.
                </motion.p>
              </div>

              {/* Form */}
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="space-y-6 sm:space-y-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Nome */}
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block font-montserrat text-sm font-semibold text-gray-300 mb-3">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl text-white placeholder-gray-500 font-montserrat text-sm sm:text-base focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  {/* Cidade */}
                  <div>
                    <label htmlFor="city" className="block font-montserrat text-sm font-semibold text-gray-300 mb-3">
                      Cidade
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-yellow-400/50 w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl text-white placeholder-gray-500 font-montserrat text-sm sm:text-base focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300"
                        placeholder="Sua cidade"
                      />
                    </div>
                  </div>

                  {/* Estado */}
                  <div>
                    <label htmlFor="state" className="block font-montserrat text-sm font-semibold text-gray-300 mb-3">
                      Estado
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl text-white placeholder-gray-500 font-montserrat text-sm sm:text-base focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300"
                      placeholder="Seu estado (ex: PR)"
                      maxLength={2}
                    />
                  </div>

                  {/* WhatsApp */}
                  <div className="sm:col-span-2">
                    <label htmlFor="whatsapp" className="block font-montserrat text-sm font-semibold text-gray-300 mb-3">
                      WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-yellow-400/50 w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl text-white placeholder-gray-500 font-montserrat text-sm sm:text-base focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300"
                        placeholder="(44) 98823-1595"
                        pattern="[0-9\s\(\)\-]+"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto mx-auto sm:mx-0 px-6 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-neutral-950 font-montserrat font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-[0_8px_24px_rgba(255,215,0,0.3)] hover:shadow-[0_12px_32px_rgba(255,215,0,0.4)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-neutral-950 border-t-transparent rounded-full"
                      />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>ENVIAR INTERESSE</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Distributor;
