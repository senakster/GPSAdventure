import React, { lazy, Suspense } from 'react';

const LazyError = lazy(() => import('./Home'));

const Home = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyError {...props} />
  </Suspense>
);

export default Home;
