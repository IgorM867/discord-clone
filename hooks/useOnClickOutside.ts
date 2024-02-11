import { useEffect, useRef } from "react";

export const useOnClickOutside = <T extends HTMLElement>(callback: () => void) => {
  const ref = useRef<T>(null);
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);

  return ref;
};
