'use client';

import RestaurantCardRow from '@/components/RestaurantCardRow';
import { useState } from 'react';

const mock1 = {
  contents: [
    {
      id: 1,
      name: '맛집',
      category: '한식',
      roadAddress: '서울특별시 강남구 역삼동 123-456',
      phoneNumber: '02-1234-5678',
      naverMapUrl: 'https://map.naver.com/v5/entry/place/12345678',
      latitude: 37.123456,
      longitude: 127.123456,
      liked: true,
      visitedCelebrities: [
        {
          id: 1,
          name: '성시경',
          profileImageUrl:
            'https://yt3.googleusercontent.com/vQrdlCaT4Tx1axJtSUa1oxp2zlnRxH-oMreTwWqB-2tdNFStIOrWWw-0jwPvVCUEjm_MywltBFY=s176-c-k-c0x00ffffff-no-rj',
        },
      ],
      images: [
        {
          name: '맛집',
          author: '홍길동',
          url: 'https://www.celuveat.com/images-data/webp/bXVrenppX29uZS0x.webp',
          isThumbnail: true,
        },
      ],
    },
  ],
  currentPage: 0,
  hasNext: true,
  size: 0,
};

const InterestedPage = () => {
  const [tab, setTab] = useState<'맛집' | '셀럽'>('맛집');
  return (
    <main className="p-20">
      <div className="flex h-52 rounded-[8px] bg-gray-100 p-4">
        <button
          className={`flex w-1/2 items-center justify-center rounded-[8px] title-16-sb ${tab === '맛집' && 'bg-white'}`}
          onClick={() => setTab('맛집')}
        >
          맛집
        </button>
        <button
          className={`flex w-1/2 items-center justify-center rounded-[8px] title-16-sb ${tab === '셀럽' && 'bg-white'}`}
          onClick={() => setTab('셀럽')}
        >
          셀럽
        </button>
      </div>
      <section className="mt-24">
        {tab === '맛집' && (
          <div className="title-20-md">
            <span className="text-main-700 title-20-bold">00</span>개
            <ul className="mt-16 flex flex-col gap-24">
              {mock1.contents.map(item => (
                <RestaurantCardRow key={item.id} {...item} />
              ))}
            </ul>
          </div>
        )}

        {tab === '셀럽' && (
          <div className="title-20-md">
            <span className="text-main-700 title-20-bold">00</span>명
            <ul className="mt-16 flex flex-col gap-24">
              {mock1.contents.map(item => (
                <li key={item.id} className="flex items-center gap-10">
                  <div className="h-[56px] w-[56px] rounded-full bg-gray-100" />
                  <div className="flex flex-1 flex-col justify-center">
                    <span className="title-16-sb">성시경 SUNG SI KYUNG</span>
                    <div className="">
                      <span className="body-14-rg">구독자</span>
                      <span className="ml-2 body-14-md">10만명</span>
                      <span className="ml-12 body-14-rg">추천 매장</span>
                      <span className="ml-2 body-14-md">50개</span>
                    </div>
                  </div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.5 9.3125C22.5 15.875 12.7697 21.1869 12.3553 21.4062C12.2461 21.465 12.124 21.4958 12 21.4958C11.876 21.4958 11.7539 21.465 11.6447 21.4062C11.2303 21.1869 1.5 15.875 1.5 9.3125C1.50174 7.77146 2.11468 6.29404 3.20436 5.20436C4.29404 4.11468 5.77146 3.50174 7.3125 3.5C9.5 3.49753 10.9434 4.3325 12 5.73969C13.0566 4.3325 14.5 3.5 16.6875 3.5C18.2285 3.50174 19.706 4.11468 20.7956 5.20436C21.8853 6.29404 22.4983 7.77146 22.5 9.3125Z"
                      fill="#FF7B54"
                    />
                  </svg>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
};

export default InterestedPage;