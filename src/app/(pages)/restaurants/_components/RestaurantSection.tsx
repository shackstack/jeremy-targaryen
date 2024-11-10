'use client';

import { ChangeEvent, useCallback, useState } from 'react';

import RestaurantCardRowInfiniteList from '@/components/RestaurantCardRowInfiniteList';
import { useRestaurantsCountQuery, useRestaurantsQuery } from '@/hooks/server/restaurants';
import useQueryParams from '@/hooks/useQueryParams';

function RestaurantSection() {
  const [sortValue, setSortValue] = useState('like');
  const { searchParams } = useQueryParams();
  const { data: restaurantsCount } = useRestaurantsCountQuery({ category: searchParams.get('category') ?? undefined });
  const { data, fetchNextPage } = useRestaurantsQuery({
    category: searchParams.get('category') ?? undefined,
    celebrityId: searchParams.get('celebrityId') ? Number(searchParams.get('celebrityId')) : undefined,
    sort: [sortValue],
  });

  const handleSortValueChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setSortValue(e.target.value);
  }, []);

  return (
    <>
      <div className="mt-20 flex justify-between">
        <h2 className="title-20-md">
          <span className="text-main-700 title-20-bold">{restaurantsCount}</span>개 맛집
        </h2>
        <select className="body-13-rg" defaultValue={sortValue} onChange={handleSortValueChange}>
          <option value="createdAt">최신순</option>
          <option value="review">리뷰순</option>
          <option value="like">좋아요순</option>
        </select>
      </div>
      <RestaurantCardRowInfiniteList
        data={data?.pages ?? []}
        isValidating
        onIntersect={fetchNextPage}
        className="mt-24 flex flex-col gap-20"
      />
    </>
  );
}

export default RestaurantSection;
