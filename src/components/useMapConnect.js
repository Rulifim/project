import { useEffect } from "react";

const useMapConnect = (initMap) => {
  useEffect(() => {

    if (window.google && window.google.maps) {
      initMap();
      return;
    }

    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com/maps/api/js"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", initMap);
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAhLeqlpNZ9SBsFzHyozvz0vxXH4mO_e-0&libraries=marker";

    script.async = true;
    script.defer = true;

    script.onload = initMap;

    document.head.appendChild(script);

  }, []);
};

export default useMapConnect;