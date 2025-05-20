'use client';
import React from 'react';
import dynamic from 'next/dynamic';

// Leaflet needs access to the window object, which does not exist in the Node
// environment that NextJS SSR uses. This dynamic import fixes that issue so there
// are not errors during rendering.
const Map = dynamic(() => import('../components/Map/Map'), { ssr: false });

export default function DrillMapPage() {
  return <Map />;
}
