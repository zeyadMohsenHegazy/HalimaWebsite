export interface HomeCategory {
  id: 'milk' | 'juice';
  image: string;
  titleKey: string;
  descriptionKey: string;
  buttonKey: string;
  link: string;
}

export interface HomeStat {
  id: string;
  value: number;
  suffix?: string;
  labelKey: string;
}

export interface HomeTestimonial {
  id: string;
  nameKey: string;
  roleKey: string;
  quoteKey: string;
  rating: number;
}

export interface HomeFeature {
  id: string;
  icon: 'leaf' | 'shield' | 'nutrition' | 'heart';
  titleKey: string;
  descriptionKey: string;
}

export const HOME_FEATURES: HomeFeature[] = [
  {
    id: 'fresh',
    icon: 'leaf',
    titleKey: 'HOME.WHY_1_TITLE',
    descriptionKey: 'HOME.WHY_1_DESC',
  },
  {
    id: 'quality',
    icon: 'shield',
    titleKey: 'HOME.WHY_2_TITLE',
    descriptionKey: 'HOME.WHY_2_DESC',
  },
  {
    id: 'nutrition',
    icon: 'nutrition',
    titleKey: 'HOME.WHY_3_TITLE',
    descriptionKey: 'HOME.WHY_3_DESC',
  },
  {
    id: 'trusted',
    icon: 'heart',
    titleKey: 'HOME.WHY_4_TITLE',
    descriptionKey: 'HOME.WHY_4_DESC',
  },
];

export const HOME_CATEGORIES: HomeCategory[] = [
  {
    id: 'milk',
    image: 'assets/products/milk/milk-1.jpeg',
    titleKey: 'HOME.CATEGORY_MILK_TITLE',
    descriptionKey: 'HOME.CATEGORY_MILK_DESC',
    buttonKey: 'HOME.CATEGORY_MILK_BTN',
    link: '/products',
  },
  {
    id: 'juice',
    image: 'assets/products/juice/juice-1.jpeg',
    titleKey: 'HOME.CATEGORY_JUICE_TITLE',
    descriptionKey: 'HOME.CATEGORY_JUICE_DESC',
    buttonKey: 'HOME.CATEGORY_JUICE_BTN',
    link: '/products',
  },
];

export const HOME_STATS: HomeStat[] = [
  { id: 'years', value: 25, suffix: '+', labelKey: 'HOME.STAT_YEARS' },
  { id: 'customers', value: 50000, suffix: '+', labelKey: 'HOME.STAT_CUSTOMERS' },
  { id: 'products', value: 50, suffix: '+', labelKey: 'HOME.STAT_PRODUCTS' },
  { id: 'areas', value: 15, suffix: '+', labelKey: 'HOME.STAT_AREAS' },
];

export const HOME_TESTIMONIALS: HomeTestimonial[] = [
  {
    id: 't1',
    nameKey: 'HOME.TESTIMONIAL_1_NAME',
    roleKey: 'HOME.TESTIMONIAL_1_ROLE',
    quoteKey: 'HOME.TESTIMONIAL_1_QUOTE',
    rating: 5,
  },
  {
    id: 't2',
    nameKey: 'HOME.TESTIMONIAL_2_NAME',
    roleKey: 'HOME.TESTIMONIAL_2_ROLE',
    quoteKey: 'HOME.TESTIMONIAL_2_QUOTE',
    rating: 5,
  },
  {
    id: 't3',
    nameKey: 'HOME.TESTIMONIAL_3_NAME',
    roleKey: 'HOME.TESTIMONIAL_3_ROLE',
    quoteKey: 'HOME.TESTIMONIAL_3_QUOTE',
    rating: 5,
  },
];
