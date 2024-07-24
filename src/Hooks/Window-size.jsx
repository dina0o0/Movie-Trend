import { useState, useEffect } from "react";

export default function useWindowSize() {
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
    scrollY: undefined,
  });

  useEffect(() => {
    function updateSize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
        scrollY: window.pageYOffset,
      });
    }

    return () => {
      window.addEventListener("resize", updateSize);
      window.addEventListener("scroll", updateSize);
      updateSize();
    };
  }, []);
  return size;
}
