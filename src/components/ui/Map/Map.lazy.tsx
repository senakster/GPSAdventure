import React, { lazy, Suspense } from 'react';

const LazyError = lazy(() => import('./Map'));

const Map = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyError {...props} />
  </Suspense>
);

export default Map;
