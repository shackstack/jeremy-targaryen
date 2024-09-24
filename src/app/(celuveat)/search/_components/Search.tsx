'use client';

import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

import { SearchResult } from '@/@types';
import { getSearchResult } from '@/app/(actions)/search/actions';
import IconSearch from '@/components/@icon/IconSearch';
import { colors } from '@/constants/colors';

import IconArrowLeftGoBack from './IconArrowLeftGoBack';

function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi')); // 검색어와 일치하는 부분을 찾음
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="text-main-700">
            {part}
          </span> // 일치하는 부분에 스타일 적용
        ) : (
          part
        ),
      )}
    </>
  );
}

function Search() {
  const [data, setData] = useState<SearchResult>();
  const [searchValue, setSearchValue] = useState<string>(' ');

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/[^가-힣\s]/)) {
      return;
    }

    setSearchValue(e.target.value);
    const newData = await getSearchResult(e.target.value);
    setData(newData);
  };

  return (
    <main>
      <div className="flex items-center gap-12 px-20 pt-24">
        <IconArrowLeftGoBack />
        <input
          className="border-1 h-48 flex-1 rounded-[10px] border border-main-600 px-14 body-15-rg focus:outline-none"
          placeholder="원하는 식당를 검색해보세요"
          onChange={handleChange}
          autoFocus
        />
      </div>

      <hr className="mt-16 h-1 w-full bg-gray-200" />

      <ul>
        {data?.regionResults.map(region => (
          <Link href={`/region/${region.id}`} className="flex items-center px-20 py-[15px]" key={region.id}>
            <IconSearch width={20} height={20} fill={colors.gray[600]} />
            <div>
              <span className="ml-8 text-gray-900 body-16-md">{highlightMatch(region.name, searchValue)}</span>
              <span className="ml-4 text-gray-600 caption-12-rg">지역</span>
            </div>
          </Link>
        ))}
        {data?.celebrityResults.map(celeb => (
          <Link href={`/celebs/${celeb.id}`} className="flex items-center px-20 py-[15px]" key={celeb.id}>
            <IconSearch width={20} height={20} fill={colors.gray[600]} />
            <div>
              <span className="ml-8 text-gray-900 body-16-md">{highlightMatch(celeb.name, searchValue)}</span>
              <span className="ml-4 text-gray-600 caption-12-rg">셀럽</span>
            </div>
          </Link>
        ))}
        {data?.restaurantResults.map(restaurant => (
          <Link
            href={`/restaurants/restaurant/${restaurant.id}`}
            className="flex items-center px-20 py-[15px]"
            key={restaurant.id}
          >
            <IconSearch width={20} height={20} fill={colors.gray[600]} />
            <div>
              <span className="ml-8 text-gray-900 body-16-md">{highlightMatch(restaurant.name, searchValue)}</span>
              <span className="ml-4 text-gray-600 caption-12-rg">맛집</span>
            </div>
          </Link>
        ))}
      </ul>
    </main>
  );
}

export default Search;
