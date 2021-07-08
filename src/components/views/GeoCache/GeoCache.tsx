import MediaView from 'components/ui/MediaView/MediaView';
import React from 'react';
import { useStateContext } from '_state';
import styles from './GeoCache.module.scss';

const GeoCache: React.FC = () => {
const { state } = useStateContext();
 return (
  <div className={styles.GeoCache} data-testid="GeoCache">
     <h1>GeoChache Component</h1>
    {/* {JSON.stringify(state)} */}
     <MediaView youtube={`https://youtu.be/gR8KGam3m9Q?t=60`} />
  </div>
);
  }
export default GeoCache;
