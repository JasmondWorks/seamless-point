import { useEffect, useState } from "react";

const useScrollbarPadding = (ref) => {
  const [hasScrollbar, setHasScrollbar] = useState(false);

  useEffect(() => {
    const checkForScrollbar = () => {
      if (ref.current) {
        setHasScrollbar(ref.current.scrollHeight > ref.current.clientHeight);
      }
    };

    checkForScrollbar();
    window.addEventListener("resize", checkForScrollbar);

    return () => window.removeEventListener("resize", checkForScrollbar);
  }, [ref]);

  return hasScrollbar;
};

export default useScrollbarPadding;
