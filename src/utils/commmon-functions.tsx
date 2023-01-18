import { useEffect, useState, useCallback } from 'react';

/**
 * Converts the html entities to html.
 *
 * @param {string} html HTML with entities.
 *
 * @return {string} html with converted html entities.
 */
export const wpdDecodeHtml = (html: any) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

type updateTargetProps = {
  matches: boolean;
};

export const useMediaQuery = (width: string) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: updateTargetProps) => {
    if (e.matches) setTargetReached(true);
    else setTargetReached(false);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`${width}`);
    media.addEventListener('change', updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) setTargetReached(true);

    return () => media.removeEventListener('change', updateTarget);
  }, [updateTarget, width]);

  return targetReached;
};
