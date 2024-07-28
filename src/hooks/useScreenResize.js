import { useEffect, useState } from "react";

function useScreenResize() {
  const [showScreenAlert, setShowScreenAlert] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowScreenAlert(window.innerWidth < 800);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return showScreenAlert;
}

export default useScreenResize;
