import { memo, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, Download, ArrowUpRight } from 'lucide-react';
import SoftBackdrop from '../components/SoftBackdrop';
import { type IThumbnail } from '../assets/assets';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import toast from 'react-hot-toast';

const MyGenerations = () => {
  const navigate = useNavigate();
  const {isLoggedIn}=useAuth();

  const aspectRatioClassMap = {
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
    '9:16': 'aspect-[9/16]',
  } as Record<string, string>;

  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchThumbnails = async () => {
     try {
      setLoading(true);
      const {data}=await api.get('/api/user/thumbnails')
      setThumbnails(data.thumbnails ||[])
     } catch (error:any) {
      console.log(error);
      toast .error(error?.response?.data?.message || error.message)
     }
     finally{
      setLoading(false);
     }
  }

  const handleDownload=async (imageUrl: string) => {
    window.open(imageUrl, '_blank');
  }

  const handleDelete=async (id: string) => {
    try {
      const {data}=await api.delete(`/api/thumbnail/delete/${id}`)
      toast.success(data.message)
      setThumbnails(thumbnails.filter((t)=>t._id!==id))
    } catch (error:any) {
      console.log(error);
      toast.error(error?.respone?.data?.message||error.message)
    }
  }

  const handleThumbnailClick = (id: string) => {
    navigate(`/generate/${id}`);
  }

  useEffect(() => {
    fetchThumbnails();
  },[isLoggedIn])




  return (
    <>
    <SoftBackdrop />
   
    <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
       {/* {Header} */}
       <div className='mb-8'>
      <h1 className="text-2xl font-bold text-zinc-200">My Generations</h1>
      <p className="text-sm text-zinc-400 mt-1">View and manage  all your AI-generated thumbnails.</p>
       </div>

       {/* {Thumbnails Grid} */}
       {loading && (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {Array.from({length: 6}).map((_, i)=>(
             <div key={i} className="rounded-2xl bg-white/6 border border-white/10 animate-pulse h-[260px]" />
           ))}
         </div>
       )}

       {!loading && thumbnails.length > 0 && (
         <div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-8">
           {thumbnails.map((thumb: IThumbnail) => {
             const aspectClass = aspectRatioClassMap[thumb.aspect_ratio || '16:9'];
             
             return (
               <div key={thumb._id} onClick={() => handleThumbnailClick(thumb._id)} className="group break-inside-avoid mb-6 cursor-pointer rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-white/20 transition">
                 <div className={`relative overflow-hidden rounded-t-2xl bg-black ${aspectClass}`}>
                   {thumb.image_url ? (
                     <img src={thumb.image_url} alt={thumb.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-slate-800">
                       <span className="text-sm text-zinc-400">{thumb.isGenerating ? 'Generating...' : 'No image'}</span>
                     </div>
                   )}
                   {thumb.isGenerating && (
                     <div className="absolute inset-0 bg-black/0 flex items-center justify-center text-sm font-medium text-white">Generating...</div>
                   )}
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                     {!thumb.isGenerating && (
                       <>
                         <button onClick={(e) => { e.stopPropagation(); handleDownload(thumb.image_url!); }} className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium text-white backdrop-blur-sm transition">Download</button>
                         <button onClick={(e) => { e.stopPropagation(); handleDelete(thumb._id); }} className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-xs font-medium text-red-200 backdrop-blur-sm transition">Delete</button>
                       </>
                     )}
                   </div>
                 </div>
                 <div className="p-4 space-y-2">
                   <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2">{thumb.title}</h3>
                   <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                     {thumb.color_scheme && (
                       <span className="px-2 py-0.5 rounded bg-white/8">{thumb.color_scheme}</span>
                     )}
                     {thumb.aspect_ratio && (
                       <span className="px-2 py-0.5 rounded bg-white/8">{thumb.aspect_ratio}</span>
                     )}
                   </div>
                   <div className="flex gap-2 pt-2">
                     <button onClick={(e) => { e.stopPropagation(); handleDelete(thumb._id); }} className="size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all" title="Delete">
                       <Trash2 className="size-full" />
                     </button>
                     <button onClick={(e) => { e.stopPropagation(); handleDownload(thumb.image_url!); }} className="size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all" title="Download">
                       <Download className="size-full" />
                     </button>
                     <Link target="_blank" to={`/preview?thumbnail_url=${thumb.image_url}&title=${thumb.title}`} className="size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all flex items-center justify-center" title="Preview">
                       <ArrowUpRight className="size-full" />
                     </Link>
                   </div>
                 </div>
               </div>
             );
           })}
         </div>
       )}

       {!loading && thumbnails.length === 0 && (
         <div className="flex flex-col items-center justify-center py-24">
           <h3 className="text-lg font-semibold text-zinc-200">No thumbnails yet</h3>
           <p className="text-sm text-zinc-400 mt-2">Generate your first thumbnail to see it here</p>
         </div>
       )}

    </div>
    </>
  );
};

export default memo(MyGenerations);