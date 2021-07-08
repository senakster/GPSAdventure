import React, { lazy, Suspense } from 'react';

const LazyError = lazy(() => import('./Createmap'));

const Createmap = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyError {...props} />
  </Suspense>
);

export default Createmap;
