import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }
        const res = await fetch(url, { method, body, headers });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something is error!");
        }

        setLoading(false);

        return data;
      } catch (error) {
        setLoading(false);
        setError(error.message);
        console.log(error);
        throw error;
      }
    },
    []
  );

  const clearError = () => setError(null);

  return { loading, request, error, clearError };
};
