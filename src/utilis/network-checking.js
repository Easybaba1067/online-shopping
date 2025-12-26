import { useState, useEffect } from "react";

function useNetworkStatus() {
  const getStatus = () =>
    typeof navigator !== "undefined" ? navigator.onLine : true;

  const [isOnline, setIsOnline] = useState(getStatus());

  useEffect(() => {
    const handleOffline = () => setIsOnline(false);
    const handleOnline = () => setIsOnline(true);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return {
    isOnline,
    isOffline: !isOnline,
  };
}

export default useNetworkStatus;
