'use client';

import dynamic from 'next/dynamic';

const NasaImageLibrary = dynamic(
  () => import('@/components/organisms/NasaImageLibrary'),
  {
    loading: () => <div>Loading...</div>,
    ssr: false
  }
);

export default function LibraryWrapper() {
  return <NasaImageLibrary />;
}