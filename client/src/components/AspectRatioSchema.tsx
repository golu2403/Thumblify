import { RectangleHorizontal, RectangleVertical, Square } from 'lucide-react';
import { memo } from 'react';
import { aspectRatios, type AspectRatio } from '../assets/assets';

const AspectRatioSchema = ({ value, onChange }: { value: AspectRatio; onChange: (ratio: AspectRatio) => void }) => {

    const iconMap = {
        '16:9': <RectangleHorizontal size={20} />,
        '1:1': <Square size={20} />,
        '9:16': <RectangleVertical size={20} />,
    } as Record<AspectRatio, React.ReactNode>;

  return (
    <div className='space-y-3 dark'>
        <label className='block text-sm font-medium text-zinc-400'>Aspect Ratio</label>
        <div className='flex flex-wrap gap-3'>
            {aspectRatios.map((ratio) => (
                <button
                    key={ratio}
                    type="button"
                    onClick={() => onChange(ratio)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-md border text-sm transition ${
                        value === ratio
                            ? 'bg-indigo-600 text-white border-indigo-500'
                            : 'bg-white/5 text-zinc-400 border-white/10 hover:bg-white/6'
                    }`}
                >
                    {iconMap[ratio]}
                    <span className='tracking-widest'>{ratio}</span>
                </button>
            ))}
        </div>
    </div>
  );
};

export default memo(AspectRatioSchema);