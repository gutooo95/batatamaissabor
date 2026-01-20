
import { Category, Product } from './types';

export const PRODUCTS: Product[] = [
  // Batatas Onduladas
  {
    id: '1',
    name: 'Batata Ondulada',
    flavor: 'Original',
    weight: '40g',
    category: Category.WAVY,
    imageUrl: '/images/embalagens/batata-ondulada-original.png', 
    farmImageUrl: 'https://picsum.photos/seed/farm-1/800/600',
    color: '#2563eb',
    details: {
      packaging: '1 caixa c/ 20 unidades',
      ean: '0040232 863448',
      ingredients: ['Batata', 'Gordura Vegetal de Palma', 'Sal'],
      nutritionalInfo: {
        servingSize: '40g (1 porção)',
        calories: '200 kcal',
        totalFat: '12g',
        saturatedFat: '6g',
        transFat: '0g',
        carbs: '22g',
        protein: '2g',
        sodium: '280mg'
      }
    }
  },
  {
    id: '2',
    name: 'Batata Ondulada',
    flavor: 'Cebola e Salsa',
    weight: '40g',
    category: Category.WAVY,
    imageUrl: '/images/embalagens/batata-ondulada-cebola-salsa.png',
    farmImageUrl: 'https://picsum.photos/seed/farm-2/800/600',
    color: '#16a34a',
    details: {
      packaging: '1 caixa c/ 20 unidades',
      ean: '0040232 863424',
      ingredients: ['Batata', 'Gordura Vegetal de Palma', 'Sal', 'Cebola em pó', 'Salsa desidratada'],
      nutritionalInfo: {
        servingSize: '40g (1 porção)',
        calories: '200 kcal',
        totalFat: '12g',
        saturatedFat: '6g',
        transFat: '0g',
        carbs: '22g',
        protein: '2g',
        sodium: '280mg'
      }
    }
  },
  {
    id: '3',
    name: 'Batata Ondulada',
    flavor: 'Churrasco',
    weight: '40g',
    category: Category.WAVY,
    imageUrl: '/images/embalagens/batata-ondulada-churrasco.png',
    farmImageUrl: 'https://picsum.photos/seed/farm-3/800/600',
    color: '#dc2626',
    details: {
      packaging: '1 caixa c/ 20 unidades',
      ean: '0040232 863431',
      ingredients: ['Batata', 'Gordura Vegetal de Palma', 'Sal', 'Tempero sabor churrasco'],
      nutritionalInfo: {
        servingSize: '40g (1 porção)',
        calories: '200 kcal',
        totalFat: '12g',
        saturatedFat: '6g',
        transFat: '0g',
        carbs: '22g',
        protein: '2g',
        sodium: '280mg'
      }
    }
  },
  // Batatas Palha
  {
    id: '4',
    name: 'Batata Palha',
    flavor: 'Tradicional',
    weight: '1kg',
    category: Category.STICK,
    imageUrl: '/images/embalagens/2.png',
    farmImageUrl: 'https://picsum.photos/seed/farm-4/800/600',
    color: '#84cc16',
    details: {
      packaging: 'Fardo c/ 10 unidades',
      ean: '0040232 936319',
      ingredients: ['Batata', 'Gordura Vegetal de Palma', 'Sal'],
      nutritionalInfo: {
        servingSize: '30g (1 porção)',
        calories: '150 kcal',
        totalFat: '9g',
        saturatedFat: '4.5g',
        transFat: '0g',
        carbs: '17g',
        protein: '1.5g',
        sodium: '210mg'
      }
    },
    recipe: {
      title: 'Estrogonofe de Frango',
      ingredients: [
        '500g de Filé de Frango',
        '3 Colheres de molho inglês',
        '1 Colher de azeite',
        '2 Colheres de manteiga',
        '1 Cebola bem picada',
        '4 Colheres de catchup',
        '2 Colheres de mostarda',
        '1 Xícara de café de conhaque (opcional)',
        '2 Unidades de creme de leite',
        '100g de Champignon (opcional)'
      ],
      method: [
        'Limpe o filé de frango e corte em tiras. Tempere com molho inglês.',
        'Em uma caçarola, coloque o azeite e a manteiga, doure a cebola.',
        'Coloque o frango para selar até dourar.',
        'Adicione o catchup, a mostarda e o champignon.',
        'Em outro queimador, aqueça o conhaque e flambe a mistura (opcional).',
        'Adicione o creme de leite, mexa bem e sirva com Batata Palha MAIS SABOR.'
      ]
    }
  },
  {
    id: '5',
    name: 'Batata Palha',
    flavor: 'Tradicional',
    weight: '500g',
    category: Category.STICK,
    imageUrl: '/images/embalagens/5.png',
    farmImageUrl: 'https://picsum.photos/seed/farm-5/800/600',
    color: '#3b82f6',
    details: {
      packaging: 'Fardo c/ 20 unidades',
      ean: '0040232 863400',
      ingredients: ['Batata', 'Gordura Vegetal de Palma', 'Sal'],
      nutritionalInfo: {
        servingSize: '30g (1 porção)',
        calories: '150 kcal',
        totalFat: '9g',
        saturatedFat: '4.5g',
        transFat: '0g',
        carbs: '17g',
        protein: '1.5g',
        sodium: '210mg'
      }
    },
    recipe: {
      title: 'Estrogonofe de Carne',
      ingredients: [
        '1kg de Carne Moída ou em tirinhas',
        '3 Cebolas médias',
        '1 Vidro de champignon',
        '2 Latas de creme de leite',
        '3 Tomates picados sem pele',
        '3 Colheres de óleo de oliva',
        '2 Colheres de catchup',
        '1 Cubo de caldo de carne',
        'Sal e pimenta a gosto'
      ],
      method: [
        'Corte a carne em tirinhas e em uma panela coloque o óleo, depois a carne para dourar.',
        'Coloque a cebola cortada, deixe cozinhar por aproximadamente 20 minutos.',
        'Coloque o catchup e o champignon e deixe cozinhar por mais 3 a 5 minutos.',
        'Acrescente o creme de leite, mexa até encorpar e desligue o fogo.',
        'Sirva com arroz branco e Batata Palha MAIS SABOR.'
      ]
    }
  },
  {
    id: '6',
    name: 'Batata Palha',
    flavor: 'Tradicional',
    weight: '700g',
    category: Category.STICK,
    imageUrl: '/images/embalagens/3.png',
    farmImageUrl: 'https://picsum.photos/seed/farm-6/800/600',
    color: '#1f2937',
    details: {
      packaging: 'Fardo c/ 10 unidades',
      ean: '0040232 809378',
      ingredients: ['Batata', 'Gordura Vegetal de Palma', 'Sal'],
      nutritionalInfo: {
        servingSize: '30g (1 porção)',
        calories: '150 kcal',
        totalFat: '9g',
        saturatedFat: '4.5g',
        transFat: '0g',
        carbs: '17g',
        protein: '1.5g',
        sodium: '210mg'
      }
    },
    recipe: {
      title: 'Estrogonofe de Carne',
      ingredients: [
        '1kg de Carne Moída ou em tirinhas',
        '3 Cebolas médias',
        '1 Vidro de champignon',
        '2 Latas de creme de leite',
        '3 Tomates picados sem pele',
        '3 Colheres de óleo de oliva',
        '2 Colheres de catchup',
        '1 Cubo de caldo de carne',
        'Sal e pimenta a gosto'
      ],
      method: [
        'Corte a carne em tirinhas e em uma panela coloque o óleo, depois a carne para dourar.',
        'Coloque a cebola cortada, deixe cozinhar por aproximadamente 20 minutos.',
        'Coloque o catchup e o champignon e deixe cozinhar por mais 3 a 5 minutos.',
        'Acrescente o creme de leite, mexa até encorpar e desligue o fogo.',
        'Sirva com arroz branco e Batata Palha MAIS SABOR.'
      ]
    }
  },
  {
    id: '8',
    name: 'Batata Palha',
    flavor: 'Premium',
    weight: '100g',
    category: Category.STICK,
    imageUrl: '/images/embalagens/4.png',
    farmImageUrl: 'https://picsum.photos/seed/farm-8/800/600',
    color: '#991b1b',
    details: {
      packaging: 'Fardo c/ 10 unidades',
      ean: '0040232 863394',
      ingredients: ['Batata', 'Gordura Vegetal de Palma', 'Sal'],
      nutritionalInfo: {
        servingSize: '30g (1 porção)',
        calories: '150 kcal',
        totalFat: '9g',
        saturatedFat: '4.5g',
        transFat: '0g',
        carbs: '17g',
        protein: '1.5g',
        sodium: '210mg'
      }
    },
    recipe: {
      title: 'Estrogonofe de Camarão',
      ingredients: [
        '500g de Camarão',
        '2 Colheres de margarina',
        '2 Latas de creme de leite',
        '1 Lata de molho de tomate',
        '1 Colher de mostarda',
        '1 Cebola média picada',
        '2 Dentes de alho picados',
        'Orégano a gosto',
        'Sal e pimenta a gosto'
      ],
      method: [
        'Limpe os camarões, removendo a cabeça e a casca.',
        'Em uma panela, derreta a margarina e refogue a cebola e o alho até dourar.',
        'Adicione os camarões e cozinhe por 3-4 minutos até ficarem rosados.',
        'Adicione o molho de tomate, a mostarda e o orégano. Deixe cozinhar por 5 minutos.',
        'Acrescente o creme de leite, mexa delicadamente e desligue o fogo.',
        'Sirva com arroz branco e Batata Palha MAIS SABOR.'
      ]
    }
  }
];
