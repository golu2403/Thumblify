import { useSearchParams } from 'react-router-dom';
import {yt_html} from '../assets/assets';

const YtPreview = () => {
  const [searchParams] = useSearchParams();
  const thumbnail_url=searchParams.get('thumbnail_url') || '';
  const title=searchParams.get('title') || '';
  const new_html=yt_html.replace("%%THUMBNAIL_URL%%",thumbnail_url!).replace("%%TITLE%%",title!);

  return (
    <div>
      <h2>YtPreview</h2>
    </div>
  );
};

export default memo(YtPreview);