import React, { Fragment } from 'react';
import helpers, { embedYT, isValidYTHTML } from '_helpers/fn';
import styles from './MediaView.module.scss';


type MediaViewProps = {
  youtube?: string;
}
const MediaView: React.FC<MediaViewProps> = ({youtube}) => {
  const [media, setMedia] = React.useState('');
  React.useEffect( () => {
    youtube && embedYT(youtube)
      .then((response) => {
        const valid = isValidYTHTML(response.html)
        // console.log(valid, response.html)
        valid && setMedia(response.html)
      })
  }) 

return (
    <div className={styles.MediaView} data-testid="MediaView">
    {youtube && <div className={styles.mediaView}><Fragment>{helpers.parse(media)}</Fragment></div>}
  </div>
);
}

export default MediaView;
