
export enum Category {
  WAVY = 'Onduladas',
  STICK = 'Batata Palha'
}

export interface NutritionalInfo {
  servingSize: string;
  calories: string;
  totalFat: string;
  saturatedFat: string;
  transFat: string;
  carbs: string;
  protein: string;
  sodium: string;
}

export interface ProductDetails {
  packaging: string; // Ex: "1 caixa c/ 20 unidades" ou "Fardo c/ 10 unidades"
  ean: string; // Código EAN
  ingredients: string[]; // Ingredientes do produto
  nutritionalInfo: NutritionalInfo; // Tabela nutricional
}

export interface Product {
  id: string;
  name: string;
  flavor: string;
  weight: string;
  category: Category;
  imageUrl: string;
  farmImageUrl: string;
  color: string;
  details?: ProductDetails;
  recipe?: {
    title: string;
    ingredients: string[];
    method: string[];
  };
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  type: 'chip' | 'stick';
}
