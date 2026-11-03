import React, { useState } from 'react';
import { X, Sparkles, Eye, Edit3, Image, Bold, Italic, Heading, Quote, List, Check } from 'lucide-react';
import { Article, Category, CATEGORY_LABELS } from '../types/blog';
import { EditorialArtCover } from './EditorialArtCover';

interface WritePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (newArticle: Article) => void;
}

export const WritePostModal: React.FC<WritePostModalProps> = ({
  isOpen,
  onClose,
  onPublish,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<Category>('technology');
  const [authorName, setAuthorName] = useState('Elena Vance');
  const [authorRole, setAuthorRole] = useState('Contributing Essayist');
  const [coverTheme, setCoverTheme] = useState<Article['coverTheme']>('indigo');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('Future Systems, Philosophy');
  const [bodyText, setBodyText] = useState(
    `Every technological paradigm begins not with code, but with an underlying philosophy of human agency.\n\n01. The Nature of the Shift\nWhen tools change, the mind shifts its posture. In our modern rush for velocity, we have overlooked the quiet power of contemplation.\n\n"True intellectual sovereignty is the ability to choose what receives your undivided contemplation."\n\n02. The Way Forward\nBy creating intentional boundaries between the automatic and the deliberate, we reclaim our capacity for original thought.`
  );
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  if (!isOpen) return null;

  // Auto-compute reading time from words (average 200 words per minute)
  const wordCount = (title + ' ' + subtitle + ' ' + bodyText)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const computedReadTime = Math.max(1, Math.ceil(wordCount / 200));

  const insertFormatting = (type: 'bold' | 'italic' | 'heading' | 'quote' | 'list') => {
    switch (type) {
      case 'bold':
        setBodyText((prev) => prev + '\n**Bold Statement**');
        break;
      case 'italic':
        setBodyText((prev) => prev + '\n*Reflective nuance*');
        break;
      case 'heading':
        setBodyText((prev) => prev + '\n\n01. Section Heading\n');
        break;
      case 'quote':
        setBodyText((prev) => prev + '\n\n"A timeless observation that cuts through ambient noise."\n');
        break;
      case 'list':
        setBodyText((prev) => prev + '\n\n- Primary Principle\n- Secondary Constraint\n- Empirical Observation\n');
        break;
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !bodyText.trim()) return;

    // Parse the body text into structured lead and sections
    const paragraphs = bodyText
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const leadParagraph =
      paragraphs[0] ||
      'An exploration of ideas shaping our relationship with technology, living, and human growth.';

    // Construct structured sections
    const remainingParagraphs = paragraphs.slice(1);
    const sections: Article['content']['sections'] = [];
    let currentHeading = '01. Core Perspective';
    let currentParagraphs: string[] = [];
    let currentPullQuote: string | undefined = undefined;

    remainingParagraphs.forEach((p) => {
      if (p.startsWith('"') && p.endsWith('"')) {
        currentPullQuote = p.replace(/^"|"$/g, '');
      } else if (p.startsWith('0') || p.startsWith('1') || p.startsWith('2') || p.startsWith('3') || p.startsWith('#')) {
        if (currentParagraphs.length > 0) {
          sections.push({
            heading: currentHeading,
            paragraphs: currentParagraphs,
            pullQuote: currentPullQuote,
          });
          currentParagraphs = [];
          currentPullQuote = undefined;
        }
        currentHeading = p.replace(/^#+\s*/, '');
      } else {
        currentParagraphs.push(p);
      }
    });

    if (currentParagraphs.length > 0) {
      sections.push({
        heading: currentHeading,
        paragraphs: currentParagraphs,
        pullQuote: currentPullQuote,
      });
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const initials = authorName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'NT';

    const newArticle: Article = {
      id: `custom-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: title.trim(),
      subtitle: subtitle.trim() || 'A newly recorded dispatch exploring ideas in ' + CATEGORY_LABELS[category] + '.',
      category,
      author: {
        name: authorName.trim() || 'Contributing Essayist',
        role: authorRole.trim() || 'Independent Thinker',
        avatar: initials,
        bio: 'Contributor to New Thoughts publication.',
      },
      publishedAt: 'Today',
      readTimeMinutes: computedReadTime,
      coverTheme,
      customImageUrl: customImageUrl.trim() || undefined,
      tags: tags.length > 0 ? tags : [CATEGORY_LABELS[category]],
      claps: 1,
      audioDurationSeconds: computedReadTime * 60,
      content: {
        leadParagraph,
        sections: sections.length > 0 ? sections : [
          {
            heading: '01. Reflection',
            paragraphs: [
              'When we articulate our reflections into shared language, we invite the world to think alongside us.',
            ],
          },
        ],
      },
      comments: [],
    };

    onPublish(newArticle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#FAF8F5] dark:bg-[#0F1115] text-[#1C1917] dark:text-[#EAE7DF] w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-editorial-serif text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Compose Editorial Essay
            </h2>
            <div className="flex items-center gap-1 bg-stone-200/70 dark:bg-stone-800 p-0.5 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('write')}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  activeTab === 'write'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-500'
                }`}
              >
                <Edit3 className="w-3 h-3 inline mr-1" />
                Write
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  activeTab === 'preview'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-500'
                }`}
              >
                <Eye className="w-3 h-3 inline mr-1" />
                Preview
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Form */}
        <form onSubmit={handlePublish} className="flex-1 overflow-y-auto p-6 space-y-5">
          {activeTab === 'write' ? (
            <>
              {/* Category Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-stone-500 dark:text-stone-400 mb-2 font-medium">
                  Primary Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['technology', 'lifestyle', 'personal-development'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors text-center ${
                        category === cat
                          ? 'border-stone-900 bg-stone-900 text-white dark:border-amber-400 dark:bg-amber-300 dark:text-stone-950 font-semibold'
                          : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-500'
                      }`}
                    >
                      {CATEGORY_LABELS[cat]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-stone-500 dark:text-stone-400 mb-1 font-medium">
                  Essay Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Cognitive Architecture of Solitude"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 font-editorial-serif text-lg focus:outline-none focus:border-stone-600"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-stone-500 dark:text-stone-400 mb-1 font-medium">
                  Deck / Subtitle
                </label>
                <input
                  type="text"
                  placeholder="A concise, compelling single sentence exploring the core thesis."
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:border-stone-600"
                />
              </div>

              {/* Visual Cover Customization */}
              <div className="p-4 bg-stone-100/70 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase tracking-wider font-mono text-stone-600 dark:text-stone-300 font-medium">
                    Editorial Cover Aesthetic
                  </span>
                  <span className="text-[11px] text-stone-500">Vector artwork palette</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(['indigo', 'stone', 'amber', 'sage', 'terracotta', 'obsidian'] as const).map((th) => (
                    <button
                      key={th}
                      type="button"
                      onClick={() => setCoverTheme(th)}
                      className={`px-3 py-1.5 rounded-md text-xs font-mono capitalize transition-all cursor-pointer ${
                        coverTheme === th
                          ? 'ring-2 ring-stone-900 dark:ring-amber-400 font-bold bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                          : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      {th}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-[11px] text-stone-500 dark:text-stone-400 mb-1">
                    Or custom image URL (optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.example.com/cover.jpg"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-md text-xs text-stone-800 dark:text-stone-200 focus:outline-none"
                  />
                </div>
              </div>

              {/* Author & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-stone-500 dark:text-stone-400 mb-1 font-medium">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-sm text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-stone-500 dark:text-stone-400 mb-1 font-medium">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Deep Work, Focus, Habits"
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-sm text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
              </div>

              {/* Formatting Toolbar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs uppercase tracking-wider font-mono text-stone-500 dark:text-stone-400 font-medium">
                    Essay Body (Paragraphs & Pull Quotes)
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => insertFormatting('heading')}
                      title="Insert Section Heading"
                      className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 cursor-pointer"
                    >
                      <Heading className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('quote')}
                      title="Insert Pull Quote"
                      className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 cursor-pointer"
                    >
                      <Quote className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('list')}
                      title="Insert List"
                      className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 cursor-pointer"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <textarea
                  rows={9}
                  required
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg font-reading-serif text-sm leading-relaxed text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-600 resize-y"
                  placeholder="Draft your longform thought. Separate sections with blank lines, and wrap quotes in double-quotes."
                />
              </div>

              {/* Dynamic Stats Meter */}
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 dark:text-stone-400 pt-1">
                <span>{wordCount} words written</span>
                <span>Est. reading pace: ~{computedReadTime} min</span>
              </div>
            </>
          ) : (
            /* Live Preview Mode */
            <div className="space-y-6 max-w-xl mx-auto py-4">
              <div className="rounded-xl overflow-hidden">
                <EditorialArtCover
                  theme={coverTheme}
                  customImageUrl={customImageUrl}
                  title={title || 'Untitled Thought'}
                  category={category}
                  aspectRatio="16/9"
                />
              </div>
              <div className="text-xs uppercase tracking-widest font-mono text-stone-500">
                {CATEGORY_LABELS[category]} · {computedReadTime} min read · Preview
              </div>
              <h1 className="font-editorial-serif text-3xl font-semibold text-stone-900 dark:text-stone-100">
                {title || 'Untitled Thought'}
              </h1>
              <p className="text-stone-600 dark:text-stone-300 font-reading-serif italic text-base">
                {subtitle || 'No subtitle specified.'}
              </p>
              <div className="font-reading-serif text-sm leading-relaxed text-stone-800 dark:text-stone-200 space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
                {bodyText.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
            >
              Discard Draft
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-stone-900 bg-amber-300 hover:bg-amber-400 dark:bg-amber-300 dark:hover:bg-amber-200 rounded-lg transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Publish to "New Thoughts"</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
