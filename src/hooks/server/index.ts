import { getCelebProfiles, getRestaurants } from '@/api';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useCelebsRepresentativeRestaurants = (celebId: number) =>
  useSuspenseQuery({
    queryKey: ['celebsRepresentativeRestaurants', celebId],
    queryFn: () => getRestaurants({ celebId }),
    select: data => data.content.slice(0, 3),
  });

export const useCelebProfiles = (celebId: number) =>
  useQuery({
    queryKey: ['celebProfiles'],
    queryFn: getCelebProfiles,
    select: data => data.find(({ id }) => id === celebId),
  });