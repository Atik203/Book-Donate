import { useEffect, useState } from "react";

const useDeviceDetect = () => {
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );
  const [isTablet, setIsTablet] = useState(
    window.matchMedia("(min-width: 480px)").matches
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      setIsTablet(width >= 768 && width < 1024);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isDesktop, isTablet };
};

export default useDeviceDetect;
