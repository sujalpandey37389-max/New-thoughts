import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { Category, CATEGORY_LABELS } from '../types/blog';

interface ContentFiltersProps {
  selectedCategory: 'all' | Category;
  onSelectCategory: (category: 'all' | Category) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  availableTags: string[];
  sortBy: 'latest' | 'popular' | 'short';
  onSortChange: (sort: 'latest' | 'popular' | 'short') => void;
  categoryCounts: Record<string, number>;
}

export const ContentFilters: React.FC<ContentFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedTag,
  onSelectTag,
  availableTags,
  sortBy,
  onSortChange,
  categoryCounts,
}) => {
  return (
    <div className="space-y-4 py-6 border-b border-stone-200 dark:border-stone-800">
      {/* Category Segmented Control & Search Input */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Segmented Tabs (Functional Buttons) */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/60 dark:bg-stone-800/80 rounded-xl overflow-x-auto">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            All Essays ({categoryCounts['all'] || 0})
          </button>

          {(['technology', 'lifestyle', 'personal-development'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {CATEGORY_LABELS[cat]} ({categoryCounts[cat] || 0})
            </button>
          ))}
        </div>

        {/* Live Search Input & Sort Options */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search essays, authors, ideas..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-white dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-500"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="px-3 py-1.5 text-xs bg-white dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-700 dark:text-stone-200 focus:outline-none cursor-pointer"
          >
            <option value="latest">Newest First</option>
            <option value="popular">Most Applauded</option>
            <option value="short">Quick Reads (&lt;6m)</option>
          </select>
        </div>
      </div>

      {/* Tag Filter Ribbon (Quiet unboxed tags with subtle active state) */}
      {availableTags.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pt-1 text-xs font-mono">
          <span className="text-stone-400 text-[11px] uppercase tracking-wider shrink-0">
            Index:
          </span>
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-0.5 rounded text-[11px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedTag === tag
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-semibold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              #{tag.toLowerCase().replace(/\s+/g, '-')}
              {selectedTag === tag && ' ×'}
            </button>
          ))}
          {selectedTag && (
            <button
              onClick={() => onSelectTag(null)}
              className="text-[11px] text-stone-400 underline hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer shrink-0"
            >
              Clear filter
            </button>
          )}
        </div>
      )}
    </div>
  );
};
