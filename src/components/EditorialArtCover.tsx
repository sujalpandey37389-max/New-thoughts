import React, { useState } from 'react';
import { Article } from '../types/blog';

interface EditorialArtCoverProps {
  theme: Article['coverTheme'];
  customImageUrl?: string;
  title: string;
  category: Article['category'];
  aspectRatio?: '16/9' | '4/3' | '3/2' | '21/9';
  className?: string;
}

export const EditorialArtCover: React.FC<EditorialArtCoverProps> = ({
  theme,
  customImageUrl,
  title,
  category,
  aspectRatio = '16/9',
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  // If valid custom image provided and hasn't errored out
  if (customImageUrl && !imageError) {
    return (
      <div className={`relative overflow-hidden bg-stone-100 dark:bg-stone-900 ${className}`} style={{ aspectRatio }}>
        <img
          src={customImageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
      </div>
    );
  }

  // Domain-specific artistic vector artwork matching Museum & Editorial aesthetics
  const getThemeBackground = () => {
    switch (theme) {
      case 'indigo':
        return {
          bg: 'bg-[#141B2D]',
          accent: '#4F75FF',
          secondary: '#1E293B',
          glow: 'from-blue-900/40 via-indigo-950/70 to-[#0B0F1A]',
          pattern: (
            <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen" viewBox="0 0 600 340" fill="none" preserveAspectRatio="xMidYMid slice">
              <circle cx="480" cy="80" r="140" stroke="#38BDF8" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="480" cy="80" r="90" stroke="#818CF8" strokeWidth="1" opacity="0.5" />
              <circle cx="480" cy="80" r="40" fill="#6366F1" fillOpacity="0.15" stroke="#A5B4FC" strokeWidth="1.2" />
              <path d="M 0 280 Q 200 180 600 240" stroke="#60A5FA" strokeWidth="0.8" opacity="0.35" />
              <path d="M 0 310 Q 300 220 600 290" stroke="#93C5FD" strokeWidth="0.5" opacity="0.25" />
              <line x1="80" y1="40" x2="80" y2="300" stroke="#ffffff" strokeWidth="0.4" opacity="0.15" />
              <line x1="200" y1="40" x2="200" y2="300" stroke="#ffffff" strokeWidth="0.4" opacity="0.15" />
              <line x1="320" y1="40" x2="320" y2="300" stroke="#ffffff" strokeWidth="0.4" opacity="0.15" />
            </svg>
          )
        };
      case 'sage':
        return {
          bg: 'bg-[#15241C]',
          accent: '#10B981',
          secondary: '#1C382A',
          glow: 'from-emerald-950/60 via-green-950/80 to-[#0A140F]',
          pattern: (
            <svg className="absolute inset-0 w-full h-full opacity-45 mix-blend-screen" viewBox="0 0 600 340" fill="none" preserveAspectRatio="xMidYMid slice">
              <path d="M120,40 C220,100 240,260 400,280" stroke="#34D399" strokeWidth="1.2" opacity="0.6" />
              <path d="M80,80 C180,140 200,220 340,300" stroke="#6EE7B7" strokeWidth="0.8" opacity="0.4" />
              <circle cx="400" cy="280" r="18" fill="#059669" fillOpacity="0.25" stroke="#A7F3D0" strokeWidth="1" />
              <circle cx="120" cy="40" r="12" fill="#047857" fillOpacity="0.3" stroke="#6EE7B7" strokeWidth="0.8" />
              <rect x="30" y="30" width="540" height="280" rx="4" stroke="#A7F3D0" strokeWidth="0.4" strokeDasharray="4 4" opacity="0.2" />
            </svg>
          )
        };
      case 'amber':
        return {
          bg: 'bg-[#291B0D]',
          accent: '#D97706',
          secondary: '#3D2814',
          glow: 'from-amber-950/70 via-stone-900/90 to-[#1A1007]',
          pattern: (
            <svg className="absolute inset-0 w-full h-full opacity-45 mix-blend-screen" viewBox="0 0 600 340" fill="none" preserveAspectRatio="xMidYMid slice">
              <circle cx="300" cy="170" r="160" stroke="#F59E0B" strokeWidth="0.5" strokeDasharray="6 4" opacity="0.3" />
              <circle cx="300" cy="170" r="110" stroke="#D97706" strokeWidth="0.8" opacity="0.5" />
              <circle cx="300" cy="170" r="60" stroke="#FBBF24" strokeWidth="1.2" opacity="0.6" />
              <circle cx="300" cy="170" r="12" fill="#FDE68A" fillOpacity="0.8" />
              <line x1="40" y1="170" x2="560" y2="170" stroke="#F59E0B" strokeWidth="0.5" opacity="0.25" />
              <line x1="300" y1="20" x2="300" y2="320" stroke="#F59E0B" strokeWidth="0.5" opacity="0.25" />
            </svg>
          )
        };
      case 'terracotta':
        return {
          bg: 'bg-[#2C1510]',
          accent: '#EA580C',
          secondary: '#431F18',
          glow: 'from-orange-950/60 via-amber-950/80 to-[#180B07]',
          pattern: (
            <svg className="absolute inset-0 w-full h-full opacity-50 mix-blend-screen" viewBox="0 0 600 340" fill="none" preserveAspectRatio="xMidYMid slice">
              <path d="M 160 340 L 160 160 Q 160 60 260 60 Q 360 60 360 160 L 360 340" stroke="#FB923C" strokeWidth="1" opacity="0.55" />
              <path d="M 210 340 L 210 180 Q 210 110 260 110 Q 310 110 310 180 L 310 340" stroke="#FDBA74" strokeWidth="0.75" opacity="0.4" />
              <circle cx="260" cy="180" r="32" stroke="#FED7AA" strokeWidth="1.2" fill="#C2410C" fillOpacity="0.2" />
              <line x1="60" y1="240" x2="540" y2="240" stroke="#F97316" strokeWidth="0.5" opacity="0.3" />
            </svg>
          )
        };
      case 'stone':
        return {
          bg: 'bg-[#1C1A17]',
          accent: '#A8A29E',
          secondary: '#292524',
          glow: 'from-stone-900/70 via-stone-950/80 to-[#12110F]',
          pattern: (
            <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen" viewBox="0 0 600 340" fill="none" preserveAspectRatio="xMidYMid slice">
              <rect x="180" y="50" width="240" height="240" stroke="#E7E5E4" strokeWidth="0.8" opacity="0.4" />
              <rect x="220" y="90" width="160" height="160" stroke="#D6D3D1" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.3" />
              <line x1="80" y1="50" x2="520" y2="290" stroke="#A8A29E" strokeWidth="0.5" opacity="0.25" />
              <circle cx="300" cy="170" r="80" stroke="#F5F5F4" strokeWidth="0.75" opacity="0.35" />
            </svg>
          )
        };
      case 'obsidian':
      default:
        return {
          bg: 'bg-[#0E1015]',
          accent: '#D4AF37',
          secondary: '#1A1E29',
          glow: 'from-slate-900/80 via-zinc-950/90 to-[#07080B]',
          pattern: (
            <svg className="absolute inset-0 w-full h-full opacity-45 mix-blend-screen" viewBox="0 0 600 340" fill="none" preserveAspectRatio="xMidYMid slice">
              <circle cx="300" cy="170" r="120" stroke="#E2E8F0" strokeWidth="0.6" opacity="0.4" />
              <path d="M 120 170 L 480 170 M 300 40 L 300 300" stroke="#94A3B8" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
              <polygon points="300,90 370,170 300,250 230,170" stroke="#FBBF24" strokeWidth="0.8" fill="#F59E0B" fillOpacity="0.08" />
              <circle cx="300" cy="90" r="4" fill="#FBBF24" />
              <circle cx="370" cy="170" r="4" fill="#FBBF24" />
              <circle cx="300" cy="250" r="4" fill="#FBBF24" />
              <circle cx="230" cy="170" r="4" fill="#FBBF24" />
            </svg>
          )
        };
    }
  };

  const currentTheme = getThemeBackground();

  return (
    <div
      className={`relative overflow-hidden w-full select-none ${currentTheme.bg} ${className}`}
      style={{ aspectRatio }}
      role="img"
      aria-label={`Editorial illustration for ${title}`}
    >
      {/* Radiant ambient gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.glow} opacity-90`} />

      {/* Domain Vector Patterns */}
      {currentTheme.pattern}

      {/* Subtle fine museum paper grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
          backgroundSize: '16px 16px',
        }}
      />

      {/* Curatorial watermark badge */}
      <div className="absolute bottom-3 right-4 flex items-center gap-2 text-[10px] tracking-widest uppercase font-mono text-white/40">
        <span>ARCHIVE REF // {category.slice(0, 4).toUpperCase()}</span>
      </div>
    </div>
  );
};
