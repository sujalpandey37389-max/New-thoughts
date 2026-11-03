import React from 'react';
import { Bookmark, Heart, Clock } from 'lucide-react';
import { Article, CATEGORY_LABELS } from '../types/blog';
import { EditorialArtCover } from './EditorialArtCover';

interface ArticleCardProps {
  article: Article;
  onReadArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  variant?: 'standard' | 'compact' | 'featured';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onReadArticle,
  isBookmarked,
  onToggleBookmark,
  variant = 'standard',
}) => {
  return (
    <article className="group flex flex-col justify-between h-full bg-transparent border border-stone-200/90 dark:border-stone-800/90 rounded-xl p-5 hover:border-stone-400 dark:hover:border-stone-600 transition-colors duration-200">
      <div>
        {/* Cover Artwork */}
        <div
          onClick={() => onReadArticle(article)}
          className="cursor-pointer overflow-hidden rounded-lg mb-4 bg-stone-100 dark:bg-stone-900"
        >
          <EditorialArtCover
            theme={article.coverTheme}
            customImageUrl={article.customImageUrl}
            title={article.title}
            category={article.category}
            aspectRatio={variant === 'compact' ? '16/9' : '4/3'}
            className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        {/* Clean Unboxed Metadata (Anti-slop zero-pill) */}
        <div className="flex items-center gap-2 text-xs tracking-wider uppercase font-mono text-stone-500 dark:text-stone-400 mb-2">
          <span className="font-semibold text-stone-900 dark:text-stone-200">
            {CATEGORY_LABELS[article.category]}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 tabular-nums">
            <Clock className="w-3 h-3 inline" />
            {article.readTimeMinutes}m
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onReadArticle(article)}
          className="font-editorial-serif text-xl font-semibold leading-snug text-stone-900 dark:text-stone-100 group-hover:text-amber-900 dark:group-hover:text-amber-200 transition-colors cursor-pointer text-balance"
        >
          {article.title}
        </h3>

        {/* Subtitle / Excerpt */}
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-300 font-reading-serif line-clamp-2 leading-relaxed">
          {article.subtitle}
        </p>
      </div>

      {/* Author and Action Row */}
      <div className="mt-5 pt-4 border-t border-stone-200/70 dark:border-stone-800/70 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-[10px] flex items-center justify-center shrink-0">
            {article.author.avatar}
          </div>
          <span className="font-medium text-stone-800 dark:text-stone-200 truncate max-w-[120px]">
            {article.author.name}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 tabular-nums text-stone-500">
            <Heart className="w-3.5 h-3.5 text-stone-400" />
            {article.claps}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(article.id);
            }}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark story'}
            className="p-1 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600 text-amber-600 dark:fill-amber-400 dark:text-amber-400' : ''}`} />
          </button>
        </div>
      </div>
    </article>
  );
};
