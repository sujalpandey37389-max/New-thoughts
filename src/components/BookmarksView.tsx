import React from 'react';
import { Bookmark, Clock, ArrowRight, Trash2 } from 'lucide-react';
import { Article, CATEGORY_LABELS } from '../types/blog';
import { EditorialArtCover } from './EditorialArtCover';

interface BookmarksViewProps {
  savedArticles: Article[];
  onReadArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
  onExploreStories: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  savedArticles,
  onReadArticle,
  onRemoveBookmark,
  onClearAll,
  onExploreStories,
}) => {
  const totalMinutes = savedArticles.reduce((acc, curr) => acc + curr.readTimeMinutes, 0);

  if (savedArticles.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-500">
          <Bookmark className="w-5 h-5" />
        </div>
        <h3 className="font-editorial-serif text-2xl font-semibold text-stone-900 dark:text-stone-100">
          Your Reading Sanctuary is Empty
        </h3>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 font-reading-serif leading-relaxed">
          As you explore essays across Technology, Lifestyle, and Personal Development, click the bookmark icon to save them for unhurried study.
        </p>
        <button
          onClick={onExploreStories}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 dark:bg-amber-300 dark:text-stone-950 dark:hover:bg-amber-200 rounded-lg transition-colors cursor-pointer"
        >
          <span>Explore All Essays</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="font-editorial-serif text-3xl font-semibold text-stone-900 dark:text-stone-100">
            Personal Reading Archive
          </h2>
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mt-1">
            <span>{savedArticles.length} {savedArticles.length === 1 ? 'essay' : 'essays'} saved</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">~{totalMinutes} min total reading time</span>
          </div>
        </div>

        <button
          onClick={onClearAll}
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Archive</span>
        </button>
      </div>

      {/* Bookmarked list */}
      <div className="divide-y divide-stone-200/80 dark:divide-stone-800/80">
        {savedArticles.map((article) => (
          <div
            key={article.id}
            className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group"
          >
            <div className="flex items-start gap-4 flex-1">
              <div
                onClick={() => onReadArticle(article)}
                className="w-24 sm:w-32 h-18 sm:h-22 rounded-lg overflow-hidden shrink-0 cursor-pointer shadow-xs"
              >
                <EditorialArtCover
                  theme={article.coverTheme}
                  customImageUrl={article.customImageUrl}
                  title={article.title}
                  category={article.category}
                  aspectRatio="16/9"
                  className="w-full h-full"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-mono text-stone-500 mb-1">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    {CATEGORY_LABELS[article.category]}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{article.readTimeMinutes} min</span>
                </div>

                <h3
                  onClick={() => onReadArticle(article)}
                  className="font-editorial-serif text-lg font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-900 dark:group-hover:text-amber-200 transition-colors cursor-pointer"
                >
                  {article.title}
                </h3>

                <p className="mt-1 text-xs text-stone-600 dark:text-stone-400 font-reading-serif line-clamp-1">
                  By {article.author.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
              <button
                onClick={() => onReadArticle(article)}
                className="px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-200/80 hover:bg-stone-300 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
              >
                Read Now
              </button>
              <button
                onClick={() => onRemoveBookmark(article.id)}
                aria-label="Remove from saved reading list"
                className="p-2 text-stone-400 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
