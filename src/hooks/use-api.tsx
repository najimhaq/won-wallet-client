//deep er =>src/hooks/use-api.ts (SWR + Axios একসাথে - Perfect Common API)
// src/hooks/use-api.ts
import useSWR, { SWRConfiguration, useSWRConfig } from 'swr';
import { axiosClient } from '@/lib/api/axios-client';

// ---------- GET ----------
const fetcher = async <T = unknown>(url: string): Promise<T> => {
  const response = await axiosClient.get<T>(url);
  return response.data;
};

export function useData<T = unknown>(
  url: string | null,
  options?: SWRConfiguration<T, Error>
) {
  const { data, error, isLoading, mutate } = useSWR<T>(url, fetcher<T>, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000, // 1 minute
    ...options,
  });

  return {
    data,
    error,
    isLoading,
    isError: !!error,
    mutate,
  };
}

// ---------- POST, PUT, PATCH, DELETE ----------
export function useMutation() {
  const { mutate: globalMutate } = useSWRConfig();

  const post = async <T = unknown>(url: string, body?: unknown): Promise<T> => {
    const response = await axiosClient.post<T>(url, body);
    return response.data;
  };


  const put = async <T = unknown>(url: string, body?: unknown): Promise<T> => {
    const response = await axiosClient.put<T>(url, body);
    return response.data;
  };

  const patch = async <T = unknown>(url: string, body?: unknown): Promise<T> => {
    const response = await axiosClient.patch<T>(url, body);
    return response.data;
  };

  const del = async <T = unknown>(url: string): Promise<T> => {
    const response = await axiosClient.delete<T>(url);
    return response.data;
  };

  return { post, put, patch, del, globalMutate };
}
