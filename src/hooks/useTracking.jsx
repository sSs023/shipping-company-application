import { useEffect, useState } from 'react';
import axios from 'axios';

const useTracking = (trackingId) => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!trackingId) return;

   const fetchStatus = async () => {
    setIsLoading(true);
      try {
        const response = await axios.get(`/api/shipments/?id=${trackingId}`);
        setStatus(response.data);
      } catch (err) {
        setError(err.message);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, [trackingId]);

  return { status, error, isLoading };
};

export default useTracking;