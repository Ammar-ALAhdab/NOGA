import { useEffect, useState } from "react";

function useScreenResize() {
  const [showScreenAlert, setShowScreenAlert] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowScreenAlert(window.innerWidth < 800);
    };
    window.addEventListener("resize", handleResize);
      if (showScreenAlert) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showScreenAlert]);

  return showScreenAlert;
}

export default useScreenResize;
