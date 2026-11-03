export type Category = 'technology' | 'lifestyle' | 'personal-development';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  likes: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: Category;
  author: Author;
  publishedAt: string;
  readTimeMinutes: number;
  coverTheme: 'obsidian' | 'terracotta' | 'sage' | 'indigo' | 'amber' | 'stone';
  customImageUrl?: string;
  tags: string[];
  claps: number;
  isFeatured?: boolean;
  isLead?: boolean;
  content: {
    leadParagraph: string;
    sections: {
      heading?: string;
      paragraphs: string[];
      pullQuote?: string;
      takeawayBox?: {
        title: string;
        points: string[];
      };
    }[];
  };
  audioDurationSeconds: number;
  comments: CommentItem[];
}

export interface ReadingPreferences {
  fontFamily: 'serif' | 'sans';
  fontSize: 'normal' | 'large' | 'larger';
  lineHeight: 'relaxed' | 'loose';
}

export const CATEGORY_LABELS: Record<Category, string> = {
  'technology': 'Technology',
  'lifestyle': 'Lifestyle',
  'personal-development': 'Personal Development',
};

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  'technology': 'Computing frontiers, ambient systems, artificial intelligence, and digital agency.',
  'lifestyle': 'Intentional spaces, slow living, architectural rhythm, and tactile craft.',
  'personal-development': 'Cognitive clarity, deep focus rituals, mental models, and resilience.',
};
