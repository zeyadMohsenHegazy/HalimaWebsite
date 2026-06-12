export interface AboutValue {
  id: string;
  icon: 'integrity' | 'quality' | 'innovation' | 'community';
  titleKey: string;
  descKey: string;
}

export interface QualityPillar {
  id: string;
  titleKey: string;
  descKey: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  titleKey: string;
  descKey: string;
}

export interface SustainabilityItem {
  id: string;
  titleKey: string;
  descKey: string;
}

export const ABOUT_VALUES: AboutValue[] = [
  {
    id: 'integrity',
    icon: 'integrity',
    titleKey: 'ABOUT.VALUE_1_TITLE',
    descKey: 'ABOUT.VALUE_1_DESC',
  },
  {
    id: 'quality',
    icon: 'quality',
    titleKey: 'ABOUT.VALUE_2_TITLE',
    descKey: 'ABOUT.VALUE_2_DESC',
  },
  {
    id: 'innovation',
    icon: 'innovation',
    titleKey: 'ABOUT.VALUE_3_TITLE',
    descKey: 'ABOUT.VALUE_3_DESC',
  },
  {
    id: 'community',
    icon: 'community',
    titleKey: 'ABOUT.VALUE_4_TITLE',
    descKey: 'ABOUT.VALUE_4_DESC',
  },
];

export const QUALITY_PILLARS: QualityPillar[] = [
  {
    id: 'sourcing',
    titleKey: 'ABOUT.QUALITY_1_TITLE',
    descKey: 'ABOUT.QUALITY_1_DESC',
  },
  {
    id: 'processing',
    titleKey: 'ABOUT.QUALITY_2_TITLE',
    descKey: 'ABOUT.QUALITY_2_DESC',
  },
  {
    id: 'testing',
    titleKey: 'ABOUT.QUALITY_3_TITLE',
    descKey: 'ABOUT.QUALITY_3_DESC',
  },
  {
    id: 'packaging',
    titleKey: 'ABOUT.QUALITY_4_TITLE',
    descKey: 'ABOUT.QUALITY_4_DESC',
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 't1',
    year: '1998',
    titleKey: 'ABOUT.TIMELINE_1_TITLE',
    descKey: 'ABOUT.TIMELINE_1_DESC',
  },
  {
    id: 't2',
    year: '2005',
    titleKey: 'ABOUT.TIMELINE_2_TITLE',
    descKey: 'ABOUT.TIMELINE_2_DESC',
  },
  {
    id: 't3',
    year: '2012',
    titleKey: 'ABOUT.TIMELINE_3_TITLE',
    descKey: 'ABOUT.TIMELINE_3_DESC',
  },
  {
    id: 't4',
    year: '2018',
    titleKey: 'ABOUT.TIMELINE_4_TITLE',
    descKey: 'ABOUT.TIMELINE_4_DESC',
  },
  {
    id: 't5',
    year: '2024',
    titleKey: 'ABOUT.TIMELINE_5_TITLE',
    descKey: 'ABOUT.TIMELINE_5_DESC',
  },
];

export const SUSTAINABILITY_ITEMS: SustainabilityItem[] = [
  {
    id: 's1',
    titleKey: 'ABOUT.SUSTAIN_1_TITLE',
    descKey: 'ABOUT.SUSTAIN_1_DESC',
  },
  {
    id: 's2',
    titleKey: 'ABOUT.SUSTAIN_2_TITLE',
    descKey: 'ABOUT.SUSTAIN_2_DESC',
  },
  {
    id: 's3',
    titleKey: 'ABOUT.SUSTAIN_3_TITLE',
    descKey: 'ABOUT.SUSTAIN_3_DESC',
  },
  {
    id: 's4',
    titleKey: 'ABOUT.SUSTAIN_4_TITLE',
    descKey: 'ABOUT.SUSTAIN_4_DESC',
  },
];

export const DISTRIBUTION_REGIONS = [
  'ABOUT.DIST_REGION_1',
  'ABOUT.DIST_REGION_2',
  'ABOUT.DIST_REGION_3',
  'ABOUT.DIST_REGION_4',
  'ABOUT.DIST_REGION_5',
] as const;
