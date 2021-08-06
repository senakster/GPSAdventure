import React, { lazy, Suspense } from 'react';
import { IEvent } from '_state/reducers/eventReducer';

const LazyGeoCache = lazy(() => import('./GeoCache'));

const GeoCache = (props: IEvent & { closeCache: () => void } & JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyGeoCache {...props} />
  </Suspense>
);

export default GeoCache;
