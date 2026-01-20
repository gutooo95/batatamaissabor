/**
 * Script para otimizar imagens usando sharp
 * Execute: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');

// Verifica se sharp está instalado
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('❌ Sharp não está instalado. Instalando...');
  console.log('Execute: npm install --save-dev sharp');
  process.exit(1);
}

const imagesDir = path.join(__dirname, '../public/images');
const outputDir = imagesDir; // Mesma pasta, sobrescreve

async function optimizeImage(inputPath, outputPath, quality = 85) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    
    await sharp(inputPath)
      .resize(null, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality })
      .toFile(outputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
    
    const newStats = fs.statSync(outputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
    const newSize = newStats.size;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)}: ${(originalSize / 1024).toFixed(2)}KB → ${(newSize / 1024).toFixed(2)}KB (${reduction}% redução)`);
    
    return { originalSize, newSize, reduction };
  } catch (error) {
    console.error(`❌ Erro ao otimizar ${inputPath}:`, error.message);
    return null;
  }
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let totalOriginal = 0;
  let totalNew = 0;
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      const { originalSize, newSize } = await processDirectory(filePath);
      totalOriginal += originalSize || 0;
      totalNew += newSize || 0;
    } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
      const result = await optimizeImage(filePath, filePath);
      if (result) {
        totalOriginal += result.originalSize;
        totalNew += result.newSize;
      }
    }
  }
  
  return { originalSize: totalOriginal, newSize: totalNew };
}

async function main() {
  console.log('🚀 Iniciando otimização de imagens...\n');
  
  const result = await processDirectory(imagesDir);
  
  console.log('\n📊 Resumo:');
  console.log(`Tamanho original: ${(result.originalSize / 1024).toFixed(2)}KB`);
  console.log(`Tamanho otimizado: ${(result.newSize / 1024).toFixed(2)}KB`);
  console.log(`Redução total: ${((result.originalSize - result.newSize) / result.originalSize * 100).toFixed(1)}%`);
  console.log('\n✨ Otimização concluída!');
}

main().catch(console.error);
