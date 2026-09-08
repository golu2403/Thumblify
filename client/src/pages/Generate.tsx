// import { memo, useEffect, useState } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { colorSchemes, dummyThumbnails, type AspectRatio, type IThumbnail, type ThumbnailStyle } from '../assets/assets';
// import SoftBackdrop from '../components/SoftBackdrop';
// import AspectRatioSchema from '../components/AspectRatioSchema';
// import StyleSelector from '../components/StyleSelector';
// import ColorSchemaSelector from '../components/ColorSchemaSelector';
// import PreviewPanel from '../components/PreviewPanel';
// import { useAuth } from '../context/AuthContext';
// import toast from 'react-hot-toast';
// import api from '../config/api';


// const Generate = () => {
//   const {id} = useParams();
//      const location = useLocation();
//   const navigate=useNavigate();
//   const {isLoggedIn}=useAuth();
//   const [title, setTitle] = useState('');
//   const [additionalInfo, setAdditionalInfo] = useState('');
//   const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
//    const [loading, setLoading] = useState(false);
//    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
//    const [colorSchemeId,setColorSchemeId] = useState<string>(colorSchemes[0].id);
//    const [style,setStyle] = useState<ThumbnailStyle>('Bold & Graphic');
//    const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);

//    const handleGenerate = async () => {
//      if(!isLoggedIn){
//       return toast.error('Please login to generarte thumbnails')
//      }
//      if(!title.trim()) return toast.error('Title is required')
//       setLoading(true)

//      const api_payload={
//       title,
//       prompt:additionalInfo,
//        style,
//        aspect_ratio:aspectRatio,
//        color_scheme:colorSchemeId,
//        text_overlay:true

//      }

//       const {data}=await api.post ('/api/thumbnail/generate',api_payload);
//       if(data.thumbnail){
//         navigate('/generate/'+data.thumbnail._id)
//         toast.success(data.message)
//       }
     
      
     


   
//   }

//   const fetchThumbnail = async () => {
//     try {
//       const {data}=await api.get(`/api/user/thumbnail/${id}`)
//       setThumbnail(data?.thumbnail as IThumbnail)
//       setLoading(!data?.thumbnail?.image_url);
//       setAdditionalInfo(data?.thumbnail?.user_prompt);
//       setTitle(data?.thumbnail?.title);
//       setColorSchemeId(data?.thumbnail?.color_schema);
//       setAspectRatio(data?.thumbnail?.aspect_ratio);
//       setStyle(data.thumbnail?.style);
//     } catch (error:any) {
//       console.log(error);
//       toast.error(error?.response?.data?.message|| error.message)
//     }

//   }

//   useEffect(()=>{
//     if(isLoggedIn && id){
//       fetchThumbnail();
//     }
//     if(id && loading && isLoggedIn){
//       const interval=setInterval(()=>{
//         fetchThumbnail();
//       },5000)
//        return () => clearInterval(interval);
//     }
     

//   },[id,loading,isLoggedIn])

//   useEffect(()=>{
//     if(!id && thumbnail){
//       setThumbnail(null)
//     }
//   },[location.pathname])




//   return (
//    <>
//    <SoftBackdrop />
//    <div className=" pt-24 min-h-screen ">
//     <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
//       <div className="grid lg:grid-cols-[400px_1fr] gap-8">
//         {/* {left_panel} */}
//         <div className={`space-y-6 ${id && 'pointer-events-none'}`}>
//           <div className='p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6'>
//           <div>
//             <h2 className="text-xl font-bold text-zinc-100 mb-1 ">Create Your Thumbnail</h2>
//             <p className="text-sm text-zinc-400">Describe your vision and let AI create a thumbnail for you</p>
//           </div>
//           <div className="space-y-5">
//             <div className='space-y-2'>
//               <label htmlFor="title" className='text-sm text-zinc-400'>Title or Topic</label>
//               <input
//                 type="text"
//                 id="title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 maxLength={100}
//                 className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 placeholder="e.g. , 10 Tips for Better Sleep"
//               />
//               <div className="text-xs text-zinc-400 text-right">
//                 {title.length}/100
//               </div>
//             </div>
//             {/* {AspectRatioSelector} */}
//             <AspectRatioSchema value={aspectRatio} onChange={setAspectRatio} />
//             {/* {styleselector} */}

//             <StyleSelector value={style} onChange={setStyle} isOpen={styleDropdownOpen} setIsOpen={setStyleDropdownOpen} />
//             {/* {colorSelector} */}
//             <ColorSchemaSelector value={colorSchemeId} onChange={setColorSchemeId} />

//             {/* {DetailsInput} */}
//             <div className='space-y-2'>
//               <label className='block text-sm font-medium'>
//                 Additional Prompts <span className='text-xs text-zinc-400'>(Optional)</span>
                
//               </label>
//               <textarea
//                 value={additionalInfo}
//                 onChange={(e) => setAdditionalInfo(e.target.value)}
//                 rows={3}
//                 placeholder="Add any additional details or preferences..."
//                 className="w-full px-4 py-3 rounded border border-white/10 bg-white/6 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
//                 />

