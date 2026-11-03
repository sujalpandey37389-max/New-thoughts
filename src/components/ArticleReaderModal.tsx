import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Bookmark,
  Heart,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Type,
  Check,
  MessageSquare,
  Clock,
  ArrowLeft,
  ThumbsUp,
  Send
} from 'lucide-react';
import { Article, CATEGORY_LABELS, CommentItem, ReadingPreferences } from '../types/blog';
import { EditorialArtCover } from './EditorialArtCover';

interface ArticleReaderModalProps {
  article: Article;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  onClap: (articleId: string) => void;
  onAddComment: (articleId: string, authorName: string, text: string) => void;
  onLikeComment: (articleId: string, commentId: string) => void;
  relatedArticles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onClap,
  onAddComment,
  onLikeComment,
  relatedArticles,
  onSelectArticle,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [preferences, setPreferences] = useState<ReadingPreferences>({
    fontFamily: 'serif',
    fontSize: 'normal',
    lineHeight: 'relaxed',
  });
  const [showTypographyControls, setShowTypographyControls] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [clappedTimes, setClappedTimes] = useState(0);

  // Audio Player Simulation
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSecondsElapsed, setAudioSecondsElapsed] = useState(0);

  // Comment input
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress for the top reading bar
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  };

  // Keyboard escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Audio timer simulation
  useEffect(() => {
    let timer: any;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioSecondsElapsed((prev) => {
          if (prev >= article.audioDurationSeconds) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio, article.audioDurationSeconds]);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleClapClick = () => {
    onClap(article.id);
    setClappedTimes((prev) => prev + 1);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const author = newCommentAuthor.trim() || 'Thoughtful Reader';
    onAddComment(article.id, author, newCommentText.trim());
    setNewCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 3000);
  };

  const formatAudioTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Font size classes
  const getFontSizeClass = () => {
    switch (preferences.fontSize) {
      case 'large':
        return 'text-lg leading-[1.85]';
      case 'larger':
        return 'text-xl leading-[1.9]';
      case 'normal':
      default:
        return 'text-base leading-[1.8]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-center">
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full max-w-4xl h-full overflow-y-auto bg-[#FAF8F5] dark:bg-[#0F1115] text-[#1C1917] dark:text-[#EAE7DF] shadow-2xl transition-colors duration-200"
      >
        {/* Top Reading Progress Bar */}
        <div className="sticky top-0 left-0 right-0 z-50 h-1 bg-stone-200 dark:bg-stone-800">
          <div
            className="h-full bg-amber-600 dark:bg-amber-400 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Reader Action Header Bar */}
        <div className="sticky top-1 z-40 bg-[#FAF8F5]/95 dark:bg-[#0F1115]/95 backdrop-blur-md border-b border-stone-200/90 dark:border-stone-800/90 px-6 py-3 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Stories</span>
          </button>

          {/* Reading Utilities: Typography, Audio, Bookmark, Claps, Share */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Typography Popover Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowTypographyControls(!showTypographyControls)}
                aria-label="Adjust typography"
                className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              >
                <Type className="w-4 h-4" />
              </button>

              {showTypographyControls && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 shadow-xl z-50 text-xs">
                  <div className="font-semibold text-stone-900 dark:text-stone-100 mb-3 uppercase tracking-wider font-mono text-[11px]">
                    Reading Typography
                  </div>

                  <div className="mb-3">
                    <span className="text-stone-500 dark:text-stone-400 block mb-1.5">Typeface</span>
                    <div className="grid grid-cols-2 gap-1 p-0.5 bg-stone-100 dark:bg-stone-800 rounded-lg">
                      <button
                        onClick={() => setPreferences({ ...preferences, fontFamily: 'serif' })}
                        className={`py-1 rounded font-reading-serif font-medium cursor-pointer ${
                          preferences.fontFamily === 'serif'
                            ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                            : 'text-stone-600 dark:text-stone-400'
                        }`}
                      >
                        Serif (Book)
                      </button>
                      <button
                        onClick={() => setPreferences({ ...preferences, fontFamily: 'sans' })}
                        className={`py-1 rounded font-sans-ui font-medium cursor-pointer ${
                          preferences.fontFamily === 'sans'
                            ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                            : 'text-stone-600 dark:text-stone-400'
                        }`}
                      >
                        Clean Sans
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-stone-500 dark:text-stone-400 block mb-1.5">Text Scale</span>
                    <div className="grid grid-cols-3 gap-1 p-0.5 bg-stone-100 dark:bg-stone-800 rounded-lg">
                      {(['normal', 'large', 'larger'] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => setPreferences({ ...preferences, fontSize: size })}
                          className={`py-1 rounded capitalize font-medium cursor-pointer ${
                            preferences.fontSize === size
                              ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                              : 'text-stone-600 dark:text-stone-400'
                          }`}
                        >
                          {size === 'normal' ? 'Standard' : size === 'large' ? 'Medium' : 'Large'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Audio narration button */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              aria-label={isPlayingAudio ? 'Pause audio narration' : 'Play audio narration'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                isPlayingAudio
                  ? 'bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-950/50 dark:border-amber-700 dark:text-amber-200'
                  : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800'
              }`}
            >
              {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isPlayingAudio ? 'Playing' : 'Listen'}</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this essay'}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600 text-amber-600 dark:fill-amber-400 dark:text-amber-400' : ''}`} />
            </button>

            {/* Share Link button */}
            <button
              onClick={handleShare}
              aria-label="Share article link"
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer relative"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close reader"
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Audio Player Drawer (When active) */}
        {isPlayingAudio && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900/50 px-6 py-2.5 flex items-center justify-between text-xs text-amber-950 dark:text-amber-200">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              <span className="font-medium">Audio Dispatch · Voice Model: Studio Contemplative</span>
            </div>
            <div className="flex items-center gap-3 tabular-nums font-mono">
              <span>{formatAudioTime(audioSecondsElapsed)}</span>
              <span>/</span>
              <span>{formatAudioTime(article.audioDurationSeconds)}</span>
            </div>
          </div>
        )}

        {/* Article Body Content Canvas */}
        <article className="max-w-2xl mx-auto px-6 py-12">
          {/* Unboxed Metadata (Zero-pill discipline) */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-stone-500 dark:text-stone-400 mb-4">
            <span className="font-semibold text-amber-800 dark:text-amber-300">
              {CATEGORY_LABELS[article.category]}
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{article.readTimeMinutes} min read</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedAt}</span>
          </div>

          {/* Headline */}
          <h1 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-stone-900 dark:text-stone-100 text-balance">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-lg sm:text-xl font-reading-serif text-stone-600 dark:text-stone-300 leading-relaxed">
            {article.subtitle}
          </p>

          {/* Author Lockup */}
          <div className="mt-8 mb-10 pb-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-editorial-serif font-bold text-sm flex items-center justify-center border border-stone-300 dark:border-stone-700">
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

            {/* Quick clap pill */}
            <button
              onClick={handleClapClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-300 dark:border-stone-700 hover:border-amber-500 text-xs font-mono tabular-nums text-stone-700 dark:text-stone-300 hover:text-amber-600 transition-colors cursor-pointer"
            >
              <Heart className={`w-3.5 h-3.5 ${clappedTimes > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{article.claps}</span>
            </button>
          </div>

          {/* Visual Artwork Feature Cover */}
          <div className="rounded-xl overflow-hidden mb-12 shadow-sm border border-stone-200/60 dark:border-stone-800/60">
            <EditorialArtCover
              theme={article.coverTheme}
              customImageUrl={article.customImageUrl}
              title={article.title}
              category={article.category}
              aspectRatio="16/9"
              className="w-full"
            />
          </div>

          {/* Narrative Prose */}
          <div
            className={`${
              preferences.fontFamily === 'serif' ? 'font-reading-serif' : 'font-sans-ui'
            } ${getFontSizeClass()} text-stone-800 dark:text-stone-200 space-y-6`}
          >
            {/* Opening Drop-Cap Lead Paragraph */}
            <p className="editorial-drop-cap font-normal">
              {article.content.leadParagraph}
            </p>

            {/* Structured Sections */}
            {article.content.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-6 pt-4">
                {section.heading && (
                  <h2 className="font-editorial-serif text-2xl font-semibold text-stone-900 dark:text-stone-100 pt-6">
                    {section.heading}
                  </h2>
                )}

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}

                {/* Elegant Pull Quote (Generous padding with hairline top/bottom borders, NO thick left accent border) */}
                {section.pullQuote && (
                  <div className="my-10 py-6 border-y border-stone-200 dark:border-stone-800 text-center px-4">
                    <blockquote className="font-editorial-serif text-xl sm:text-2xl italic font-normal text-stone-800 dark:text-stone-200 leading-snug">
                      "{section.pullQuote}"
                    </blockquote>
                  </div>
                )}

                {/* Synthesis / Takeaway Box (Hairline border, no pills) */}
                {section.takeawayBox && (
                  <div className="my-8 p-6 bg-stone-100/70 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 rounded-xl font-sans-ui text-sm">
                    <h4 className="font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider font-mono text-xs mb-3">
                      {section.takeawayBox.title}
                    </h4>
                    <ul className="space-y-2 text-stone-700 dark:text-stone-300 list-disc list-inside">
                      {section.takeawayBox.points.map((point, ptIdx) => (
                        <li key={ptIdx} className="leading-relaxed">{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tags (Rendered as unboxed inline typography with #) */}
          <div className="mt-12 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center gap-3 text-xs font-mono text-stone-500 dark:text-stone-400">
            <span className="uppercase tracking-widest text-stone-400">Indexed Under:</span>
            {article.tags.map((tag) => (
              <span key={tag} className="hover:text-amber-800 dark:hover:text-amber-300 transition-colors">
                #{tag.toLowerCase().replace(/\s+/g, '-')}
              </span>
            ))}
          </div>

          {/* Author Deep Bio Card */}
          <div className="mt-12 p-6 bg-stone-100/60 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-stone-300 dark:bg-stone-700 text-stone-800 dark:text-stone-200 font-editorial-serif font-bold text-base flex items-center justify-center shrink-0">
              {article.author.avatar}
            </div>
            <div>
              <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                Written by {article.author.name}
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
                {article.author.role}
              </p>
              <p className="text-xs font-reading-serif text-stone-600 dark:text-stone-300 leading-relaxed">
                {article.author.bio}
              </p>
            </div>
          </div>

          {/* Claps & Appreciation Station */}
          <div className="mt-12 py-8 border-y border-stone-200 dark:border-stone-800 text-center">
            <p className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-4">
              Did this spark a new thought?
            </p>
            <button
              onClick={handleClapClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:border-amber-500 rounded-full shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer text-sm font-semibold text-stone-800 dark:text-stone-200"
            >
              <Heart className={`w-4 h-4 ${clappedTimes > 0 ? 'fill-red-500 text-red-500' : 'text-stone-400'}`} />
              <span>Applaud Essay ({article.claps})</span>
            </button>
          </div>

          {/* Interactive Comments Section */}
          <section className="mt-14 pt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-editorial-serif text-2xl font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                <span>Discussion ({article.comments.length})</span>
              </h3>
            </div>

            {/* Post comment form */}
            <form onSubmit={handleSubmitComment} className="mb-8 p-5 bg-stone-100/60 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl">
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Your Name (or leave blank for Thoughtful Reader)"
                  value={newCommentAuthor}
                  onChange={(e) => setNewCommentAuthor(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-500"
                />
              </div>
              <div className="mb-3">
                <textarea
                  rows={3}
                  required
                  placeholder="Share a thoughtful observation, counterpoint, or reflection..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-500 resize-none font-reading-serif"
                />
              </div>
              <div className="flex items-center justify-between">
                {commentSubmitted ? (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Your thought has been recorded.</span>
                  </span>
                ) : <span />}
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-lg text-xs font-semibold hover:bg-stone-800 dark:hover:bg-white transition-colors cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Submit Comment</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {article.comments.length === 0 ? (
                <p className="text-xs text-stone-500 italic py-4">
                  No public thoughts shared yet. Be the first to initiate this conversation.
                </p>
              ) : (
                article.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 border border-stone-200/80 dark:border-stone-800/80 rounded-xl bg-white/50 dark:bg-stone-900/30"
                  >
                    <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-stone-200 dark:bg-stone-800 text-[10px] font-bold flex items-center justify-center text-stone-700 dark:text-stone-300">
                          {comment.avatar}
                        </span>
                        <span className="font-semibold text-stone-800 dark:text-stone-200">
                          {comment.author}
                        </span>
                      </div>
                      <span className="font-mono text-[11px]">{comment.timestamp}</span>
                    </div>

                    <p className="text-xs text-stone-700 dark:text-stone-300 font-reading-serif leading-relaxed mb-3">
                      {comment.content}
                    </p>

                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => onLikeComment(article.id, comment.id)}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-500 hover:text-amber-600 transition-colors cursor-pointer"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Related Stories from the Archive */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-8 border-t border-stone-200 dark:border-stone-800">
              <h3 className="font-editorial-serif text-xl font-semibold text-stone-900 dark:text-stone-100 mb-6">
                Further Reading in {CATEGORY_LABELS[article.category]}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.slice(0, 2).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className="p-4 border border-stone-200 dark:border-stone-800 rounded-xl hover:border-stone-400 dark:hover:border-stone-600 cursor-pointer transition-colors"
                  >
                    <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-1">
                      {rel.readTimeMinutes} min read
                    </div>
                    <h4 className="font-editorial-serif text-sm font-semibold text-stone-900 dark:text-stone-100 line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};
