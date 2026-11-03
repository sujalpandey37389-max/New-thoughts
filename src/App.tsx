import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_ARTICLES } from './data/seedArticles';
import { Article, Category, CATEGORY_LABELS, CATEGORY_DESCRIPTIONS } from './types/blog';
import { TopBar } from './components/TopBar';
import { HeroLeadArticle } from './components/HeroLeadArticle';
import { ArticleCard } from './components/ArticleCard';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { WritePostModal } from './components/WritePostModal';
import { ContentFilters } from './components/ContentFilters';
import { BookmarksView } from './components/BookmarksView';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { Sparkles, Compass, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY_ARTICLES = 'new_thoughts_articles_v1';
const STORAGE_KEY_BOOKMARKS = 'new_thoughts_bookmarks_v1';
const STORAGE_KEY_THEME = 'new_thoughts_theme_v1';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class to document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem(STORAGE_KEY_THEME, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(STORAGE_KEY_THEME, 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Articles state with localStorage hydration
  const [articles, setArticles] = useState<Article[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_ARTICLES);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved articles:', e);
        }
      }
    }
    return INITIAL_ARTICLES;
  });

  // Bookmarks state with localStorage hydration
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved bookmarks:', e);
        }
      }
    }
    return ['art-tech-01', 'art-dev-01'];
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'all' | Category | 'bookmarks'>('all');

  // Search & Tag filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'short'>('latest');

  // Active Modal States
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync articles to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(articles));
  }, [articles]);

  // Sync bookmarks to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Toggle Bookmark Handler
  const handleToggleBookmark = (articleId: string) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(articleId);
      if (exists) {
        showToast('Removed from personal reading archive');
        return prev.filter((id) => id !== articleId);
      } else {
        showToast('Saved to personal reading archive');
        return [...prev, articleId];
      }
    });
  };

  // Clap Handler
  const handleClap = (articleId: string) => {
    setArticles((prev) =>
      prev.map((art) => (art.id === articleId ? { ...art, claps: art.claps + 1 } : art))
    );
    // Keep activeArticle in sync if open
    setActiveArticle((prev) => (prev && prev.id === articleId ? { ...prev, claps: prev.claps + 1 } : prev));
  };

  // Add Comment Handler
  const handleAddComment = (articleId: string, authorName: string, text: string) => {
    const initials = authorName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'TR';

    const newComment = {
      id: `comm-${Date.now()}`,
      author: authorName,
      avatar: initials,
      timestamp: 'Just now',
      content: text,
      likes: 0,
    };

    setArticles((prev) =>
      prev.map((art) =>
        art.id === articleId ? { ...art, comments: [newComment, ...art.comments] } : art
      )
    );

    setActiveArticle((prev) =>
      prev && prev.id === articleId ? { ...prev, comments: [newComment, ...prev.comments] } : prev
    );

    showToast('Your observation was added to the discussion.');
  };

  // Like Comment Handler
  const handleLikeComment = (articleId: string, commentId: string) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id !== articleId) return art;
        return {
          ...art,
          comments: art.comments.map((c) =>
            c.id === commentId ? { ...c, likes: c.likes + 1 } : c
          ),
        };
      })
    );

    setActiveArticle((prev) => {
      if (!prev || prev.id !== articleId) return prev;
      return {
        ...prev,
        comments: prev.comments.map((c) =>
          c.id === commentId ? { ...c, likes: c.likes + 1 } : c
        ),
      };
    });
  };

  // Publish New Story Handler
  const handlePublishPost = (newArticle: Article) => {
    setArticles((prev) => [newArticle, ...prev]);
    showToast(`"${newArticle.title}" published to New Thoughts.`);
    // Automatically open the reader to view the freshly created post
    setActiveArticle(newArticle);
  };

  // Clear all bookmarks
  const handleClearBookmarks = () => {
    setBookmarkedIds([]);
    showToast('Reading archive cleared');
  };

  // Extract unique available tags across articles
  const availableTags = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => a.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [articles]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: articles.length };
    articles.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, [articles]);

  // Filtered and Sorted Articles
  const filteredArticles = useMemo(() => {
    return articles
      .filter((art) => {
        // Tab Category filtering
        if (activeTab !== 'all' && activeTab !== 'bookmarks') {
          if (art.category !== activeTab) return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = art.title.toLowerCase().includes(q);
          const matchesSub = art.subtitle.toLowerCase().includes(q);
          const matchesAuthor = art.author.name.toLowerCase().includes(q);
          const matchesTags = art.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchesTitle && !matchesSub && !matchesAuthor && !matchesTags) return false;
        }

        // Tag filter
        if (selectedTag) {
          if (!art.tags.includes(selectedTag)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.claps - a.claps;
        if (sortBy === 'short') return a.readTimeMinutes - b.readTimeMinutes;
        // Default latest: Lead/Custom first, or preserved order
        return 0;
      });
  }, [articles, activeTab, searchQuery, selectedTag, sortBy]);

  // Saved Bookmarked Articles
  const savedArticles = useMemo(() => {
    return articles.filter((a) => bookmarkedIds.includes(a.id));
  }, [articles, bookmarkedIds]);

  // Lead article identification
  const leadStory = useMemo(() => {
    if (activeTab === 'all' && !searchQuery && !selectedTag) {
      return articles.find((a) => a.isLead) || articles[0];
    }
    return null;
  }, [articles, activeTab, searchQuery, selectedTag]);

  // Featured secondary stories for Tier 2 salience
  const secondaryStories = useMemo(() => {
    if (activeTab === 'all' && !searchQuery && !selectedTag) {
      return articles.filter((a) => a.id !== leadStory?.id).slice(0, 3);
    }
    return [];
  }, [articles, leadStory, activeTab, searchQuery, selectedTag]);

  // Remaining catalog items
  const catalogStories = useMemo(() => {
    if (activeTab === 'all' && !searchQuery && !selectedTag && leadStory) {
      const featuredIds = new Set([leadStory.id, ...secondaryStories.map((s) => s.id)]);
      return filteredArticles.filter((a) => !featuredIds.has(a.id));
    }
    return filteredArticles;
  }, [filteredArticles, leadStory, secondaryStories, activeTab, searchQuery, selectedTag]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917] dark:bg-[#0F1115] dark:text-[#EAE7DF] transition-colors duration-200">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-medium rounded-xl shadow-xl transition-all animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-amber-400 dark:text-amber-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar (Follows Top Bar Contract) */}
      <TopBar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setSearchQuery('');
          setSelectedTag(null);
        }}
        onOpenWriteModal={() => setIsWriteModalOpen(true)}
        savedCount={bookmarkedIds.length}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        {/* Render Bookmarks Archive View */}
        {activeTab === 'bookmarks' ? (
          <BookmarksView
            savedArticles={savedArticles}
            onReadArticle={(art) => setActiveArticle(art)}
            onRemoveBookmark={handleToggleBookmark}
            onClearAll={handleClearBookmarks}
            onExploreStories={() => setActiveTab('all')}
          />
        ) : (
          <>
            {/* Department Header when a specific category is active */}
            {activeTab !== 'all' && (
              <div className="pt-6 pb-8 border-b border-stone-200 dark:border-stone-800">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-800 dark:text-amber-300 font-semibold mb-2">
                  Department
                </div>
                <h1 className="font-editorial-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
                  {CATEGORY_LABELS[activeTab]}
                </h1>
                <p className="mt-2 text-stone-600 dark:text-stone-400 font-reading-serif text-base max-w-2xl leading-relaxed">
                  {CATEGORY_DESCRIPTIONS[activeTab]}
                </p>
              </div>
            )}

            {/* Salience Tier 1: Lead Story (Shown on All Stories homepage when unfiltered) */}
            {leadStory && (
              <HeroLeadArticle
                article={leadStory}
                onReadArticle={(art) => setActiveArticle(art)}
                isBookmarked={bookmarkedIds.includes(leadStory.id)}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

            {/* Salience Tier 2: Curated Secondary Pillars (Shown on All Stories homepage when unfiltered) */}
            {secondaryStories.length > 0 && (
              <section className="py-12 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-editorial-serif text-2xl font-semibold text-stone-900 dark:text-stone-100">
                    Featured Inquiries
                  </h2>
                  <span className="text-xs font-mono uppercase tracking-widest text-stone-400">
                    Editorial Selection
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                  {secondaryStories.map((story) => (
                    <ArticleCard
                      key={story.id}
                      article={story}
                      onReadArticle={(art) => setActiveArticle(art)}
                      isBookmarked={bookmarkedIds.includes(story.id)}
                      onToggleBookmark={handleToggleBookmark}
                      variant="featured"
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Interactive Search, Category Tabs & Tag Indexing */}
            <section className="pt-4">
              <ContentFilters
                selectedCategory={activeTab}
                onSelectCategory={(cat) => {
                  setActiveTab(cat);
                  setSearchQuery('');
                  setSelectedTag(null);
                }}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedTag={selectedTag}
                onSelectTag={setSelectedTag}
                availableTags={availableTags}
                sortBy={sortBy}
                onSortChange={setSortBy}
                categoryCounts={categoryCounts}
              />

              {/* Active Filter Indicators */}
              {(searchQuery || selectedTag) && (
                <div className="py-4 flex items-center justify-between text-xs text-stone-500">
                  <div>
                    Found <span className="font-semibold text-stone-900 dark:text-stone-100">{filteredArticles.length}</span> {filteredArticles.length === 1 ? 'essay' : 'essays'} matching your query
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTag(null);
                    }}
                    className="underline hover:text-stone-800 dark:hover:text-stone-200 cursor-pointer"
                  >
                    Reset filters
                  </button>
                </div>
              )}

              {/* Grid of Articles */}
              <div className="mt-8">
                {catalogStories.length === 0 ? (
                  <div className="py-16 text-center max-w-sm mx-auto">
                    <p className="font-editorial-serif text-xl font-semibold text-stone-800 dark:text-stone-200">
                      No matching thoughts found
                    </p>
                    <p className="mt-2 text-xs text-stone-500 font-reading-serif leading-relaxed">
                      Try adjusting your keywords or clearing the active index filter.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {catalogStories.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        onReadArticle={(art) => setActiveArticle(art)}
                        isBookmarked={bookmarkedIds.includes(article.id)}
                        onToggleBookmark={handleToggleBookmark}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Newsletter Subscription Block */}
            <NewsletterSection />
          </>
        )}
      </main>

      {/* Editorial Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveTab(cat);
          setSearchQuery('');
          setSelectedTag(null);
        }}
      />

      {/* Long-form Article Reader Modal */}
      {activeArticle && (
        <ArticleReaderModal
          article={activeArticle}
          onClose={() => setActiveArticle(null)}
          isBookmarked={bookmarkedIds.includes(activeArticle.id)}
          onToggleBookmark={handleToggleBookmark}
          onClap={handleClap}
          onAddComment={handleAddComment}
          onLikeComment={handleLikeComment}
          relatedArticles={articles.filter(
            (a) => a.id !== activeArticle.id && a.category === activeArticle.category
          )}
          onSelectArticle={(art) => setActiveArticle(art)}
        />
      )}

      {/* Write Story / Publish Modal */}
      <WritePostModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onPublish={handlePublishPost}
      />
    </div>
  );
}
