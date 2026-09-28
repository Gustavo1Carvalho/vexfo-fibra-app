import { useEffect, useState } from "react";

/**
 * Simula o tempo de resposta de uma consulta para que os estados visuais
 * (Skeleton / Loading) fiquem perceptíveis nesta fase sem backend.
 */
export const useSimulatedLoading = (duration = 700): boolean => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), duration);
    return () => window.clearTimeout(timer);
  }, [duration]);

  return loading;
};
