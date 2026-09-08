import { memo } from 'react';
import { ChevronDown, Sparkles, Square, Image, PenTool, Cpu } from 'lucide-react';
import { thumbnailStyles, type ThumbnailStyle } from '../assets/assets';

const styleDescriptions: Record<ThumbnailStyle, string> = {
  "Bold & Graphic": "High contrast, bold typography, striking visuals",
  "Minimalist": "Clean, simple, lots of white space",
  "Photorealistic": "Photo-based, natural looking",
  "Illustrated": "Hand-drawn, artistic, creative",
  "Tech/Futuristic": "Modern, sleek, tech-inspired",
};

const styleIcons: Record<ThumbnailStyle, React.ReactNode> = {
  "Bold & Graphic": <Sparkles className="h-4 w-4" />,
  "Minimalist": <Square className="h-4 w-4" />,
  "Photorealistic": <Image className="h-4 w-4" />,
  "Illustrated": <PenTool className="h-4 w-4" />,
  "Tech/Futuristic": <Cpu className="h-4 w-4" />,
};

const StyleSelector = ({ value, onChange, isOpen, setIsOpen }: { value: ThumbnailStyle; onChange: (style: ThumbnailStyle) => void; isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) => {
  return (
    <div className='relative space-y-3 dark'>
      <label className='block text-sm font-medium text-zinc-200'>Thumbnail Style</label>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='flex w-full items-center justify-between rounded-md border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10'
      >
        <div className='space-y-1'>
          <div className='flex items-center gap-2 font-medium'>
            {styleIcons[value]}
            <span>{value}</span>
          </div>
          <p className='text-xs text-zinc-400'>{styleDescriptions[value]}</p>
        </div>
        <ChevronDown className={[ 'h-5 w-5 text-zinc-400 transition-transform', isOpen && 'rotate-180' ].join('')} />
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-md shadow-lg z-10'>
          {thumbnailStyles.map((style) => (
            <button
              key={style}
              type='button'
              onClick={() => {
                onChange(style);
                setIsOpen(false);
              }}
              className={`w-full text-left px-5 py-3 text-sm transition flex items-center gap-3 ${
                value === style
                  ? 'bg-indigo-600/20 text-indigo-300 border-l-2 border-indigo-500'
                  : 'text-zinc-300 hover:bg-white/5'
              }`}
            >
              <span className='text-zinc-400'>{styleIcons[style]}</span>
              <div className='flex flex-col'>
                <span className='font-medium'>{style}</span>
                <span className='text-xs opacity-75'>{styleDescriptions[style]}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(StyleSelector);