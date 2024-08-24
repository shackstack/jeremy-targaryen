'use client';

import { BestCelebrities } from '@/@types';
import CelebProfile from '@/components/CelebProfile';
import Link from 'next/link';
import { useState } from 'react';

import { IconArrowRight14 } from '@/assets/icons';
import Image from 'next/image';

interface CelebBestSectionProps {
  bestCelebrities: BestCelebrities[];
}

const CelebBestSection = ({ bestCelebrities }: CelebBestSectionProps) => {
  const [sequence, setSequence] = useState<number>(0);

  const handleClickCelebProfile = async (index: number) => {
    setSequence(index);
  };

  return (
    <section className="mt-28">
      <h1 className="px-20 title-20-md">셀럽 BEST </h1>
      <div className="scrollbar-hide mt-[16px] flex gap-[16px] overflow-y-auto overflow-x-scroll px-20 py-11 pt-3">
        {bestCelebrities.map(({ celebrity: { id, name, profileImageUrl } }, index) => (
          <CelebProfile
            key={id}
            name={name}
            imageUrl={profileImageUrl}
            outlined={sequence === index}
            onClick={() => handleClickCelebProfile(index)}
          />
        ))}
      </div>
      <div className="mt-8 overflow-hidden bg-mainDim-8 px-20 py-20">
        <div className="flex justify-between">
          <p className="title-16-sb">
            <span className="text-main-500">{bestCelebrities[sequence].celebrity.name}</span> 추천 맛집 이에요!
          </p>
          <Link className="flex items-center" href={`/celebs/${bestCelebrities[sequence].celebrity.id}`}>
            <span className="text-gray-400 body-13-rg">더보기</span>
            <IconArrowRight14 />
          </Link>
        </div>
        <div className="mt-16 flex w-full gap-8">
          {bestCelebrities[sequence].restaurants.map(({ id, name, images, category, roadAddress }) => (
            <Link href={`/restaurant/${id}`} className="flex w-[calc((100%-20px)/3)] flex-col" key={id}>
              <div className="relative aspect-square overflow-hidden rounded-[8px] bg-gray-200">
                <Image fill alt={name} src={images[0].url} sizes="100%" className="object-cover" />
              </div>
              <div className="mt-10 flex flex-col gap-3 px-2">
                <span className="body-14-md">{name}</span>
                <span className="text-[11px] text-gray-600">{category}</span>
              </div>
              <div className="mt-6">
                <span className="caption-12-rg">{roadAddress.split(' ').slice(0, 2).join(' ')}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CelebBestSection;