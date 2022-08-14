import { useEffect, useState } from "react";

const useGoogleScript = () => {
	const [scriptLoaded, setScriptLoaded] = useState(false);

	useEffect(() => {
		if (scriptLoaded) return;

    if(document.getElementById("google-client-script")) return 

		const googleScript = document.createElement("script");
		googleScript.src = "https://accounts.google.com/gsi/client";
		googleScript.async = true;
		googleScript.defer = true;
		googleScript.id = "google-client-script";
		document.querySelector("head")?.appendChild(googleScript);
    googleScript.onload = () => {
			setScriptLoaded(true);
		};
	}, [scriptLoaded]);

	return scriptLoaded;
};

export default useGoogleScript;
