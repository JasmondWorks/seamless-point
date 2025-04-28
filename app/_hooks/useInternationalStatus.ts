import { useState, useEffect } from "react";

export default function useInternationalStatus() {
  const [isInternational, setIsInternational] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkInternationalStatus() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/location`
        );
        const data = await response.json();
        setIsInternational(data.isInternational);
      } catch (err) {
        setError("Failed to check location status");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    checkInternationalStatus();
  }, []);

  return { isInternational, isLoading, error };
}
