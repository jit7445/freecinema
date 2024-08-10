'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';
// import Loading from '@/app/loading';
import Loading from '@/app/Loading';
export default function NavbarItem({ title, param }) {
  const searchParams = useSearchParams();
  const genre = searchParams.get('genre');

  return (
    <Suspense fallback={<Loading />}>
      <div className=''>
        <Link
          className={`hover:text-amber-600   text-nowrap ${
            genre === param
              ? 'underline underline-offset-8 decoration-4 decoration-amber-500 rounded-lg'
              : ''
          }`}
          href={`/?genre=${param}`}
        >
          {title}
        </Link>
      </div>
    </Suspense>
  );
}
