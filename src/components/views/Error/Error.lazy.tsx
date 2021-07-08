import React, { lazy, Suspense } from 'react';

const LazyError = lazy(() => import('./Error'));

const Error = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyError {...props} />
  </Suspense>
);

export default Error;
