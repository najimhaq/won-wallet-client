import useSWR, { SWRConfiguration } from 'swr';
import { fetcher } from '@/lib/swr-fetcher';

// Custom Type-safe SWR Hook
export function useFetch<T>(url: string | null, config?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR<T>(url, fetcher, {
    revalidateOnFocus: false, 
    ...config,
  });

  return {
    data,
    isLoading,
    isError: error,
    refetch: mutate,
  };
}
