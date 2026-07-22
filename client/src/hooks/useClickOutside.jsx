import { useEffect } from "react";

const useClickOutside = (ref, handler, active = true) => {
  useEffect(() => {
    if (!active) return;

    const handlePointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handler();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, handler, active]);
};

export default useClickOutside;
