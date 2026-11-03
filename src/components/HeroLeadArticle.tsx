import React from 'react';
import { ArrowUpRight, Bookmark, Heart } from 'lucide-react';
import { Article, CATEGORY_LABELS } from '../types/blog';
import { EditorialArtCover } from './EditorialArtCover';

interface HeroLeadArticleProps {
  article: Article;
  onReadArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const HeroLeadArticle: React.FC<HeroLeadArticleProps> = ({
  article,
  onReadArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <section className="relative pt-6 pb-12 border-b border-stone-200 dark:border-stone-800">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Editorial Headline & Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Unboxed Metadata Line (No static pills) */}
          <div className="flex items-center gap-2 text-xs tracking-wider uppercase font-mono text-stone-500 dark:text-stone-400 mb-4">
            <span className="font-semibold text-amber-800 dark:text-amber-300">
              {CATEGORY_LABELS[article.category]}
            </span>
            <span aria-hidden="true">·</span>
            <span>Lead Investigation</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{article.readTimeMinutes} min read</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedAt}</span>
          </div>

          {/* Dominant Headline */}
          <h1
            onClick={() => onReadArticle(article)}
            className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.15] text-stone-900 dark:text-stone-100 hover:text-amber-900 dark:hover:text-amber-200 transition-colors cursor-pointer text-balance"
          >
            {article.title}
          </h1>

          {/* Compelling Deck */}
          <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-300 font-reading-serif leading-relaxed line-clamp-3">
            {article.subtitle}
          </p>

          {/* Author Byline & Actions Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-stone-200/80 dark:border-stone-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-editorial-serif font-semibold text-sm flex items-center justify-center shrink-0 border border-stone-300 dark:border-stone-700">
                {article.author.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  {article.author.name}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {article.author.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleBookmark(article.id)}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark story'}
                className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${
                  isBookmarked
                    ? 'bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-950/40 dark:border-amber-700 dark:text-amber-200'
                    : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => onReadArticle(article)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white rounded-lg transition-colors cursor-pointer"
              >
                <span>Read Full Essay</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Focal Cover */}
        <div
          onClick={() => onReadArticle(article)}
          className="lg:col-span-5 cursor-pointer rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.01]"
        >
          <EditorialArtCover
            theme={article.coverTheme}
            customImageUrl={article.customImageUrl}
            title={article.title}
            category={article.category}
            aspectRatio="16/9"
            className="w-full h-full min-h-[280px] lg:min-h-[360px]"
          />
        </div>
      </div>
    </section>
  );
};
