import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Category, CATEGORY_LABELS } from '../types/blog';

interface FooterProps {
  onSelectCategory: (category: Category | 'all') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-[#0F1115] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Manifesto */}
          <div className="md:col-span-6 space-y-3">
            <span className="font-editorial-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 block">
              New Thoughts
            </span>
            <p className="text-sm font-reading-serif text-stone-600 dark:text-stone-400 max-w-md leading-relaxed">
              An independent publication dedicated to intentional perspectives. We examine the intersection of computing technology, contemplative domestic living, and rigorous personal cultivation.
            </p>
          </div>

          {/* Department Categories */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-widest font-mono text-stone-400 font-semibold block">
              Departments
            </span>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-300">
              {(['technology', 'lifestyle', 'personal-development'] as const).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      scrollToTop();
                    }}
                    className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    scrollToTop();
                  }}
                  className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
                >
                  All Archives
                </button>
              </li>
            </ul>
          </div>

          {/* Publication Ethos & Return to Top */}
          <div className="md:col-span-3 space-y-3 flex flex-col justify-between h-full">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-stone-400 font-semibold block mb-2">
                Ethos
              </span>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Published without algorithmic tracking or synthetic noise. Curated for the slow, deliberate mind.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors cursor-pointer"
              >
                <span>Return to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Hairline Divider & Quiet Copyright */}
        <div className="mt-12 pt-6 border-t border-stone-200/80 dark:border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-mono gap-4">
          <span>&copy; {new Date().getFullYear()} New Thoughts Publication. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <span>Volume I</span>
            <span aria-hidden="true">·</span>
            <span>ISSN 2831-904X</span>
            <span aria-hidden="true">·</span>
            <span>Archival Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
