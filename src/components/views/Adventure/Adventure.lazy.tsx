import React, { lazy, Suspense } from 'react';

const LazyAdventure = lazy(() => import('./Adventure'));

const Adventure = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAdventure {...props} />
  </Suspense>
);

export default Adventure;
