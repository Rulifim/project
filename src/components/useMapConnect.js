import { useEffect } from "react";

const useMapConnect = (initMap) => {
	useEffect(() => {
		if (!window.google) {
			const script = document.createElement("script");

			script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAhLeqlpNZ9SBsFzHyozvz0vxXH4mO_e-0&libraries=marker&callback=initMap`;
			script.async = true;
			script.defer = true;

			script.onload = () => {
				initMap();
			};

			document.body.appendChild(script);

			return () => document.body.removeChild(script);
		}

		initMap();
	}, []);
};

export default useMapConnect;
