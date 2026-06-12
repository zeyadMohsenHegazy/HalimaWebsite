import { FaqCategoryOption, FaqItem } from '../models/faq.model';

export const FAQ_CATEGORIES: FaqCategoryOption[] = [
  { id: 'all', labelKey: 'FAQ.CAT_ALL' },
  { id: 'milk', labelKey: 'FAQ.CAT_MILK' },
  { id: 'juice', labelKey: 'FAQ.CAT_JUICE' },
  { id: 'quality', labelKey: 'FAQ.CAT_QUALITY' },
  { id: 'storage', labelKey: 'FAQ.CAT_STORAGE' },
  { id: 'distribution', labelKey: 'FAQ.CAT_DISTRIBUTION' },
  { id: 'support', labelKey: 'FAQ.CAT_SUPPORT' },
];

export const FAQ_ITEMS: FaqItem[] = [
  // Milk Products (3)
  {
    id: 'faq-milk-1',
    category: 'milk',
    questionKey: 'FAQ.ITEMS.Q1.QUESTION',
    answerKey: 'FAQ.ITEMS.Q1.ANSWER',
  },
  {
    id: 'faq-milk-2',
    category: 'milk',
    questionKey: 'FAQ.ITEMS.Q2.QUESTION',
    answerKey: 'FAQ.ITEMS.Q2.ANSWER',
  },
  {
    id: 'faq-milk-3',
    category: 'milk',
    questionKey: 'FAQ.ITEMS.Q3.QUESTION',
    answerKey: 'FAQ.ITEMS.Q3.ANSWER',
  },
  // Juice Products (3)
  {
    id: 'faq-juice-1',
    category: 'juice',
    questionKey: 'FAQ.ITEMS.Q4.QUESTION',
    answerKey: 'FAQ.ITEMS.Q4.ANSWER',
  },
  {
    id: 'faq-juice-2',
    category: 'juice',
    questionKey: 'FAQ.ITEMS.Q5.QUESTION',
    answerKey: 'FAQ.ITEMS.Q5.ANSWER',
  },
  {
    id: 'faq-juice-3',
    category: 'juice',
    questionKey: 'FAQ.ITEMS.Q6.QUESTION',
    answerKey: 'FAQ.ITEMS.Q6.ANSWER',
  },
  // Quality Assurance (3)
  {
    id: 'faq-quality-1',
    category: 'quality',
    questionKey: 'FAQ.ITEMS.Q7.QUESTION',
    answerKey: 'FAQ.ITEMS.Q7.ANSWER',
  },
  {
    id: 'faq-quality-2',
    category: 'quality',
    questionKey: 'FAQ.ITEMS.Q8.QUESTION',
    answerKey: 'FAQ.ITEMS.Q8.ANSWER',
  },
  {
    id: 'faq-quality-3',
    category: 'quality',
    questionKey: 'FAQ.ITEMS.Q9.QUESTION',
    answerKey: 'FAQ.ITEMS.Q9.ANSWER',
  },
  // Storage Instructions (2)
  {
    id: 'faq-storage-1',
    category: 'storage',
    questionKey: 'FAQ.ITEMS.Q10.QUESTION',
    answerKey: 'FAQ.ITEMS.Q10.ANSWER',
  },
  {
    id: 'faq-storage-2',
    category: 'storage',
    questionKey: 'FAQ.ITEMS.Q11.QUESTION',
    answerKey: 'FAQ.ITEMS.Q11.ANSWER',
  },
  // Distribution (2)
  {
    id: 'faq-dist-1',
    category: 'distribution',
    questionKey: 'FAQ.ITEMS.Q12.QUESTION',
    answerKey: 'FAQ.ITEMS.Q12.ANSWER',
  },
  {
    id: 'faq-dist-2',
    category: 'distribution',
    questionKey: 'FAQ.ITEMS.Q13.QUESTION',
    answerKey: 'FAQ.ITEMS.Q13.ANSWER',
  },
  // Customer Support (2)
  {
    id: 'faq-support-1',
    category: 'support',
    questionKey: 'FAQ.ITEMS.Q14.QUESTION',
    answerKey: 'FAQ.ITEMS.Q14.ANSWER',
  },
  {
    id: 'faq-support-2',
    category: 'support',
    questionKey: 'FAQ.ITEMS.Q15.QUESTION',
    answerKey: 'FAQ.ITEMS.Q15.ANSWER',
  },
];
