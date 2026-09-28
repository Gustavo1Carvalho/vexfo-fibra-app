import { useEffect, useState } from "react";

/** Elemento fixo dentro da moldura do celular onde modais e toasts são renderizados. */
export const OVERLAY_ID = "vexfo-overlay";

export const useOverlayContainer = (): HTMLElement | null => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById(OVERLAY_ID));
  }, []);

  return container;
};
