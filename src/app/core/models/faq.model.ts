export type FaqCategory =
  | 'milk'
  | 'juice'
  | 'quality'
  | 'storage'
  | 'distribution'
  | 'support';

export type FaqCategoryFilter = 'all' | FaqCategory;

export interface FaqItem {
  id: string;
  category: FaqCategory;
  questionKey: string;
  answerKey: string;
}

export interface FaqCategoryOption {
  id: FaqCategoryFilter;
  labelKey: string;
}