//             </div>

//           </div>
//           {/* {Button} */}
//           {!id && (
//             <button onClick={handleGenerate} className="text-[15px] w-full py-3.5 rounded-? font-medium bg-linear-to-b from-pink-500 to-pink-600 hover:from-pink-600 disabled:cursor-not-allowed transition-colors">
//               {loading ? 'Generating...' : 'Generate Thumbnail'}
//             </button>
//           )}

//           </div>

//         </div>
//         {/* {right_panel} */}
//         <div>
//           <div className='p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl'>
//             <h2 className='text-lg font-semibold text-zinc-100 mb-4'>Preview</h2>
//             <PreviewPanel thumbnail={thumbnail} isLoading={loading} aspectRatio={aspectRatio} />
//           </div>
//         </div>
        
        
//       </div>

//       </main>

//     </div>
//    </>
//   );
// };

// export default memo(Generate);



import { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import {
  colorSchemes,
  type AspectRatio,
  type IThumbnail,
  type ThumbnailStyle,
} from '../assets/assets';

import SoftBackdrop from '../components/SoftBackdrop';
import AspectRatioSchema from '../components/AspectRatioSchema';
import StyleSelector from '../components/StyleSelector';
import ColorSchemaSelector from '../components/ColorSchemaSelector';
import PreviewPanel from '../components/PreviewPanel';

import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../config/api';

const Generate = () => {
  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  const [title, setTitle] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);

  const [loading, setLoading] = useState(false);

  const [aspectRatio, setAspectRatio] =
    useState<AspectRatio>('16:9');

  const [colorSchemeId, setColorSchemeId] =
    useState<string>(colorSchemes[0].id);

  const [style, setStyle] =
    useState<ThumbnailStyle>('Bold & Graphic');

  const [styleDropdownOpen, setStyleDropdownOpen] =
    useState(false);


  // =========================================================
  // GENERATE THUMBNAIL
  // =========================================================

  const handleGenerate = async () => {
    if (!isLoggedIn) {
      return toast.error('Please login to generate thumbnails');
    }

    if (!title.trim()) {
      return toast.error('Title is required');
    }

    try {
      setLoading(true);

      const api_payload = {
        title,
        prompt: additionalInfo,
        style,
        aspect_ratio: aspectRatio,
        color_scheme: colorSchemeId,
        text_overlay: true,
      };

      console.log('Generate Payload:', api_payload);

      const { data } = await api.post(
        '/api/thumbnail/generate',
        api_payload
      );

      console.log('Generate API Response:', data);

      if (data.thumbnail) {

        // =====================================================
        // ⭐ IMPORTANT
        // Get thumbnail directly from Generate API
        // =====================================================

        setThumbnail(data.thumbnail);

        // If image_url already exists, generation is complete
        setLoading(!data.thumbnail.image_url);

        // =====================================================
        // Keep the ID in URL
        // Also pass thumbnail data through React Router state
        // =====================================================

        navigate(`/generate/${data.thumbnail._id}`, {
          state: {
            thumbnail: data.thumbnail,
          },
        });

        toast.success(
          data.message || 'Thumbnail generated successfully'
        );
      }

    } catch (error: any) {

      console.log('Generate Error:', error);

      setLoading(false);

      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        'Failed to generate thumbnail'
      );
    }
  };


  // =========================================================
  // FETCH THUMBNAIL BY ID
  // =========================================================

  const fetchThumbnail = async () => {

    if (!id) return;

    try {

      console.log('Fetching thumbnail ID:', id);

      const { data } = await api.get(
        `/api/user/thumbnail/${id}`
      );

      console.log('Fetch Thumbnail Response:', data);

      const fetchedThumbnail = data?.thumbnail;

      if (!fetchedThumbnail) {
        setThumbnail(null);
        setLoading(false);
        return;
      }

      // Set thumbnail
      setThumbnail(fetchedThumbnail);

      // If image_url doesn't exist → still generating
      setLoading(!fetchedThumbnail?.image_url);

      // Set form values
      setAdditionalInfo(
        fetchedThumbnail?.user_prompt || ''
      );

      setTitle(
        fetchedThumbnail?.title || ''
      );

      // ⭐ FIXED:
      // Backend returns color_scheme
      setColorSchemeId(
        fetchedThumbnail?.color_scheme || colorSchemes[0].id
      );

      setAspectRatio(
        fetchedThumbnail?.aspect_ratio || '16:9'
      );

      setStyle(
        fetchedThumbnail?.style || 'Bold & Graphic'
      );

    } catch (error: any) {

      console.log('Fetch Thumbnail Error:', error);

      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        'Failed to fetch thumbnail'
      );

      setLoading(false);
    }
  };


  // =========================================================
  // LOAD THUMBNAIL
  // =========================================================

  useEffect(() => {

    // =======================================================
    // CASE 1:
    // Thumbnail came directly from Generate API
    // =======================================================

    const generatedThumbnail =
      location.state?.thumbnail;

    if (generatedThumbnail) {

      console.log(
        'Using thumbnail from Generate API:',
        generatedThumbnail
      );

      setThumbnail(generatedThumbnail);

      setLoading(
        !generatedThumbnail?.image_url
      );

      setTitle(
        generatedThumbnail?.title || ''
      );

      setAdditionalInfo(
        generatedThumbnail?.user_prompt || ''
      );

      setAspectRatio(
        generatedThumbnail?.aspect_ratio || '16:9'
      );

      setColorSchemeId(
        generatedThumbnail?.color_scheme ||
        colorSchemes[0].id
      );

      setStyle(
        generatedThumbnail?.style ||
        'Bold & Graphic'
      );

      return;
    }


    // =======================================================
    // CASE 2:
    // User directly opened /generate/:id
    // =======================================================

    if (isLoggedIn && id) {
      fetchThumbnail();
    }

  }, [id, isLoggedIn, location.state]);


  // =========================================================
  // POLLING
  // =========================================================

  useEffect(() => {

    if (
      !id ||
      !loading ||
      !isLoggedIn
    ) {
      return;
    }

    console.log(
      'Thumbnail is still generating. Starting polling...'
    );

    const interval = setInterval(() => {

      console.log(
        'Checking thumbnail again...'
      );

      fetchThumbnail();

    }, 5000);


    // Cleanup
    return () => {
      console.log(
        'Stopping thumbnail polling'
      );

      clearInterval(interval);
    };

  }, [id, loading, isLoggedIn]);


  // =========================================================
  // CLEAR THUMBNAIL WHEN /generate PAGE HAS NO ID
  // =========================================================

  useEffect(() => {

    if (!id) {

      setThumbnail(null);

      setLoading(false);

    }

  }, [id]);


  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      <SoftBackdrop />

      <div className="pt-24 min-h-screen">

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">

          <div className="grid lg:grid-cols-[400px_1fr] gap-8">


            {/* =================================================
                LEFT PANEL
            ================================================= */}

            <div
              className={`space-y-6 ${
                id ? 'pointer-events-none' : ''
              }`}
            >

              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">

                <div>

                  <h2 className="text-xl font-bold text-zinc-100 mb-1">
                    Create Your Thumbnail
                  </h2>

                  <p className="text-sm text-zinc-400">
                    Describe your vision and let AI create a
                    thumbnail for you
                  </p>

                </div>


                <div className="space-y-5">


                  {/* TITLE */}

                  <div className="space-y-2">

                    <label
                      htmlFor="title"
                      className="text-sm text-zinc-400"
                    >
                      Title or Topic
                    </label>

                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) =>
                        setTitle(e.target.value)
                      }
                      maxLength={100}
                      className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="e.g. 10 Tips for Better Sleep"
                    />

                    <div className="text-xs text-zinc-400 text-right">

                      {title.length}/100

                    </div>

                  </div>


                  {/* ASPECT RATIO */}

                  <AspectRatioSchema
                    value={aspectRatio}
                    onChange={setAspectRatio}
                  />


                  {/* STYLE */}

                  <StyleSelector
                    value={style}
                    onChange={setStyle}
                    isOpen={styleDropdownOpen}
                    setIsOpen={setStyleDropdownOpen}
                  />


                  {/* COLOR */}

                  <ColorSchemaSelector
                    value={colorSchemeId}
                    onChange={setColorSchemeId}
                  />


                  {/* ADDITIONAL PROMPT */}

                  <div className="space-y-2">

                    <label className="block text-sm font-medium">

                      Additional Prompts{' '}

                      <span className="text-xs text-zinc-400">
                        (Optional)
                      </span>

                    </label>

                    <textarea
                      value={additionalInfo}
                      onChange={(e) =>
                        setAdditionalInfo(e.target.value)
                      }
                      rows={3}
                      placeholder="Add any additional details or preferences..."
                      className="w-full px-4 py-3 rounded border border-white/10 bg-white/6 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                    />

                  </div>

                </div>


                {/* GENERATE BUTTON */}

                {!id && (

                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="text-[15px] w-full py-3.5 rounded-lg font-medium bg-linear-to-b from-pink-500 to-pink-600 hover:from-pink-600 disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
                  >

                    {loading
                      ? 'Generating...'
                      : 'Generate Thumbnail'}

                  </button>

                )}

              </div>

            </div>


            {/* =================================================
                RIGHT PANEL
            ================================================= */}

            <div>

              <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">

                <h2 className="text-lg font-semibold text-zinc-100 mb-4">
                  Preview
                </h2>

                <PreviewPanel
                  thumbnail={thumbnail}
                  isLoading={loading}
                  aspectRatio={aspectRatio}
                />

              </div>

            </div>

          </div>

        </main>

      </div>
    </>
  );
};

export default memo(Generate);