'use client';

import CelebrityFilter from '@/components/CelebrityFilter';
import RestaurantCardRowInfiniteList from '@/components/RestaurantCardRowInfiniteList';
import { useCelebritiesInRestaurantsQuery } from '@/hooks/server/celebs';
import { useRestaurantsCountQuery, useRestaurantsQuery } from '@/hooks/server/restaurants';
import useQueryParams from '@/hooks/useQueryParams';

function RestaurantListSection() {
  const { coordinate } = useQueryParams();
  const { data: restaurantsCount } = useRestaurantsCountQuery(coordinate);
  const { data, fetchNextPage } = useRestaurantsQuery(coordinate);
  const { data: celebrities } = useCelebritiesInRestaurantsQuery(coordinate);

  return (
    <div className="z-[100] flex w-full flex-1 flex-col overflow-hidden bg-white">
      <div className="flex h-[20px] items-center justify-center">
        <hr className="h-4 w-48 rounded-[8px] bg-gray-200" />
      </div>
      <div className="h-[20px]" />
      <div className="h-[40px]">
        {restaurantsCount > 0 ? (
          <p className="flex justify-center body-16-md">
            <span className="ml-4 text-main-700">{restaurantsCount}</span> 개 맛집이 있어요!
          </p>
        ) : (
          <p className="flex justify-center body-16-md">주변에 추천할 맛집이 없습니다.</p>
        )}
      </div>
      {celebrities && (
        <div className="px-20">
          <CelebrityFilter />
        </div>
      )}
      <div className="mt-16 flex-1 overflow-y-scroll pb-8">
        <RestaurantCardRowInfiniteList
          data={data?.pages ?? []}
          isValidating
          onIntersect={fetchNextPage}
          className="flex w-full flex-col gap-24 px-20"
        />
      </div>
    </div>
  );
}

export default RestaurantListSection;
