import { useState, useEffect } from "react";
import { api } from "./../../config/axios";
import { DataType } from "../types/app.types";

/**
 * Custom hook for fetching data from a specified URL with pagination parameters.
 *
 * @param url - The URL to fetch data from.
 * @param params - The pagination parameters (page and limit).
 * @returns An object containing the fetched data, loading state, and error.
 */
const useFetch = (
  url: string,
  params: {
    page: number;
    limit: number;
  }
): {
  data: { image: string; data: DataType[] };
  isLoading: boolean;
  error: unknown;
} => {
  const [data, setData] = useState<{ image: string; data: DataType[] }>({
    image: "",
    data: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(url, { params });
        console.log(data);
        setData?.(data);
      } catch (error: unknown) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.page]);

  return { data, isLoading, error };
};

export default useFetch;
