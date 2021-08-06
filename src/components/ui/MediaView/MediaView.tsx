import React, { Fragment } from 'react';
import helpers, { embedYT, isValidYTHTML } from '_helpers/fn';
import styles from './MediaView.module.scss';


type MediaViewProps = {
  title?: string;
  type: 'youtube' | string;
  url: string;
}
const MediaView: React.FC<MediaViewProps> = ({title, type, url}) => {
  const [media, setMedia] = React.useState('');
  React.useEffect( () => {
    type === 'youtube' && embedYT(url)
      .then((response) => {
        const valid = isValidYTHTML(response.html)
        // console.log(valid, respSonse.html)
        valid && setMedia(response.html)
      })
  })

return (
    <div className={styles.MediaView} data-testid="MediaView">
    {title && <h1>{title}</h1>}
    {type === 'youtube' && <div className={styles.YTView}><Fragment>{helpers.parse(media)}</Fragment></div>}
    {type === 'video' && <div className={styles.videoView}><Fragment><video src={url} controls></video></Fragment></div>}
    {type === 'HTML' && <div className={styles.HTMLView}><Fragment>{helpers.parse(url)}</Fragment></div>}
    {type === 'audio' && <div className={styles.audioType}><Fragment><audio src={url} controls></audio></Fragment></div>}
    {type === 'image' && <div className={styles.imageView}><Fragment><img src={url} alt={url} /></Fragment></div>}

  </div>
);
}

export default MediaView;
