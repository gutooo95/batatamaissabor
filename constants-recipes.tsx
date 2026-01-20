// Receitas fixas para a seção Dicas do Chef
export interface Recipe {
  id: string;
  title: string;
  imageName: string;
  ingredients: string[];
  method: string[];
  time: string;
  servings: string;
}

export const FIXED_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Estrogonofe de Carne',
    imageName: 'Strogonoff-de-Carne.png',
    time: '30 MIN',
    servings: '4 PORÇÕES',
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
  },
  {
    id: '2',
    title: 'Pizza com Batata Palha',
    imageName: 'Pizza-de-batata-palha.jpg',
    time: '45 MIN',
    servings: '6 FATIAS',
    ingredients: [
      '1 Massa de pizza (pronta ou caseira)',
      '200g de molho de tomate',
      '300g de mussarela ralada',
      '150g de Batata Palha MAIS SABOR',
      '100g de presunto fatiado',
      '50g de azeitona',
      '1 Colher de azeite',
      'Orégano a gosto'
    ],
    method: [
      'Pré-aqueça o forno a 220°C. Abra a massa de pizza em uma forma.',
      'Espalhe o molho de tomate uniformemente sobre a massa.',
      'Distribua a mussarela, o presunto e as azeitonas.',
      'Leve ao forno por 15-20 minutos até a massa dourar.',
      'Retire do forno, finalize com Batata Palha MAIS SABOR e orégano. Sirva quente!'
    ]
  },
  {
    id: '3',
    title: 'Cachorro Quente Gourmet',
    imageName: 'd91d2793afc1e2281971343ae9f4138f_XL.jpg',
    time: '20 MIN',
    servings: '4 UNIDADES',
    ingredients: [
      '4 Pães para cachorro quente',
      '4 Salsichas',
      '200g de Batata Palha MAIS SABOR',
      '100g de queijo ralado',
      '50g de bacon picado',
      '2 Colheres de catchup',
      '2 Colheres de mostarda',
      '1 Cebola pequena picada',
      'Batata palha para finalizar'
    ],
    method: [
      'Cozinhe as salsichas em água fervente por 5 minutos. Frite o bacon até ficar crocante.',
      'Aqueça os pães levemente na chapa ou no forno.',
      'Coloque a salsicha no pão, adicione catchup e mostarda.',
      'Distribua o queijo ralado, cebola picada e bacon.',
      'Finalize generosamente com Batata Palha MAIS SABOR. Sirva imediatamente!'
    ]
  }
];
