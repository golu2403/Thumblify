import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { colorSchemes, dummyThumbnails, type AspectRatio, type IThumbnail, type ThumbnailStyle } from '../assets/assets';
import SoftBackdrop from '../components/SoftBackdrop';
import AspectRatioSchema from '../components/AspectRatioSchema';
import StyleSelector from '../components/StyleSelector';
import ColorSchemaSelector from '../components/ColorSchemaSelector';
import PreviewPanel from '../components/PreviewPanel';


const Generate = () => {
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
   const [loading, setLoading] = useState(false);
   const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
   const [colorSchemeId,setColorSchemeId] = useState<string>(colorSchemes[0].id);
   const [style,setStyle] = useState<ThumbnailStyle>('Bold & Graphic');
   const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);

   const handleGenerate = async () => {
    setLoading(true);
   
  }

  const fetchThumbnail = async () => {
    if(!id) return;
    setLoading(true);
    const thumbnail :any=dummyThumbnails.find((t)=>t._id===id);
    setThumbnail(thumbnail);
    setAdditionalInfo(thumbnail.user_prompt);
    setTitle(thumbnail.title);
    setColorSchemeId(thumbnail.color_scheme);
    setAspectRatio(thumbnail.aspect_ratio);
    setStyle(thumbnail.style);
    setLoading(false);

  }

  useEffect(()=>{
    if(id){
      fetchThumbnail();
    }

  },[id])




  return (
   <>
   <SoftBackdrop />
   <div className=" pt-24 min-h-screen ">
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
      <div className="grid lg:grid-cols-[400px_1fr] gap-8">
        {/* {left_panel} */}
        <div className={`space-y-6 ${id && 'pointer-events-none'}`}>
          <div className='p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6'>
          <div>
            <h2 className="text-xl font-bold text-zinc-100 mb-1 ">Create Your Thumbnail</h2>
            <p className="text-sm text-zinc-400">Describe your vision and let AI create a thumbnail for you</p>
          </div>
          <div className="space-y-5">
            <div className='space-y-2'>
              <label htmlFor="title" className='text-sm text-zinc-400'>Title or Topic</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="e.g. , 10 Tips for Better Sleep"
              />
              <div className="text-xs text-zinc-400 text-right">
                {title.length}/100
              </div>
            </div>
            {/* {AspectRatioSelector} */}
            <AspectRatioSchema value={aspectRatio} onChange={setAspectRatio} />
            {/* {styleselector} */}

            <StyleSelector value={style} onChange={setStyle} isOpen={styleDropdownOpen} setIsOpen={setStyleDropdownOpen} />
            {/* {colorSelector} */}
            <ColorSchemaSelector value={colorSchemeId} onChange={setColorSchemeId} />

            {/* {DetailsInput} */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium'>
                Additional Prompts <span className='text-xs text-zinc-400'>(Optional)</span>
                
              </label>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                rows={3}
                placeholder="Add any additional details or preferences..."
                className="w-full px-4 py-3 rounded border border-white/10 bg-white/6 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                />

            </div>

          </div>
          {/* {Button} */}
          {!id && (
            <button onClick={handleGenerate} className="text-[15px] w-full py-3.5 rounded-? font-medium bg-linear-to-b from-pink-500 to-pink-600 hover:from-pink-600 disabled:cursor-not-allowed transition-colors">
              {loading ? 'Generating...' : 'Generate Thumbnail'}
            </button>
          )}

          </div>

        </div>
        {/* {right_panel} */}
        <div>
          <div className='p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl'>
            <h2 className='text-lg font-semibold text-zinc-100 mb-4'>Preview</h2>
            <PreviewPanel thumbnail={thumbnail} isLoading={loading} aspectRatio={aspectRatio} />
          </div>
        </div>
        
        
      </div>

      </main>

    </div>
   </>
  );
};

export default memo(Generate);