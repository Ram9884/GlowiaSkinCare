export type CategoryId = 'skin-care' | 'hair-care' | 'womens-health' | 'holistic-wellness';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery: string[];
  ingredients: string[];
  benefits: string[];
  usage: string;
  featured: boolean;
  isSample: boolean;
  availabilityLabel: string;
}
