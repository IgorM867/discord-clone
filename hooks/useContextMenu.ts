import { useEffect, useRef, useState } from "react";

const initialContextMenu = {
  isActive: false,
  x: 0,
  y: 0,
};

export function useContextMenu() {
  const [contextMenu, setContextMenu] = useState(initialContextMenu);
  const ref = useRef<HTMLMenuElement>(null);

  useEffect(() => {
    const handleRightClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setContextMenu(initialContextMenu);
      }
    };
    const handleLeftClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setContextMenu(initialContextMenu);
      }
    };
    document.addEventListener("contextmenu", handleRightClick, true);
    document.addEventListener("click", handleLeftClick);

    return () => {
      document.removeEventListener("contextmenu", handleRightClick, true);
      document.removeEventListener("click", handleLeftClick);
    };
  }, [ref]);

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    const { pageX, pageY } = e;
    setContextMenu({ isActive: true, x: pageX, y: pageY });
  };

  const resetMenu = () => {
    setContextMenu(initialContextMenu);
  };
  return { ref, contextMenu, handleContextMenu, resetMenu };
}
