import React from 'react';
import { PenSquare, Moon, Sun, Bookmark } from 'lucide-react';
import { Category } from '../types/blog';

interface TopBarProps {
  activeTab: 'all' | Category | 'bookmarks';
  onSelectTab: (tab: 'all' | Category | 'bookmarks') => void;
  onOpenWriteModal: () => void;
  savedCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  onOpenWriteModal,
  savedCount,
  isDark,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#0F1115]/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('all')}
          className="text-left font-editorial-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 hover:text-amber-900 dark:hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 focus:outline-none cursor-pointer"
        >
          New Thoughts
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600 dark:text-stone-300">
          <button
            onClick={() => onSelectTab('all')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              activeTab === 'all'
                ? 'border-stone-900 text-stone-900 dark:border-amber-400 dark:text-stone-100 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            All Essays
          </button>
          <button
            onClick={() => onSelectTab('technology')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              activeTab === 'technology'
                ? 'border-stone-900 text-stone-900 dark:border-amber-400 dark:text-stone-100 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Technology
          </button>
          <button
            onClick={() => onSelectTab('lifestyle')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              activeTab === 'lifestyle'
                ? 'border-stone-900 text-stone-900 dark:border-amber-400 dark:text-stone-100 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Lifestyle
          </button>
          <button
            onClick={() => onSelectTab('personal-development')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              activeTab === 'personal-development'
                ? 'border-stone-900 text-stone-900 dark:border-amber-400 dark:text-stone-100 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Personal Development
          </button>
          <button
            onClick={() => onSelectTab('bookmarks')}
            className={`flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              activeTab === 'bookmarks'
                ? 'border-stone-900 text-stone-900 dark:border-amber-400 dark:text-stone-100 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved {savedCount > 0 ? `(${savedCount})` : ''}</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action (+ Theme toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle light and dark color scheme"
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenWriteModal}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-200/90 hover:bg-amber-300 dark:text-stone-900 dark:bg-amber-300 dark:hover:bg-amber-200 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <PenSquare className="w-3.5 h-3.5" />
            <span>Write Story</span>
          </button>
        </div>
      </div>
    </header>
  );
};
