import React, { lazy, Suspense } from 'react';

const LazyGeoCache = lazy(() => import('./GeoCache'));

const GeoCache = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyGeoCache {...props} />
  </Suspense>
);

export default GeoCache;
