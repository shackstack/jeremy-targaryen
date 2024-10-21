import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useQueryParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const initializeQueryParams = (params: [string, string][]) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    params.forEach(([key, value]) => {
      newSearchParams.set(key, value);
    });
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const overrideQueryParams = (params: [string, string][]) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    params.forEach(([key, value]) => {
      newSearchParams.set(key, value);
    });
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const pushQueryParams = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.append(key, value);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const deleteQueryParams = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete(key);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const clearQueryParams = () => {
    router.push(pathname);
  };

  return {
    searchParams,
    initializeQueryParams,
    overrideQueryParams,
    pushQueryParams,
    deleteQueryParams,
    clearQueryParams,
  };
};

export default useQueryParams;
