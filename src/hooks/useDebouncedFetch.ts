import { useEffect, useRef, useState } from "react";

interface UseDebouncedFetchProps<T> {
  query: string;
  fetchFn: (query: string) => Promise<T[]>;
  dependencies?: unknown[];
  debounceMs?: number;
  minQueryLength?: number;
}

interface UseDebouncedFetchResult<T> {
  data: T[];
  loading: boolean;
}

export const useDebouncedFetch = <T>({
  query,
  fetchFn,
  debounceMs = 300,
  minQueryLength = 2,
  dependencies = [],
}: UseDebouncedFetchProps<T>): UseDebouncedFetchResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const cache = useRef<Map<string, T[]>>(new Map());
  const abort = useRef(false);

  useEffect(() => {
    if (query.length < minQueryLength) {
      setData([]);
      return;
    }

    const timeout = setTimeout(async () => {
      abort.current = false;

      if (cache.current.has(query)) {
        setData(cache.current.get(query)!);
        return;
      }

      setLoading(true);
      try {
        const result = await fetchFn(query);
        if (!abort.current) {
          cache.current.set(query, result);
          setData(result);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        if (!abort.current) setData([]);
      } finally {
        if (!abort.current) setLoading(false);
      }
    }, debounceMs);

    return () => {
      abort.current = true;
      clearTimeout(timeout);
    };
  }, [query, ...dependencies]);

  return { data, loading };
};
